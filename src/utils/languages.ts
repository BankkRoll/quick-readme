// Define the language colors mapping
// Define the language colors mapping
const languageColors = {
  JavaScript: 'F7DF1E',
  'JavaScript (React)': '61DAFB',
  TypeScript: '3178C6',
  'TypeScript (React)': '2B7489',
  JSON: '20232A',
  CoffeeScript: '244776',
  Sass: 'CF649A',
  Less: '1D365D',
  Stylus: 'FF6347',
  'Vue.js': '4FC08D',
  Elm: '60B5CC',
  ClojureScript: 'DB5855',
  Go: '00ADD8',
  'Go (GopherJS)': '00ADD8',
  Rust: 'DEA584',
  'Rust (WebAssembly)': 'DEA584',
  'JavaScript (ES Modules)': 'F7DF1E',
  'JavaScript (CommonJS)': 'F7DF1E',
  HTML: 'E34C26',
  CSS: '1572B6',
  Markdown: '083F4A',
  GraphQL: 'E10098',
  Python: '3572A5',
  Ruby: '701516',
  Lua: '000080',
  Java: '007396',
  'C#': '239120',
  Nodejs: '8CC84B',
  React: '61DAFB',
  Angular: 'DD0031',
  jQuery: '0769AD',
  Webpack: '8DD6F9',
  Babel: 'F9DC3E',
  Jest: 'C21325',
  Mocha: '8D6748',
  npm: 'CB3837',
};

// Function to generate a visual representation of language usage in a project
export const generateLanguageUsage = (
  languageStats: Record<string, number>
) => {
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

// Export language colors for use in other files
export { languageColors };
