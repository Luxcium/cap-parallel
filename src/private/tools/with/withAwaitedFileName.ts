import { Awaited, withAwaitedKey, WithFileName } from './withKey';

export function withAwaitedFileName<B extends {} = {}, W = {}>(
  base: Awaited<B, W>,
  value: string
) {
  // type OmitAwait = { [P in Exclude<keyof B, "await">]: B[P]; }
  const result = withAwaitedKey<B, WithFileName, typeof base.await, string>(
    'fileName',
    base,
    value
  );
  return result;
}
