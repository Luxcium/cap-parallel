import { TX } from '../../sharp-phash/types';
import { QueryResultItem } from '../types';

export function getTransact(
  queryResults: QueryResultItem[],
  predicate: (element: string) => boolean
) {
  return queryResults.filter(i => predicate(String(i[2])));
  // return queryResults;
}
export async function readListRx(
  tx: TX
  // listing: IQueryListPhash, Promise<QueryResultItem[]>;
  // path_: string,
  // index: any,
  // radius_: string = RADIUS
) {
  const { transact } = await tx;

  const queryList: QueryResultItem[] = await transact;
  const result = getTransact(queryList, e => e === '0');
  if (result.length > 0) console.log(result.flatMap(i => i).toString());

  // const step2 = queryList.map(([path, , radius]) => {
  //   const result = parseInt(radius) === parseInt(radius_) ? path : null;

  //   if (result == null || typeof result !== 'string') {
  //     return [result];
  //   }
  //   if (path_ !== path) {
  //     console.log(` mv '${result}' '${TARGET}' #`, index);
  //     return [result];
  //   }
  //   console.log('#', ` mv '${result}' '${TARGET}' #`, index);
  //   return [result];
  // });
  // const lastStep = step2;
  // return lastStep;
}
