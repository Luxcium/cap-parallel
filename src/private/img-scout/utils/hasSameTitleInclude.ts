import { QueryResultItem } from '../types';

export function hasSameTitleInclude(
  title: string,
  queryResult: QueryResultItem[]
) {
  return queryResult.some(i => i[0] === title);
}
