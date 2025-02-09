/*------------------------------------------------------------------------------
 *  Copyright (c) 2020 Alex Ewerlöf @userpixel (https://github.com/userpixel)
 *  Licensed under the MIT License.
 *  For original license information see:
 *  https://github.com/userpixel/cap-parallel/blob/master/LICENSE.md
 *
 *  Original °Standar JS° version (without semi colons):
 *  https://raw.githubusercontent.com/userpixel/cap-parallel/master/index.js
 *----------------------------------------------------------------------------*/

const am = require('am');
const got = require('got');
const { promisify } = require('util');
const { setImmediate } = require('timers');

const setImmediateP = promisify(setImmediate);

async function mapItem(mapFn, currentValue, index, array) {
  try {
    await setImmediateP();
    return {
      status: 'fulfilled',
      value: await mapFn(currentValue, index, array),
    };
  } catch (reason) {
    return {
      status: 'rejected',
      reason,
    };
  }
}

async function worker(id, gen, mapFn, result) {
  console.time(`Worker ${id}`);
  for (let [currentValue, index, array] of gen) {
    console.time(`Worker ${id} --- index ${index} item ${currentValue}`);
    result[index] = await mapItem(mapFn, currentValue, index, array);
    console.timeEnd(`Worker ${id} --- index ${index} item ${currentValue}`);
  }
  console.timeEnd(`Worker ${id}`);
}

function* arrayGenerator(array) {
  for (let index = 0; index < array.length; index++) {
    const currentValue = array[index];
    yield [currentValue, index, array];
  }
}

async function mapAllSettled(arr, mapFn, limit = arr.length) {
  const result = [];

  if (arr.length === 0) {
    return result;
  }

  const gen = arrayGenerator(arr);

  limit = Math.min(limit, arr.length);

  const workers = new Array(limit);
  for (let i = 0; i < limit; i++) {
    workers.push(worker(i, gen, mapFn, result));
  }

  console.log(`Initialized ${limit} workers`);

  await Promise.all(workers);

  return result;
}

const urls = [];
for (let i = 0; i < 100; i++) {
  urls.push(`https://www.google.com/search?q=${i}`);
}

async function mapFn(url, i) {
  const contents = await got(url);
  return { i, url, contents };
}

async function main() {
  console.time('Promise.allSettled');
  const results1 = await Promise.allSettled(urls.map(mapFn));
  console.timeEnd('Promise.allSettled');
  console.log('------------');
  console.dir(results1);

  console.time('mapAllSettled');
  const results2 = await mapAllSettled(urls, mapFn, 10);
  console.timeEnd('mapAllSettled');
  console.log('------------');
  console.dir(results2);
}

am(main);
