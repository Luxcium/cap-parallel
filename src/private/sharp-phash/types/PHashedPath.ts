import type { CurrentPath } from '../../file-path/types';
import { PhashNow } from './PhashNow';

export type PHashedPath = { path: CurrentPath; phash: PhashNow };
