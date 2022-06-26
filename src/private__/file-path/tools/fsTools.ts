import { BoxedGenerator, BoxedList } from '@luxcium/boxed-list';
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import path from 'path';
// import { BoxedList } from '../imports';

path.parse('').ext;

export function getListing(pathSrc: string = '') {
  const files = BoxedGenerator.of(...getFiles(pathSrc));
  const dirs = BoxedGenerator.of(...getDirsSync(pathSrc));
  const blockDevice = BoxedGenerator.of(...getBlockDeviceSync(pathSrc));
  const characterDevice = BoxedGenerator.of(...getCharacterDeviceSync(pathSrc));
  const FIFO = BoxedGenerator.of(...getFIFOSync(pathSrc));
  const socket = BoxedGenerator.of(...getSocketSync(pathSrc));
  const symbolicLink = BoxedGenerator.of(...getSymbolicLinkSync(pathSrc))
    .map(link => path.normalize(`${pathSrc}/${link}`))
    .map(link => fs.readlinkSync(link))
    .map(link => '/' + link);

  const cache: any = { x0x: 0 };
  files.map(() => (cache['x0x'] = 3));
  return {
    pathSrc,
    dirs,
    files,
    blockDevice,
    characterDevice,
    FIFO,
    socket,
    symbolicLink,
    normal: BoxedList.of(...dirs, ...files),
    count: {
      pathSrc,
      dirs: dirs.length,
      files: files.length,
      blockDevice: blockDevice.length,
      characterDevice: characterDevice.length,
      FIFO: FIFO.length,
      socket: socket.length,
      symbolicLink: symbolicLink.length,
      normal: dirs.length + files.length,
      total: dirs.length + files.length + symbolicLink.length,
      isLeaf: dirs.length === 0,
      isNode: dirs.length > 0,
      isEmptyLeaf: dirs.length === 0 && files.length === 0,
      isEmptyNode: dirs.length > 0 && files.length === 0,
      exts: cache,
    },

    isLeaf() {
      return dirs.length === 0;
    },
    isNode() {
      return dirs.length > 0;
    },
    isEmptyLeaf() {
      return dirs.length === 0 && files.length === 0;
    },
    isEmptyNode() {
      return dirs.length > 0 && files.length === 0;
    },
  };
}

export function getFiles(pathSrc: string = '') {
  const readdir = fs.readdirSync(pathSrc, { withFileTypes: true });
  // readdir.filter(i => !i.isDirectory()).map(i => i.name);
  try {
    return readdir.filter(i => !i.isDirectory()).map(i => i.name);
  } catch (error) {
    console.error('getFilesSync ERROR:', error);
    return [];
  }
}
export function getDirsSync(pathSrc: string = '') {
  const readdir = fs.readdirSync(pathSrc, { withFileTypes: true });
  try {
    return readdir.filter(i => i.isDirectory()).map(i => i.name);
  } catch (error) {
    console.error('getDirsSync ERROR:', error);
    return [];
  }
}

export function getBlockDeviceSync(pathSrc: string = '') {
  const readdir = fs.readdirSync(pathSrc, { withFileTypes: true });
  try {
    return readdir.filter(i => i.isBlockDevice()).map(i => i.name);
  } catch (error) {
    console.error('getBlockDeviceSync ERROR:', error);
    return [];
  }
}

export function getCharacterDeviceSync(pathSrc: string = '') {
  const readdir = fs.readdirSync(pathSrc, { withFileTypes: true });
  try {
    return readdir.filter(i => i.isCharacterDevice()).map(i => i.name);
  } catch (error) {
    console.error('getCharacterDeviceSync ERROR:', error);
    return [];
  }
}

export function getFIFOSync(pathSrc: string = '') {
  const readdir = fs.readdirSync(pathSrc, { withFileTypes: true });
  try {
    return readdir.filter(i => i.isFIFO()).map(i => i.name);
  } catch (error) {
    console.error('getFIFOSync ERROR:', error);
    return [];
  }
}

export function getSocketSync(pathSrc: string = '') {
  const readdir = fs.readdirSync(pathSrc, { withFileTypes: true });
  try {
    return readdir.filter(i => i.isSocket()).map(i => i.name);
  } catch (error) {
    console.error('getSocketSync ERROR:', error);
    return [];
  }
}

