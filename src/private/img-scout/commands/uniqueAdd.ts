import { immediateZalgo } from '../../utils';
import { isQueryResultList } from '../tools';
import type { PQuerryAndAdd, QueryResultItem, RawQueryResult } from '../types';
import { hasSameTitleInclude } from '../utils/hasSameTitleInclude';
import { shiftTitle } from '../utils/shiftTitle';
import { addPhash } from './addPhash';
import { queryPhash } from './queryPhash';

// -5 add as the first and only
// (not isQueryResultList or length === 0 )

// -10 add as the next and more
// (has Not SomeTitleInclude but is queryResultList & length > 0 )

// -15 already added previously
// (has SomeTitleInclude so it was previously -10 or -5)

const _keys: any = { list: {} };
const keys: any = (k: string) => {
  const tempValue = _keys.list[k] || 0;
  _keys.list[k] = 1;
  return tempValue;
};

export async function uniqueAdd(
  querryAndAddParam: PQuerryAndAdd
): Promise<QueryResultItem[]> {
  const { R, k, phash_, title, radius } = querryAndAddParam;

  const rawQueryResult: RawQueryResult = queryPhash(
    R,
    k,
    phash_,
    radius || '0',
    true,
    keys
  );
  const queryResultList = await rawQueryResult;

  let id = 0;
  if (queryResultList.length > 0 && isQueryResultList(queryResultList)) {
    if (hasSameTitleInclude(title, queryResultList)) {
      let tCount = -15;

      //++ already added previously will be lower than -15 -----------
      return immediateZalgo(
        queryResultList
          .map(shiftTitle(title, `${tCount--}`))
          .sort((a, b) => Number(a[2]) - Number(b[2]))
      );
    }

    id = await addPhash(R, k, phash_, title);
    //++ add as the the next and more as -10 -------------------------
    queryResultList.unshift([title, id, '-10']);
    return immediateZalgo(queryResultList);
  }

  id = await addPhash(R, k, phash_, title);
  //++ add as the first and only as -5 -------------------------------
  return immediateZalgo([[title, id, '-5']]);
}
