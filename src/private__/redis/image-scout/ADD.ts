'IMGSCOUT.ADD';
'IMGSCOUT.SYNC';
'IMGSCOUT.QUERY';
'IMGSCOUT.LOOKUP';
'IMGSCOUT.SIZE';
'IMGSCOUT.DEL';
/*
IMGSCOUT.ADD key hashvalue title [id]
IMGSCOUT.SYNC key
IMGSCOUT.QUERY key target-hash radius
IMGSCOUT.LOOKUP key id
IMGSCOUT.SIZE key
IMGSCOUT.DEL key id
key: string ,hashvalue: string ,title: string
key ,hashvalue ,title
*/
export function transformArguments(
  key: string,
  hashvalue: string,
  title: string,
  id?: number
): Array<string | number> {
  const args: (string | number)[] = ['GRAPH.ADD', key, hashvalue, title];

  if (id != null) args.push(id);

  return args;
}

export declare function transformReply(): number;
