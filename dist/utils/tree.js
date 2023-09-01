'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateTree = void 0;
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
// List of directories and files to ignore
const ignoreList = ['.git', '.next', 'node_modules', '.DS_Store', '.objects'];
const generateTree = (dir, level = 0, treeString = '', parent = '') => {
  const padding = ' '.repeat(level * 4);
  const items = fs_1.default.readdirSync(dir);
  for (const item of items) {
    if (!ignoreList.includes(item)) {
      const location = path_1.default.join(dir, item);
      const stat = fs_1.default.statSync(location);
      const isLastItem = items.indexOf(item) === items.length - 1;
      if (stat.isDirectory()) {
        const folderIcon = level === 0 ? '📦' : '📂';
        treeString += `${padding}${
          isLastItem ? '└──' : '├──'
        } ${folderIcon} ${item}/\n`;
        treeString = (0, exports.generateTree)(
          location,
          level + 1,
          treeString,
          item
        );
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
exports.generateTree = generateTree;
//# sourceMappingURL=tree.js.map
