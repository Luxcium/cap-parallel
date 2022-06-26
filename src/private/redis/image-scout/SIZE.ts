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
export function transformArguments(key: string): Array<string> {
  return ['GRAPH.SIZE', key];
}

export declare function transformReply(): number;
