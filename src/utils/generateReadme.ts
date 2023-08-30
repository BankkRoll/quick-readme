import fs from 'fs';
import { guessMainLanguage } from './guessMainLanguage';
import { formatScripts } from './formatScripts';
import { generateTree } from './tree';

export async function generateReadme(answers: any, packageInfo: any) {
  let markdown = '';
  let tocEntries: string[] = [];
  const { languages, frameworks } = guessMainLanguage(packageInfo);

  const addToTOC = (title: string, symbol: string) => {
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

    const addBadge = (badge: string) => {
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
      answers.language.forEach((lang: string) => {
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

    languages.forEach((lang: string) => {
      markdown += `<img src="https://img.shields.io/badge/language-${lang}-blueviolet.svg?style=flat-square" alt="${lang}"> `;
    });

    frameworks.forEach((fw: string) => {
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
    answers.projectFeatures.split(',').forEach((feature: string) => {
      markdown += `| **${feature.trim()}** | Description for ${feature.trim()} |\n`;
    });
    markdown += `\n---\n\n`;
  }

  addToTOC('Installation', '-installation');
  markdown += `## 📦 Installation\n\nFollow these steps to install the project.\n\n---\n\n`;

  addToTOC('Usage', '-usage');
  markdown += `## 🚀 Usage\n\nHere are some example usages.\n\n`;

  if (packageInfo?.scripts) {
    const scriptsMarkdown = formatScripts(packageInfo.scripts);
    markdown += `### 🛠️ Scripts\n\n${scriptsMarkdown}\n\n`;
    addToTOC('Scripts', '-scripts');
  }

  markdown += `---\n\n`;

  addToTOC('Directory Tree', '-directory-tree');
  markdown += `## 🌳 Directory Tree\n\n\`\`\`text\n${generateTree(
    process.cwd()
  )}\`\`\`\n\n---\n\n`;

  addToTOC('Contributing', '-contributing');
  markdown += `## 🤝 Contributing\n\n1. Fork the Project\n2. Create your Feature Branch\n3. Commit your Changes\n4. Push to the Branch\n5. Open a Pull Request\n6. Code review\n7. Merge the changes\n8. Update the documentation\n\n---\n\n`;

  addToTOC('License', '-license');
  markdown += `## 📝 License\n\nThis project is licensed under [${answers.licenseType}](./LICENSE).\n\n`;

  const toc = `## 🗂️ Table of Contents\n\n${tocEntries.join('\n')}\n\n---\n\n`;

  markdown = markdown.replace('<!--TOC-->', toc);

  fs.writeFileSync('README.md', markdown);
}
