import { Bg } from '../file-path/types';

export function endAsyncSpark(R: any, errorMessage: string) {
  return async (bg: Bg<any>) => {
    try {
      const a = await bg.asyncSpark();
      R.QUIT();
      return a;
    } catch (error) {
      return console.error(errorMessage, error);
    }
  };
}
