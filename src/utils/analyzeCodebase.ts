import fs from 'fs';
import path from 'path';

export const analyzeCodebase = (startPath: string): Record<string, number> => {
  const languageStats: Record<string, number> = {};
  const excludeDirs = ['node_modules', '.next', '.git', 'dist', 'build'];

  const processFile = (filePath: string) => {
    const extension = path.extname(filePath);
    const language = extensionToLanguage(extension, filePath);
    if (language) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split('\n').length;
        languageStats[language] = (languageStats[language] || 0) + lines;
      } catch (err) {
        console.error(`Error reading file ${filePath}: ${err}`);
      }
    }
  };

  const processDir = (dirPath: string) => {
    try {
      const files = fs.readdirSync(dirPath);
      files.forEach(file => {
        if (excludeDirs.includes(file)) return;
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
          processDir(filePath);
        } else {
          processFile(filePath);
        }
      });
    } catch (err) {
      console.error(`Error reading directory ${dirPath}: ${err}`);
    }
  };

  const extensionToLanguage = (
    extension: string,
    filePath: string
  ): string | null => {
    const mapping: Record<string, string> = {
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
      const fileContent = fs.readFileSync(filePath, 'utf-8');
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
