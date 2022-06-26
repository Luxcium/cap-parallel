import { isA_Promise } from '../../tools';
import type {
  CurrentPath,
  DirentWithFileType,
  PathAndStats,
  PathWithStats,
} from '../../types';

function makeGenericFilter() {
  return true;
}

void makeGenericFilter;
function genericFilter(
  element: Promise<PathAndStats | PathWithStats>
): Promise<boolean>;
function genericFilter(element: CurrentPath): boolean;
function genericFilter(element: DirentWithFileType[]): DirentWithFileType[];
function genericFilter(element: DirentWithFileType): boolean;

function genericFilter(
  element:
    | DirentWithFileType
    | DirentWithFileType[]
    | CurrentPath
    | Promise<PathAndStats | PathWithStats>
): boolean | DirentWithFileType[] | Promise<boolean> {
  if (Array.isArray(element)) return element.filter(item => item.isFile);

  if ('isFile' in element) return element.isFile;

  if (isA_Promise(element)) {
    return (async () => {
      const element_ = await element;
      return element_.type === 'File';
    })();
  }

  return element.type === 'File';
}
[
  [
    (item: DirentWithFileType) => item.isFile,
    'isFile',
    (element: DirentWithFileType) => element.isFile,
    'File',
  ],
  [
    (item: DirentWithFileType) => item.isDirectory,
    'isDirectory',
    (element: DirentWithFileType) => element.isDirectory,
    'Directory',
  ],
];

void { genericFilter };
