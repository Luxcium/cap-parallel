import { QueryResultItem, QueryResultObject } from '../../img-scout/types';

export type OldStrange =
  | {
      getQueryResult: () => any;
      dir: string;
      fullPath: string;
      baseName: string;
      extname: string;
      exclude: true;
      pHash: string | null;
      queryResult: (QueryResultItem | QueryResultObject)[] | null;
    }
  | {
      getQueryResult: () => any;
      dir: string;
      fullPath: string;
      baseName: string;
      extname: string;
      exclude: false;
      pHash: string | null;
      queryResult: (QueryResultItem | QueryResultObject)[] | null;
    }
  | {
      getQueryResult: () => any;
      dir: string;
      fullPath: string;
      baseName: string;
      extname: string;
      exclude: boolean;
      pHash: string | null;
      queryResult: (QueryResultItem | QueryResultObject)[] | null;
    };
