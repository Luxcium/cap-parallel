import { notExcluded } from '../file-path/tools/notExclude';
import { Bg } from '../file-path/types';
import { QueryResultObject } from '../img-scout/types';
import { linkSync } from './linkSync';
import { Strange } from './types';

export const count2 = { a1: 0, b: 0, len: 0 };

export function manageRedisQuery(bgItem: Bg<Strange<true | false>>) {
  return bgItem.map(async (item, indx) => {
    try {
      if (notExcluded(item)) {
        const { queryResult: qrFn, ...awaited } = item;
        const queryResult = await qrFn();
        if (queryResult) {
          const result = {
            queryResult,
            ...awaited,
          };
          count2.a1 = 0;
          result.queryResult.map(
            (qrItem, _, a) =>
              count2.a1++ === 0 &&
              console.log(
                qrItem,
                (indx || 0) + 1,
                (qrItem as QueryResultObject).radius === '0' &&
                  true &&
                  linkSync(
                    (qrItem as any).fullPath,
                    (qrItem as any).dir +
                      '/sub/0/' +
                      (qrItem as any).file +
                      '.' +
                      (qrItem as any).ext
                  ),
                (qrItem as QueryResultObject).radius === '-5' &&
                  true &&
                  linkSync(
                    (qrItem as any).fullPath,
                    (qrItem as any).dir +
                      '/sub/-5/' +
                      (qrItem as any).file +
                      '.' +
                      (qrItem as any).ext
                  ),
                (qrItem as QueryResultObject).radius === '-10' &&
                  true &&
                  linkSync(
                    (qrItem as any).fullPath,
                    (qrItem as any).dir +
                      '/sub/-10/' +
                      (qrItem as any).file +
                      '.' +
                      (qrItem as any).ext
                  ),
                a.length === 1 &&
                  true &&
                  linkSync(
                    (qrItem as any).fullPath,
                    (qrItem as any).dir +
                      '/sub/ln1/' +
                      (qrItem as any).file +
                      '.' +
                      (qrItem as any).ext
                  ),
                (qrItem as QueryResultObject).radius === '-15' &&
                  true &&
                  linkSync(
                    (qrItem as any).fullPath,
                    (qrItem as any).dir +
                      '/sub/-15/' +
                      (qrItem as any).file +
                      '.' +
                      (qrItem as any).ext
                  ),
                a.length,
                _
              )
          );
          return result.queryResult;
        }
      }
    } catch (error) {
      console.error('in boxedGenerator3', error);
    }
    return item;
  });
}
