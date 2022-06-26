import { isA_Promise } from '../../file-path/tools';
import { P } from '../../types';
import {
  QueryResultItem,
  QueryResultObject,
  QueryResultSize,
  SplitPath,
} from '../types';
import { getSplit } from './getSplit';
import { reorder } from './reorder';

export function toQueryResultObj(
  queryItems: QueryResultItem
): QueryResultObject & QueryResultSize;
export function toQueryResultObj(
  queryItems: P<QueryResultItem[]>
): P<QueryResultObject[]>;
export function toQueryResultObj(
  queryItems: QueryResultItem | P<QueryResultItem[]>
): (QueryResultObject & QueryResultSize) | P<QueryResultObject[]> {
  //++----------------------------------------------------------------

  return isA_Promise(queryItems)
    ? (async () => {
        return queryItemsResult(await queryItems);
      })()
    : toSizedObj(queryItems);

  //++----------------------------------------------------------------
}

function queryItemsResult(queryItem: QueryResultItem[]) {
  return queryItem
    .map(
      (
        x: QueryResultItem
      ): QueryResultObject & QueryResultSize & { diff?: number } =>
        toSizedObj(x)
    )
    .sort((a, b) => b.size - a.size || a.path.length - b.path.length)
    .map((item, _i, array) => {
      item.diff = item.size - array[0].size;
      return reorder(item); //{ ...itm };
    });
}

function toSizedObj(queryItem: QueryResultItem): SplitPath & QueryResultObject {
  return {
    ...getSplit(queryItem[0]),
    path: queryItem[0],
    id: queryItem[1],
    radius: queryItem[2],
  };
}
