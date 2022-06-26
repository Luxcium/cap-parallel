import { QueryResultItem } from '.';
import { N, S } from '../../types/IQueryListPhash';
import { CurrentPath } from '../../file-path/types';

export type TX_ = Promise<{
  transact: Promise<QueryResultItem[]>;
  path: CurrentPath;
  pHash: {
    willPhash_?: () => Promise<S | null>;
    index: N;
    value: null | string;
  };
}>;
