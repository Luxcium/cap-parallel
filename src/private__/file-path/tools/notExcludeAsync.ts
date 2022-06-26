import { WithExclude } from '../types';

export async function notExcludeAsync(item: Promise<WithExclude>) {
  return !(await item).exclude;
}
