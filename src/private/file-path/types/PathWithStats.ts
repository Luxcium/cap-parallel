import { CurrentPath } from './CurrentPath';
import { CurrentPathError } from './file-path-types';
import { GetStats } from './GetStats';
import { PathAndStats } from './PathAndStats';

export type PathWithStats = CurrentPath & {
  getStats: () => Promise<GetStats>;
  getChild: () => Promise<PathWithStats | PathAndStats | CurrentPathError>[];
};
