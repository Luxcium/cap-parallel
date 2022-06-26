import { getSign } from './getSign';
import { isArray } from './isArray';
import { zalgo, zalgo1, zalgo2, zalgo3 } from './restrainingZalgo';
import {
  immediateZalgo,
  nextTickZalgo,
  restrainingZalgo,
  timeoutZalgo,
} from './utils';

export { isArray } from './isArray';
export { getSign };
export {
  immediateZalgo,
  nextTickZalgo,
  restrainingZalgo,
  timeoutZalgo,
  zalgo,
  zalgo1,
  zalgo2,
  zalgo3,
};

export const utils = {
  getSign,
  isArray,
};
