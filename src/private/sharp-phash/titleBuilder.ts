const humanSize = require('human-size');

export function titleBuilder({
  key,
  size,
  dir,
  baseName,
  extname,
}: {
  key: string;
  size: number;
  dir: string;
  baseName: string;
  extname: string;
}) {
  return `${key}:${
    size > 0 ? humanSize(size, 2) || 0 : 0
  }:${size}:${dir}:${baseName}:${extname.split('.').slice(1).join('')}`;
}
