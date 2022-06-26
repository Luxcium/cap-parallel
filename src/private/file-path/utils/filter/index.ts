import { filterBlockDevices } from './filterBlockDevices';
import { filterCharacterDevices } from './filterCharacterDevices';
import { filterDirectories } from './filterDirectories';
import { filterFIFOs } from './filterFIFOs';
import { filterFiles } from './filterFiles';
import { filterSockets } from './filterSockets';
import { filterSymbolicLinks } from './filterSymbolicLinks';

const filter = {
  fileType: {
    blockDevice: filterBlockDevices,
    characterDevice: filterCharacterDevices,
    directory: filterDirectories,
    fIFO: filterFIFOs,
    file: filterFiles,
    socket: filterSockets,
    symbolicLink: filterSymbolicLinks,
  },
};

export {
  filter,
  filterBlockDevices,
  filterCharacterDevices,
  filterDirectories,
  filterFIFOs,
  filterFiles,
  filterSockets,
  filterSymbolicLinks,
};
