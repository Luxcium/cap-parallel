import { WithExcludeFlag, withKey } from './withKey';

export function withExcludeFlag<B extends {} = {}>(base: B, value: boolean) {
  return withKey<B, WithExcludeFlag>('exclude', base, value);
}
