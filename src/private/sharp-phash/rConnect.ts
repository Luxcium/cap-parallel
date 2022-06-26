import { redisCreateClient } from '../redis/tools';

export async function rConnect(port = 6383, dbNumber = 0, host = '0.0.0.0') {
  /** REDIS CLIENT */
  const R = redisCreateClient({ port, dbNumber, host });
  await R.connect();
  return R;
}
