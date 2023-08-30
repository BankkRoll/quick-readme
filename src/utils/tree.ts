import fs from 'fs';
import path from 'path';

export const generateTree = (
  dir: string,
  level: number = 0,
  treeString: string = ''
): string => {
  const padding: string = ' '.repeat(level * 4);
  const items: string[] = fs.readdirSync(dir);

  for (const item of items) {
    if (item !== 'node_modules') {
      const location: string = path.join(dir, item);
      const stat = fs.statSync(location) as import('fs').Stats;

      if (stat.isDirectory()) {
        treeString += `${padding}+-- ${item}/\n`;
        treeString = generateTree(location, level + 1, treeString);
      } else {
        treeString += `${padding}+-- ${item}\n`;
      }
    }
  }

  return treeString;
};
