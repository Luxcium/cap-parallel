import { toQueryResultObj } from '../tools/toQueryResultObj';
import type { PQuerryAndAdd, QueryResultItem } from '../types';
import { uniqueAdd } from './uniqueAdd';

export async function uniqueAddToObj(querryAndAddParam: PQuerryAndAdd) {
  const addRes: Promise<QueryResultItem[]> = uniqueAdd(querryAndAddParam);
  return toQueryResultObj(addRes);
}
