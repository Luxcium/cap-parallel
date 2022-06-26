export type ValidPHash<T extends boolean> = T extends true
  ? IsValidPHash
  : IsNotValidPHash;
export type IsValidPHash = {
  pHash: string;
};
export type IsNotValidPHash = {
  pHash: null;
};
