import { FALSY } from '.';
import type { CurrentPath } from '../file-path/types';
import type { PQuerryAndAdd, QueryResultItem } from '../img-scout/types';
// /home/luxcium/projects/parallel-mapping/src/utilities/files/file-path/types/index.ts
// /home/luxcium/projects/parallel-mapping/src/../../utilities/files/file-path/types
import { N, S } from './IQueryListPhash';

export type TX = Promise<{
  transact: Promise<QueryResultItem[]>;
  path: CurrentPath;
  pHash: {
    willPhash_?: () => Promise<S | null>;
    index: N;
    value: null | string;
  };
  pQuerryAndAdd?: PQuerryAndAdd;
}>;

export type Tx = Promise<{
  transact: FALSY | Promise<QueryResultItem[]>;
  path: FALSY | CurrentPath;
  pHash:
    | FALSY
    | {
        willPhash_?: () => Promise<S | null>;
        index: N;
        value: null | string;
      };
  pQuerryAndAdd?: FALSY | PQuerryAndAdd;
}>;
