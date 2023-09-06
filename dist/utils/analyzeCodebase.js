'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.analyzeCodebase = void 0;
// src/utils/analyzeCodebase.ts
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const analyzeCodebase = startPath => {
  const languageStats = {};
  const excludeDirs = ['node_modules', '.next', '.git', 'dist', 'build'];
  const processFile = filePath => {
    const extension = path_1.default.extname(filePath);
    const language = extensionToLanguage(extension, filePath);
    if (language) {
      try {
        const fileContent = fs_1.default.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split('\n').length;
        languageStats[language] = (languageStats[language] || 0) + lines;
      } catch (err) {
        console.error(`Error reading file ${filePath}: ${err}`);
      }
    }
  };
  const processDir = dirPath => {
    try {
      const files = fs_1.default.readdirSync(dirPath);
      files.forEach(file => {
        if (excludeDirs.includes(file)) return;
        const filePath = path_1.default.join(dirPath, file);
        if (fs_1.default.statSync(filePath).isDirectory()) {
          processDir(filePath);
        } else {
          processFile(filePath);
        }
      });
    } catch (err) {
      console.error(`Error reading directory ${dirPath}: ${err}`);
    }
  };
  const extensionToLanguage = (extension, filePath) => {
    const mapping = {
      '.js': 'JavaScript',
      '.ts': 'TypeScript',
      '.jsx': 'JavaScript (React)',
      '.tsx': 'TypeScript (React)',
      '.json': 'JSON',
      '.coffee': 'CoffeeScript',
      '.scss': 'Sass',
      '.less': 'Less',
      '.styl': 'Stylus',
      '.vue': 'Vue.js',
      '.elm': 'Elm',
      '.cljs': 'ClojureScript',
      '.go': 'Go (GopherJS)',
      '.rs': 'Rust (WebAssembly)',
      '.mjs': 'JavaScript (ES Modules)',
      '.cjs': 'JavaScript (CommonJS)',
      '.html': 'HTML',
      '.css': 'CSS',
      '.md': 'Markdown',
      '.graphql': 'GraphQL',
      '.gql': 'GraphQL',
      '.py': 'Python',
      '.rb': 'Ruby',
      '.lua': 'Lua',
      '.java': 'Java',
      '.cs': 'C#',
    };
    let language = mapping[extension] || null;
    // Check for Tailwind CSS and Shadui
    if (
      extension === '.css' ||
      extension === '.scss' ||
      extension === '.less' ||
      extension === '.styl'
    ) {
      const fileContent = fs_1.default.readFileSync(filePath, 'utf-8');
      if (fileContent.includes('tailwindcss')) {
        language = 'Tailwind CSS';
      } else if (fileContent.includes('shadui')) {
        language = 'Shadui';
      }
    }
    return language;
  };
  processDir(startPath);
  return languageStats;
};
exports.analyzeCodebase = analyzeCodebase;
//# sourceMappingURL=analyzeCodebase.js.map
