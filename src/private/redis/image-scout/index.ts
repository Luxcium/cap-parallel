import { transformArguments as ADD } from './ADD';
import { transformArguments as DEL } from './DEL';
import { transformArguments as LOOKUP } from './LOOKUP';
import { transformArguments as QUERY } from './QUERY';
import { transformArguments as SIZE } from './SIZE';
import { transformArguments as SYNC } from './SYNC';

export const imageScout = {
  ADD,
  add: ADD,
  DEL,
  del: DEL,
  LOOKUP,
  lookup: LOOKUP,
  QUERY,
  query: QUERY,
  SIZE,
  size: SIZE,
  SYNC,
  sync: SYNC,
};

/*
Module Commands
The Redis-Imagescout module introduces the mvptree datatype with the following commands:
imgscout.add key hashvalue title [id]
adds a new image perceptual hash to the queue for later addition. When the new additions reaches a threshold number, the new arrivals are added to the index in a batch. To add right away, immediately follow up with the sync command. Returns the id integer value assigned to this image. The title string is added as a hash field to the key: key. Optionally, an id integer can be appended to the end of the command, but this is not the normal use.

imgscout.sync key
adds all the recently submitted image perceptual hashes to the index. Returns an OK status message.

imgscout.query key target-hash radius
queries for all perceptual hash targets within a given radius. Returns an array of results. Each item in the array is also an array of two items: the title string and the id integer.

imgscout.lookup key id
looks up an integer id. Returns the title string.

imgscout.size key
Returns the number of entries in the index.

imgscout.del key id
deletes the id from the index. Returns OK status.

Client Demo Program
Use the imgscoutclient utility to add or query the image files in a given directory. Run ./imgscoutclient -h for all the options. After adding files, be sure to run ./imgscoutclient --cmd sync --key mykey to add the recent additions to the index structure.
*/

// 'IMGSCOUT.ADD'
// 'IMGSCOUT.DEL '
// 'IMGSCOUT.LOOKUP'
// 'IMGSCOUT.QUERY'
// 'IMGSCOUT.SIZE'
// 'IMGSCOUT.SYNC'

//
