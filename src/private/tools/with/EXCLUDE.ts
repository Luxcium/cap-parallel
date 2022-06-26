import { withAwaitedCount } from './withAwaitedCount';
import { withAwaitedFileName } from './withAwaitedFileName';
import { withExcludeFlag } from './withExcludeFlag';
import { withExt } from './withKey';

const EXCLUDE = true;
const toto = withExt({}, 'jpg');
const toto2 = withExcludeFlag(toto, EXCLUDE);
const toto3 = withAwaitedCount(toto2, 10);
const toto4 = withAwaitedFileName<typeof toto3, typeof toto3.await>(
  toto3,
  'name'
);
export { toto4 };