export function getSymbolicLinkSync(pathSrc: string = '') {
  const readdir = fs.readdirSync(pathSrc, { withFileTypes: true });
  try {
    return readdir.filter(i => i.isSymbolicLink()).map(i => i.name);
  } catch (error) {
    console.error('getSymbolicLinkSync ERROR:', error);
    return [];
  }
}
export type Listing = {
  pathSrc: string;
  dirs: () => Promise<string[]>;
  files: () => Promise<string[]>;
  blockDevice: () => Promise<string[]>;
  characterDevice: () => Promise<string[]>;
  FIFO: () => Promise<string[]>;
  socket: () => Promise<string[]>;
  symbolicLink: () => Promise<string[]>;
  all: () => Promise<string[]>;
  count: {
    isLeaf: boolean;
    isNode: boolean;
    isEmptyLeaf: boolean;
    isEmptyNode: boolean;
  };
  isLeaf(): boolean;
  isNode(): boolean;
  isEmptyLeaf(): boolean;
  isEmptyNode(): boolean;
};

/*
{
    dirs: () => Promise<string[]>;
    files: () => Promise<string[]>;
    blockDevice: () => Promise<string[]>;
    characterDevice: () => Promise<string[]>;
    FIFO: () => Promise<...>;
    socket: () => Promise<...>;
    symbolicLink: () => Promise<...>;
    all: () => Promise<...>;
}
 */
export async function getListingAsync(pathSrc: string = '') {
  // HACK: if async is needed at the top level or at the element/items levels
  const files = (await getFilesAsync(pathSrc)).map(i => `${i}`);
  const dirs = (await getDirs(pathSrc)).map(i => `${i}`);
  return {
    pathSrc,
    ...getFilesAndMore(pathSrc),

    count: {
      isLeaf: dirs.length === 0,
      isNode: dirs.length > 0,
      isEmptyLeaf: dirs.length === 0 && files.length === 0,
      isEmptyNode: dirs.length > 0 && files.length === 0,
    },

    isLeaf() {
      return dirs.length === 0;
    },
    isNode() {
      return dirs.length > 0;
    },
    isEmptyLeaf() {
      return dirs.length === 0 && files.length === 0;
    },
    isEmptyNode() {
      return dirs.length > 0 && files.length === 0;
    },
  };
}

// prettier-ignore
export function getFilesAndMore(pathSrc: string) {
  const dirs = async () => (await getDirs(pathSrc)).map(i => `${i}`);
  const files = async () => (await getFilesAsync(pathSrc)).map(i => `${i}`);
  return {
    dirs: async () => dirs(),
    files: async () => files(),
    blockDevice: async () => (await getBlockDevice(pathSrc)).map(i => `${i}`),
    characterDevice: async () => (await getCharacterDevice(pathSrc)).map(i => `${i}`),
    FIFO: async () => (await getFIFO(pathSrc)).map(i => `${i}`),
    socket: async () => (await getSocket(pathSrc)).map(i => `${i}`),
    symbolicLink: async () => (await getSymbolicLink(pathSrc)).map(i => `${i}`),
    all: async () => [...(await dirs()), ...(await files())],
  };
}
export async function getFilesAsync(pathSrc: string = '') {
  const readdir = await fsp.readdir(pathSrc, { withFileTypes: true });
  // readdir.filter(i => !i.isDirectory()).map(i => i.name);
  try {
    return readdir.filter(i => !i.isDirectory()).map(i => i.name);
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getDirs(pathSrc: string = '') {
  const readdir = await fsp.readdir(pathSrc, { withFileTypes: true });
  try {
    return readdir.filter(i => i.isDirectory()).map(i => i.name);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getBlockDevice(pathSrc: string = '') {
  const readdir = await fsp.readdir(pathSrc, { withFileTypes: true });
  try {
    return readdir.filter(i => i.isBlockDevice()).map(i => i.name);
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getCharacterDevice(pathSrc: string = '') {
  const readdir = await fsp.readdir(pathSrc, { withFileTypes: true });
  try {
    return readdir.filter(i => i.isCharacterDevice()).map(i => i.name);
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getFIFO(pathSrc: string = '') {
  const readdir = await fsp.readdir(pathSrc, { withFileTypes: true });
  try {
    return readdir.filter(i => i.isFIFO()).map(i => i.name);
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getSocket(pathSrc: string = '') {
  const readdir = await fsp.readdir(pathSrc, { withFileTypes: true });
  try {
    return readdir.filter(i => i.isSocket()).map(i => i.name);
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getSymbolicLink(pathSrc: string = '') {
  const readdir = await fsp.readdir(pathSrc, { withFileTypes: true });
  try {
    return readdir.filter(i => i.isSymbolicLink()).map(i => i.name);
  } catch (error) {
    console.error(error);
    return [];
  }
}
/*
export type DirentWithFileType = {
  fileName: string;
  getBlockDevice: boolean;
  getCharacterDevice: boolean;
  getDirectory: boolean;
  getFIFO: boolean;
  getFile: boolean;
  getSocket: boolean;
  getSymbolicLink: boolean;
};

 */
