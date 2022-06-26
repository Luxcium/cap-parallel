import fs from 'fs';

export function linkSync(existingPath: string, newPath: string) {
  if (!fs.existsSync(newPath)) {
    fs.linkSync(existingPath, newPath); //tmp/blue/1654566738095
    return true;
  }
  return false;
}
