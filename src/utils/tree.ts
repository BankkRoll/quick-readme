import fs from 'fs';
import path from 'path';

// List of directories and files to ignore
const ignoreList: string[] = [
  '.git',
  '.next',
  'node_modules',
  '.DS_Store',
  '.objects',
];

export const generateTree = (
  dir: string,
  level: number = 0,
  treeString: string = '',
  parent: string = ''
): string => {
  const padding: string = ' '.repeat(level * 4);
  const items: string[] = fs.readdirSync(dir);

  for (const item of items) {
    if (!ignoreList.includes(item)) {
      const location: string = path.join(dir, item);
      const stat = fs.statSync(location) as import('fs').Stats;

      const isLastItem = items.indexOf(item) === items.length - 1;

      if (stat.isDirectory()) {
        const folderIcon = level === 0 ? '📦' : '📂';
        treeString += `${padding}${
          isLastItem ? '└──' : '├──'
        } ${folderIcon} ${item}/\n`;
        treeString = generateTree(location, level + 1, treeString, item);
      } else {
        const fileIcon = '📄';
        treeString += `${padding}${
          isLastItem ? '└──' : '├──'
        } ${fileIcon} ${item}\n`;
      }
    }
  }

  return treeString;
};
