import { BoxedList } from '@luxcium/boxed-list';

export type Listing = {
  pathSrc: string;
  dirs: () => Promise<BoxedList<string>>;
  files: () => Promise<BoxedList<string>>;
  blockDevice: () => Promise<BoxedList<string>>;
  characterDevice: () => Promise<BoxedList<string>>;
  FIFO: () => Promise<BoxedList<string>>;
  socket: () => Promise<BoxedList<string>>;
  symbolicLink: () => Promise<BoxedList<string>>;
  all: () => Promise<BoxedList<string>>;
  count: {
    isLeaf: boolean; //  dirs.length === 0,
    isNode: boolean; //  dirs.length > 0,
    isEmptyLeaf: boolean; //  dirs.length === 0 && files.length === 0,
    isEmptyNode: boolean; //  dirs.length > 0 && files.length === 0,
  };
  isLeaf(): boolean;
  isNode(): boolean;
  isEmptyLeaf(): boolean;
  isEmptyNode(): boolean;
};

/*
      isLeaf: dirs.length === 0,
      isNode: dirs.length > 0,
      isEmptyLeaf: dirs.length === 0 && files.length === 0,
      isEmptyNode: dirs.length > 0 && files.length === 0,
 */
