import { getShortKey } from './getShortKey';

export function withPrefix(PREFIX: string) {
  return (fInfos: { xDir: string; name: string }) =>
    `${PREFIX}:::${getShortKey(fInfos)}`;
}
