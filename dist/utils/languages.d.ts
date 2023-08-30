declare const languageColors: {
  JavaScript: string;
  TypeScript: string;
  'Node.js': string;
  React: string;
  Angular: string;
  'Vue.js': string;
  jQuery: string;
  Webpack: string;
  Babel: string;
  Jest: string;
  Mocha: string;
  npm: string;
};
export declare const generateLanguageUsage: (
  languageStats: Record<string, number>
) => string;
export { languageColors };
