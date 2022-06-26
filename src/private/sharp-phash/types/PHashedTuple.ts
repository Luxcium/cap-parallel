import type { CurrentPath } from '../../file-path/types';

export type PHashedTuple = [
  pHash: string | null,
  currentPath: CurrentPath,
  count: number
];
