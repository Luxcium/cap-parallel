import { QueryResultObject } from '../types';

export function toTup(queryItem: QueryResultObject) {
  return [queryItem.path, queryItem.id, queryItem.radius];
}
