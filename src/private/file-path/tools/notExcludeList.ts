import { WithExclude } from '../types';
import { notExcluded } from './notExclude';

export function notExcludeList(list: WithExclude[]) {
  return list.filter(notExcluded);
}
