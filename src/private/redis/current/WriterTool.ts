import { RedisClientType } from '../../types';

export type WriterTool = (R: RedisClientType, options: any) => Promise<any[]>;
