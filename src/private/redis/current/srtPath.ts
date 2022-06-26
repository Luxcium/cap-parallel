import { X004Da, X004Db } from '../../../constants/devPaths';
import { replaceStr } from './replaceStr';

const shorthenTo = '${X004D}';
export function srtPath(testString: string) {
  return replaceStr(
    X004Da,
    shorthenTo
  )(replaceStr(X004Db, shorthenTo)(testString));
}
