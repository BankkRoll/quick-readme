'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.languageColors = exports.generateLanguageUsage = void 0;
// Define the language colors mapping
const languageColors = {
  JavaScript: 'F7DF1E',
  TypeScript: '3178C6',
  'Node.js': '539E43',
  React: '61DAFB',
  Angular: 'DD0031',
  'Vue.js': '4FC08D',
  jQuery: '0769AD',
  Webpack: '8DD6F9',
  Babel: 'F9DC3E',
  Jest: 'C21325',
  Mocha: '8D6748',
  npm: 'CB3837',
  // Add more languages and their corresponding colors here
};
exports.languageColors = languageColors;
// Function to generate a visual representation of language usage in a project
const generateLanguageUsage = languageStats => {
  let total = 0;
  let otherTotal = 0;
  // Calculate the total usage
  for (const lang in languageStats) {
    total += languageStats[lang];
  }
  // Generate the visual representation
  let visualRepresentation = '';
  for (const lang in languageStats) {
    const percentage = ((languageStats[lang] / total) * 100).toFixed(2);
    if (parseFloat(percentage) < 10) {
      otherTotal += languageStats[lang];
      continue;
    }
    // Use bars or emojis to represent the percentage, you can choose your own representation
    const bars = '█'.repeat(Math.round(parseFloat(percentage) / 10));
    visualRepresentation += `${lang}: ${bars} ${percentage}%\n`;
  }
  // Add the "Other" category if necessary and its value is greater than 0
  if (otherTotal > 0) {
    const otherPercentage = ((otherTotal / total) * 100).toFixed(2);
    if (parseFloat(otherPercentage) > 0) {
      const otherBars = '█'.repeat(
        Math.round(parseFloat(otherPercentage) / 10)
      );
      visualRepresentation += `Other: ${otherBars} ${otherPercentage}%\n`;
    }
  }
  return visualRepresentation;
};
exports.generateLanguageUsage = generateLanguageUsage;
//# sourceMappingURL=languages.js.map
