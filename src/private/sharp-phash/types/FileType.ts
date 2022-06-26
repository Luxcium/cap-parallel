export type FileType<T extends boolean = boolean> = {
  folder: string;
  withStats?: T;
};
