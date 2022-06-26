export function replaceStr(searchValue: string, replaceValue: string) {
  return (testString: string) => testString.replace(searchValue, replaceValue);
}
