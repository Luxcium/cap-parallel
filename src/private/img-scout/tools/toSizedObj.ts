import { getSplit } from '.';
import type { QueryResultItem, QueryResultObject, SplitPath } from '../types';

export function toSizedObj(
  queryItem: QueryResultItem
): SplitPath & QueryResultObject {
  return {
    ...getSplit(queryItem[0]),
    path: queryItem[0],
    id: queryItem[1],
    radius: queryItem[2],
  };
}
