export type PhashNow = {
  get: () => Promise<string | null>;
  index: number;
};
