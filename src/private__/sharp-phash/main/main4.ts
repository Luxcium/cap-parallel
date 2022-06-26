import { globalMain } from '../global-main';

process.title = 'Sharp pHash';
//+ cliCursor hide
console.error('cliCursor hide [?25l]');
process.stderr.write('\u009B?25l');
//+ Use Alternate Screen Buffer.
console.error(
  'Save cursor and switch to alternate buffer clearing it. [?1049h]'
);
console.error('\u009B?1049h');

process.on('SIGINT', () => {
  process.exitCode = 2; //+ 128;
  throw new Error();
});

process.on('SIGTERM', () => {
  process.exitCode = 15; //+ 128;
  throw new Error();
});
process.on('beforeExit', code => {
  console.error('\u009B!p');
  console.error('\u001Bc');
  //+ Use Normal Screen Buffer (clearing screen if in alt).
  console.error('Use Normal Screen Buffer [?1049l]');
  console.error('\u009B?1049l');
  console.error(code - 128);
  console.error('Use Normal Screen Buffer and restore cursor. [?1049l]');
  //+ cliCursor show
  console.error('cliCursor show [?25h]');
  console.error('\u009B?25h');
  console.error(`About to exit with code: ${code - 128}`);
});

globalMain;
// export async function main() {
//   const listFiles001 = listFiles(CURRENT_PATH, true);
//   const listFiles002 = listFiles('/home/luxcium/Téléchargements/animes', true);
//   const listFiles003 = listFiles(
//     '/home/luxcium/Téléchargements/archives 002',
//     true
//   );
//   const listFiles004 = listFiles(
//     '/home/luxcium/Téléchargements/images Archives 001',
//     true
//   );
//   const listFiles005 = listFiles(
//     '/home/luxcium/Téléchargements/Random images 800+',
//     true
//   );
//   const listFiles006 = listFiles(
//     '/home/luxcium/Téléchargements/photos-ChatExport_2022-05-18',
//     true
//   );
//   const boxedGenerator2 = getPhash(
//     filterExtensions(validExts)(
//       BoxedGenerator.from<any>(
//         listFiles001,
//         listFiles002,
//         listFiles003,
//         listFiles004,
//         listFiles005,
//         listFiles006
//       )
//     )
//   );
//   const R = await rConnect();

//   // const boxedGenerator3 = mainFunction(R, boxedGenerator2, 'x001');
//   const redisQuery = doRedisQuery(R, 'x001');
//   const result = boxedGenerator2
//     .map(redisQuery)
//     .map(manageRedisQuery)
//     .asyncSpark()
//     .then(a => {
//       R.QUIT();
//       return a;
//     })
//     .catch(error => console.error('in boxedGenerator3', error));

//   return result;
// }
// main();
