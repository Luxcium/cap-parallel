import { QueryResultItem } from '../types';

export function toObj(queryItem: QueryResultItem) {
  return {
    path: queryItem[0],
    id: queryItem[1],
    radius: queryItem[2],
  };
}
