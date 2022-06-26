// 1001000001010011110010001001101001111101000010010010000001111101
// 1001000001010011110010001001101001111101000010010010000000000000
// 100100000101001
const str = '1001000001010011110010001001101001111101000010010010000001111101';
const BASE = 36;

function shortBit64(bin64, base = BASE) {
  var hexa1 = parseInt(bin64.slice(0, 16), 2).toString(base).toUpperCase();
  var hexa2 = parseInt(bin64.slice(16, 32), 2).toString(base).toUpperCase();
  var hexa3 = parseInt(bin64.slice(32, 48), 2).toString(base).toUpperCase();
  var hexa4 = parseInt(bin64.slice(48, 64), 2).toString(base).toUpperCase();
  return `${hexa1}-${hexa2}-${hexa3}-${hexa4}_${base}`;
}

function getBackBit64(short64) {
  const split = short64.split('_');
  const base = parseInt(split[1]);

  const splitted = [
    ...split[0]
      .split('-')
      .map(hx => parseInt(hx, base).toString(2).padStart(16, '0')),
  ];

  return splitted.join('');
}

export function distance(a, b) {
  let count = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) count++;

  return count;
}

const myshort64 = shortBit64(str);
console.log(str);
console.log(getBackBit64(myshort64));
console.log(myshort64);

// return `${base}_${hexa1}-${hexa2}-${hexa3}-${hexa4}`;
// -${hexa5}-${hexa6}-${hexa7}-${hexa8} .padStart(8, '0')
// console.log(
//   `${hexa1}-${hexa2}-${hexa3}-${hexa4}` // -${hexa5}-${hexa6}-${hexa7}-${hexa8}
// );

// const splitted = [
//   ...`${hexa1}-${hexa2}-${hexa3}-${hexa4}` // -${hexa5}-${hexa6}-${hexa7}-${hexa8} .padStart(8, '0')
//     .split('-')
//     .map(hx => parseInt(hx, BASE).toString(2).padStart(16, '0')),
// ];
// console.log(splitted.join(''));

/*







 */
// splitted.map(hx => parseInt(hx, 16).toString(2));

// for (const bit of str) {
//   console.log(bit);s
// }
// console.log('hexa :>> ', hexa);
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// class BinarySearchTree {
//   constructor() {
//     this.root = null;
//   }
// }

// var tree = new BinarySearchTree();
// tree.root = new Node(10);
// tree.root.right = new Node(15);
// tree.root.left = new Node(7);
// tree.root.left.right = new Node(9);

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    var newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    var current = this.root;
    while (true) {
      if (value === current.value) return;
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }
}

//      10
//   5     13
// 2  7  11  16

// var tree = new BinarySearchTree();
// tree.insert(10);
// tree.insert(5);
// tree.insert(13);
// tree.insert(11);
// tree.insert(2);
// tree.insert(16);
// tree.insert(7);
