// Define the language colors mapping dynamically based on language name hash
const generateColor = (language: string) => {
  const hash = Array.from(language).reduce(
    (acc, char) => char.charCodeAt(0) + ((acc << 5) - acc),
    0
  );
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return '00000'.substring(0, 6 - c.length) + c;
};

// Function to generate a visual representation of language usage in a project
export const generateLanguageUsage = (
  languageStats: Record<string, number>,
  decimalPrecision: number = 2
) => {
  let total = 0;
  let otherTotal = 0;
  // Calculate the total usage
  for (const lang in languageStats) {
    total += languageStats[lang];
  }

  // Sort languages by usage
  const sortedLanguages = Object.keys(languageStats).sort(
    (a, b) => languageStats[b] - languageStats[a]
  );

  // Generate the visual representation
  let visualRepresentation = '';
  for (const lang of sortedLanguages) {
    const percentage = ((languageStats[lang] / total) * 100).toFixed(
      decimalPrecision
    );
    if (parseFloat(percentage) < 10) {
      otherTotal += languageStats[lang];
      continue;
    }
    const color = generateColor(lang);
    const bars = '█'.repeat(Math.round(parseFloat(percentage) / 10));
    visualRepresentation += `\x1b[38;5;${color}m${lang}: ${bars} ${percentage}%\x1b[0m\n`;
  }

  // Add the "Other" category if necessary and its value is greater than 0
  if (otherTotal > 0) {
    const otherPercentage = ((otherTotal / total) * 100).toFixed(
      decimalPrecision
    );
    if (parseFloat(otherPercentage) > 0) {
      const otherBars = '█'.repeat(
        Math.round(parseFloat(otherPercentage) / 10)
      );
      visualRepresentation += `Other: ${otherBars} ${otherPercentage}%\n`;
    }
  }

  return visualRepresentation;
};

// Export dynamic language colors for use in other files
export const languageColors = (language: string) => generateColor(language);
