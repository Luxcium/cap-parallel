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
  targetHash: string,
  radius: number
): Array<string | number> {
  return ['GRAPH.QUERY', key, targetHash, radius];
}

export declare function transformReply(): number;
