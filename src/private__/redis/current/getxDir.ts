export function getxDir(collctnShortName: string) {
  return collctnShortName
    .split('-')
    .filter(csn => csn !== '')
    .slice(-1)[0];
}
