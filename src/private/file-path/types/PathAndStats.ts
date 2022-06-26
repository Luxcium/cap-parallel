import { Stats } from 'fs';
import { PathWithStats } from './PathWithStats';

export type PathAndStats = PathWithStats & Stats;
