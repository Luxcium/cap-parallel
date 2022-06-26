import { Tedis } from 'tedis';

export const getNewTedis = (
  port = 6379,
  host = '127.0.0.1',
  options?: {
    password?: string;
    timeout?: number;
    tls?: {
      key: Buffer;
      cert: Buffer;
    };
  }
) => {
  return new Tedis({
    host,
    port,
    ...options,
  });
};
