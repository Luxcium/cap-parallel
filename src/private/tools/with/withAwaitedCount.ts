import { Awaited, withAwaitedKey, WithCount } from './withKey';

/** DEMO FUNCTION */
export function withAwaitedCount<B extends {} = {}>(
  base: Awaited<B, unknown>,
  value: number
) {
  return withAwaitedKey<B, WithCount, typeof base.await, number>(
    'count',
    base,
    value
  ) as B & { await: WithCount & typeof base.await };
}
