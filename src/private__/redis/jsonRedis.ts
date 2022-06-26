import { Tedis } from 'tedis';

const RDSServer_6382 = () => {
  const tedis = new Tedis({
    port: 6382,
    host: '0.0.0.0',
  });

  return { tedis, tedisClose: tedis.close };
};

const jsonGetForFullKey =
  (RDSServer: Tedis) => (fullKey: string) => (jsonPath: string) =>
    jsonGet(RDSServer, fullKey, jsonPath);

const jsonGetForJsonPath =
  (RDSServer: Tedis) => (jsonPath: string) => (fullKey: string) =>
    jsonGet(RDSServer, fullKey, jsonPath);

const jsonGetForJsonPathAndKey =
  (fullKey: string, jsonPath: string) => (RDSServer: Tedis) =>
    jsonGet(RDSServer, fullKey, jsonPath);

async function jsonGet(RDSServer: Tedis, fullKey: string, jsonPath: string) {
  return RDSServer.command('JSON.GET', fullKey, jsonPath);
}
jsonGet.forFullKey = jsonGetForFullKey;
jsonGet.forJsonPath = jsonGetForJsonPath;
jsonGet.forJsonPathAndKey = jsonGetForJsonPathAndKey;

const jsonSetForFullKey =
  (RDSServer: Tedis) => (fullKey: string) => (jsonPath: string) =>
    jsonSet(RDSServer, fullKey, jsonPath);

const jsonSetForJsonPath =
  (RDSServer: Tedis) => (jsonPath: string) => (fullKey: string) =>
    jsonSet(RDSServer, fullKey, jsonPath);

function jsonSet(RDSServer: Tedis, fullKey: string, jsonPath: string) {
  return async (value: string | number | null | boolean) => {
    let val: string | number = `${value}`;
    if (value === null || value === 'null') val = `null`;
    // deepcode ignore IncompatibleTypesInComparison: <please specify a reason of ignoring this>
    if (value === false || value === 'false') val = `false`;
    // deepcode ignore IncompatibleTypesInComparison: <please specify a reason of ignoring this>
    if (value === true || value === 'true') val = `true`;
    if (typeof value === 'number') val = `${value}`;
    // TODO: figureout for strings later
    if (typeof value === 'string') val = `${value}`;

    const jset = await RDSServer.command('JSON.SET', fullKey, jsonPath, val);
    // LOG:
    console.log('inside json.set');
    return jset;
  };
}

jsonSet.forFullKey = jsonSetForFullKey;
jsonSet.forJsonPath = jsonSetForJsonPath;

export { jsonGet, jsonSet, RDSServer_6382 };

// main()
main;
function main() {
  const redis6382 = RDSServer_6382();
  jsonSet(
    redis6382.tedis,
    'key00',
    '.'
  )('{"dev":2066,"mode":33279,"nlink":1}').then(() => redis6382.tedis.close());
}
