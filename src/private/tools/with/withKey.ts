function kv<V = unknown>(
  key: PropertyKey,
  value: V
): { [Key: PropertyKey]: V } {
  return { [key]: value } as { [Key: PropertyKey]: V };
}

function kva<AValue = unknown>(
  aKey: PropertyKey,
  aValue: AValue
): { await: { [AKey: PropertyKey]: AValue } } {
  return { await: { [aKey]: aValue } } as {
    await: { [AKey: PropertyKey]: AValue };
  };
}

export function withKey<B extends {}, W extends object, V = unknown>(
  key: keyof W,
  base: B,
  value: V
): B & W {
  return { ...base, ...kv<V>(key, value) } as B & W;
}

/** DEMO FUNCTION */
export function withExt<B extends {} = {}>(base: B, value: string) {
  return withKey<B, WithExt>('ext', base, value);
}

export function ifAwaitBase<B, W>(base: B & { await?: W }) {
  if (base && base.await) return base.await as W;
  return null;
}

export function withAwaitedKey<
  B extends { await?: W },
  W extends object,
  A,
  V = unknown
>(
  key: keyof W,
  base: B,
  value: V
): {
  [P in Exclude<keyof B, 'await'>]: B[P];
} & { await: W & A } {
  const awating = ifAwaitBase<B, W>(base);
  if (awating) {
    return { ...base, await: { ...awating, ...kva<V>(key, value) } } as B & {
      await: W & A;
    };
  }
  return { ...base, await: { ...kv<V>(key, value) } } as B & {
    await: W & A & typeof base.await;
  };
}
export type Awaited<B, W> = B & ({ await?: W } | { await: W });

type WithExt = {
  ext: string;
};

export type WithExcludeFlag = {
  exclude: boolean;
};

export type WithCount = {
  count: number;
};

export type WithFileName = {
  fileName: string;
};
