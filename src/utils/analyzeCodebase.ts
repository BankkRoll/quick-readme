// analyzeCodebase.ts

import fs from 'fs';
import path from 'path';

export const analyzeCodebase = (startPath: string): Record<string, number> => {
  const languageStats: Record<string, number> = {};

  const processFile = (filePath: string) => {
    const extension = path.extname(filePath);
    const language = extensionToLanguage(extension);
    if (language) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const lines = fileContent.split('\n').length;
      languageStats[language] = (languageStats[language] || 0) + lines;
    }
  };

  const processDir = (dirPath: string) => {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        processDir(filePath);
      } else {
        processFile(filePath);
      }
    });
  };

  const extensionToLanguage = (extension: string): string | null => {
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
