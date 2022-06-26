export const filesTypeList = [
  'isBlockDevice',
  'isCharacterDevice',
  'isDirectory',
  'isFIFO',
  'isFile',
  'isSocket',
  'isSymbolicLink',
];

export type T1 = unknown & true;
export type T2 = never & false;
export type T3 = any & false;

export type T1_ = unknown | false;
export type T2_ = never | true;
export type T3_ = any | false;
export type T4 = (val: string) => any
type T5 = T4 & T6
export type T6 = (val:any)=>number
export const thisFunct: T5 = (str) => str.length;

export const value = thisFunct('value')
