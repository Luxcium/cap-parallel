import { tooShort } from './s-code-v2.1';

export function getKeywords(collctnShortName: string) {
  return collctnShortName
    .split('-')
    .filter(csn => csn !== '')
    .filter(csn => isNaN(csn as unknown as number))
    .filter(csn => csn.length > 1)
    .slice(0, -1)
    .filter(notIn => !tooShort.some(isIn => isIn === notIn))
    .sort()
    .sort((a, b) => a.length - b.length);
}
