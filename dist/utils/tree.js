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
const generateTree = (dir, level = 0, treeString = '') => {
  const padding = ' '.repeat(level * 4);
  const items = fs_1.default.readdirSync(dir);
  for (const item of items) {
    if (item !== 'node_modules') {
      const location = path_1.default.join(dir, item);
      const stat = fs_1.default.statSync(location);
      if (stat.isDirectory()) {
        treeString += `${padding}+-- ${item}/\n`;
        treeString = (0, exports.generateTree)(location, level + 1, treeString);
      } else {
        treeString += `${padding}+-- ${item}\n`;
      }
    }
  }
  return treeString;
};
exports.generateTree = generateTree;
//# sourceMappingURL=tree.js.map
