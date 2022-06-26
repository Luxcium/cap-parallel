import {
  CurrentPathError,
  GetStats,
  IsExcluded,
  IsNotValidPHash,
  IsValidPHash,
  NotExcluded,
  PathAndStats,
  PathWithStats,
} from '../../file-path/types';
import { QueryResultObject } from '../../img-scout/types';
import { FilePath } from '../FilePath';

export type Strange<Bool extends boolean = true | false> = {
  getChild: () => Promise<PathWithStats | PathAndStats | CurrentPathError>[];
  getStats: () => Promise<GetStats>;
  pHashValue: () => Promise<
    (NotExcluded & IsValidPHash) | (IsExcluded & IsNotValidPHash)
  >;
  queryResult: () => Promise<QueryResultObject[] | null>;
} & FilePath<Bool>;
