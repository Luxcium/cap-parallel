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
  id: number
): Array<string | number> {
  return ['GRAPH.LOOKUP', key, id];
}

export declare function transformReply(): string;
