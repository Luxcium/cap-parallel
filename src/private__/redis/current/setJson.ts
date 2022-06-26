import { jsonGet, jsonSet } from '../jsonRedis';
import { SetJsonArgs } from './SetJsonArgs';

export async function setJson(A: SetJsonArgs) {
  //  const prefix_: string = 'test_123b';
  const { prefix, jsonPath, keyID, value, RDSServer } = A;
  const shortKey = `${prefix}::${keyID}`;
  console.log(shortKey);
  const rootJsonPath = '.';
  const initialValue = `{}`;
  let setResult;
  try {
    if (null === (await jsonGet(RDSServer, shortKey, rootJsonPath))) {
      await jsonSet(RDSServer, shortKey, rootJsonPath)(initialValue);
    }

    setResult = await RDSServer.command(
      'JSON.SET',
      shortKey,
      jsonPath,
      `${value ?? '""'}`
    );
  } catch (error) {
    // LOG:
    console.error(error);
    console.log('JSON.SET');
    console.log(shortKey);
    console.log(jsonPath);
    console.log(`"${value ?? '""'}"`);
  }

  const getBackValue = await RDSServer.command('JSON.GET', shortKey, jsonPath);
  const results = {
    result: [setResult, getBackValue],
    redis: {
      command: 'JSON.SET',
      atKey: shortKey,
      atJsonPath: jsonPath,
      sentValue: `${value}`,
      setResult,
      getBackValue,
    },
  };
  // LOG:
  console.log(results);
  return results;
}
