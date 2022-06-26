import type { Stats } from 'fs';
import type { CurrentPath } from '.';
import type { CurrentPathError } from './file-path-types';

export type GetStats = (Stats & CurrentPath) | CurrentPathError;
