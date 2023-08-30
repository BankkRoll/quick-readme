'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateReadme = void 0;
const fs_1 = __importDefault(require('fs'));
const guessMainLanguage_1 = require('./guessMainLanguage');
const formatScripts_1 = require('./formatScripts');
const tree_1 = require('./tree');
async function generateReadme(answers, packageInfo) {
  let markdown = '';
  let tocEntries = [];
  const { languages, frameworks } = (0, guessMainLanguage_1.guessMainLanguage)(
    packageInfo
  );
  const addToTOC = (title, symbol) => {
    tocEntries.push(`- [${title}](#${symbol})`);
  };
  markdown += `<div align="center">\n<h1 align="center">\n`;
  if (answers.bannerUrl) {
    markdown += `<img src="${answers.bannerUrl}" />\n`;
  }
  markdown += `<br>${answers.title || 'Your Project Title'}\n</h1>\n`;
  markdown += `<h3>◦ ${
    answers.description || 'Your Project Description'
  }</h3>\n</div>\n\n`;
  markdown += `---\n\n`;
  if (
    answers.repo ||
    answers.npmPackage ||
    answers.buildTool ||
    answers.licenseType ||
    languages.length > 0 ||
    frameworks.length > 0
  ) {
    markdown += `<div align="center">\n`;
    const repoName = answers.repo ? answers.repo.split('github.com/')[1] : '';
    const addBadge = badge => {
      markdown += `${badge} `;
    };
    if (answers.buildTool === 'Travis') {
      addBadge(
        `<img src="https://img.shields.io/travis/${repoName}.svg?style=flat-square" alt="Travis">`
      );
    }
    if (answers.npmPackage) {
      addBadge(
        `<img src="https://img.shields.io/npm/v/${answers.npmPackage}.svg?style=flat-square" alt="npm version">`
      );
    }
    if (answers.licenseType) {
      addBadge(
        `<img src="https://img.shields.io/badge/license-${answers.licenseType}-blue.svg?style=flat-square" alt="License">`
      );
    }
    if (Array.isArray(answers.language)) {
      answers.language.forEach(lang => {
        addBadge(
          `<img src="https://img.shields.io/badge/language-${lang}-blueviolet.svg?style=flat-square" alt="${lang}">`
        );
      });
    }
    if (answers.repo) {
      addBadge(
        `<img src="https://img.shields.io/github/stars/${repoName}.svg?style=social" alt="GitHub Stars">`
      );
      addBadge(
        `<img src="https://img.shields.io/github/last-commit/${repoName}.svg?style=flat-square" alt="GitHub Last Commit">`
      );
      addBadge(
        `<img src="https://img.shields.io/github/repo-size/${repoName}.svg?style=flat-square" alt="GitHub Repo Size">`
      );
    }
    languages.forEach(lang => {
      markdown += `<img src="https://img.shields.io/badge/language-${lang}-blueviolet.svg?style=flat-square" alt="${lang}"> `;
    });
    frameworks.forEach(fw => {
      markdown += `<img src="https://img.shields.io/badge/framework-${fw}-green.svg?style=flat-square" alt="${fw}"> `;
    });
    markdown += `</div>\n\n`;
  }
  markdown += `</div>\n\n`;
  markdown += `---\n\n`;
  markdown += '<!--TOC-->\n\n';
  if (answers.projectFeatures) {
    addToTOC('Features', '️-features');
    markdown += `## ⚙️ Features\n\n`;
    markdown += `| Feature | Description |\n`;
    markdown += `| ------- | ----------- |\n`;
    answers.projectFeatures.split(',').forEach(feature => {
      markdown += `| **${feature.trim()}** | Description for ${feature.trim()} |\n`;
    });
    markdown += `\n---\n\n`;
  }
  addToTOC('Installation', '-installation');
  markdown += `## 📦 Installation\n\nFollow these steps to install the project.\n\n---\n\n`;
  addToTOC('Usage', '-usage');
  markdown += `## 🚀 Usage\n\nHere are some example usages.\n\n`;
  if (packageInfo?.scripts) {
    const scriptsMarkdown = (0, formatScripts_1.formatScripts)(
      packageInfo.scripts
    );
    markdown += `### 🛠️ Scripts\n\n${scriptsMarkdown}\n\n`;
    addToTOC('Scripts', '-scripts');
  }
  markdown += `---\n\n`;
  addToTOC('Directory Tree', '-directory-tree');
  markdown += `## 🌳 Directory Tree\n\n\`\`\`text\n${(0, tree_1.generateTree)(
    process.cwd()
  )}\`\`\`\n\n---\n\n`;
  addToTOC('Contributing', '-contributing');
  markdown += `## 🤝 Contributing\n\n1. Fork the Project\n2. Create your Feature Branch\n3. Commit your Changes\n4. Push to the Branch\n5. Open a Pull Request\n6. Code review\n7. Merge the changes\n8. Update the documentation\n\n---\n\n`;
  addToTOC('License', '-license');
  markdown += `## 📝 License\n\nThis project is licensed under [${answers.licenseType}](./LICENSE).\n\n`;
  const toc = `## 🗂️ Table of Contents\n\n${tocEntries.join('\n')}\n\n---\n\n`;
  markdown = markdown.replace('<!--TOC-->', toc);
  // Add styled footer
  markdown += `\n---\n\n<p align="center"><i><font color="grey">This README.md has been generated with ❤️ from <a href="https://github.com/BankkRoll/quick-readme">quick-readme</a></font></i></p>\n`;
  // Write the README.md file
  fs_1.default.writeFileSync('README.md', markdown);
}
exports.generateReadme = generateReadme;
//# sourceMappingURL=generateReadme.js.map
