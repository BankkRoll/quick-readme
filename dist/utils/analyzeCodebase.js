'use strict';
// analyzeCodebase.ts
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.analyzeCodebase = void 0;
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const analyzeCodebase = startPath => {
  const languageStats = {};
  const processFile = filePath => {
    const extension = path_1.default.extname(filePath);
    const language = extensionToLanguage(extension);
    if (language) {
      const fileContent = fs_1.default.readFileSync(filePath, 'utf-8');
      const lines = fileContent.split('\n').length;
      languageStats[language] = (languageStats[language] || 0) + lines;
    }
  };
  const processDir = dirPath => {
    const files = fs_1.default.readdirSync(dirPath);
    files.forEach(file => {
      const filePath = path_1.default.join(dirPath, file);
      if (fs_1.default.statSync(filePath).isDirectory()) {
        processDir(filePath);
      } else {
        processFile(filePath);
      }
    });
  };
  const extensionToLanguage = extension => {
    switch (extension) {
      case '.js':
        return 'JavaScript';
      case '.ts':
        return 'TypeScript';
      case '.jsx':
        return 'JavaScript (React)';
      case '.tsx':
        return 'TypeScript (React)';
      case '.css':
        return 'CSS';
      case '.html':
        return 'HTML';
      // ... add more here
      default:
        return null;
    }
  };
  processDir(startPath);
  return languageStats;
};
exports.analyzeCodebase = analyzeCodebase;
//# sourceMappingURL=analyzeCodebase.js.map
