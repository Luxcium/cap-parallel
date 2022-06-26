export const getKeywords = (collctnShortName: string) => ({
  keywords: [...getKeywordList(collctnShortName)],
});

export const getKeywordList = (collctnShortName: string) => [
  ...collctnShortName
    .split('-')
    .flatMap(csn => csn.split('_'))
    .filter(csn => csn !== '')
    .filter(csn => Number.isNaN(csn as unknown as number))
    .filter(csn => csn.length > 1)
    .slice(0, -1)
    .sort()
    .sort((a, b) => b.length - a.length),
];
