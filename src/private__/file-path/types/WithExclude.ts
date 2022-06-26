export type IsExcluded = {
  exclude: true;
};
export type NotExcluded = {
  exclude: false;
};

export type WithExclude =
  | IsExcluded
  | NotExcluded
  | {
      exclude: boolean;
    };
export type Excluded<T extends true | false> = T extends true
  ? IsExcluded
  : NotExcluded;
