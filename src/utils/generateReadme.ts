// src/utils/generateReadme.ts
import fs from 'fs';
import { guessMainLanguage } from './guessMainLanguage';
import { formatScripts } from './formatScripts';
import { generateTree } from './tree';
import { analyzeCodebase } from './analyzeCodebase';
import { generateLanguageUsage } from './languages';

export async function generateReadme(answers: any, packageInfo: any) {
  let markdown = '';
  let tocEntries: string[] = [];

  const { languages, frameworks } = guessMainLanguage(packageInfo);

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
  };

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

  if (answers.selectedBadges && answers.selectedBadges.length > 0) {
    markdown += `<div align="center">\n`;

    const repoName = answers.repo ? answers.repo.split('github.com/')[1] : '';

    const addBadge = (
      src: string,
      alt: string,
      logo?: string,
      logoColor?: string
    ) => {
      const logoPart = logo ? `&logo=${logo}` : '';
      const logoColorPart = logoColor ? `&logoColor=${logoColor}` : '';
      markdown += `<img src="${src}${logoPart}${logoColorPart}" alt="${alt}" /> `;
    };

    answers.selectedBadges.forEach((badge: string) => {
      switch (badge) {
        case 'Build Tool':
          addBadge(
            `https://img.shields.io/${answers.buildTool.toLowerCase()}/${repoName}.svg?style`,
            answers.buildTool
          );
          break;
        case 'npm version':
          addBadge(
            `https://img.shields.io/npm/v/${answers.npmPackage}.svg?style`,
            'npm version'
          );
          break;
        case 'License':
          addBadge(
            `https://img.shields.io/badge/license-${answers.licenseType}-blue.svg?style`,
            'License'
          );
          break;
        case 'Languages':
          languages.forEach(lang => {
            const color =
              (languageColors as Record<string, string>)[lang] ||
              'defaultColor';
            addBadge(
              `https://img.shields.io/badge/${lang}-${lang}-${color}?style&logo=${lang}&logoColor=${color}`,
              lang
            );
          });
          break;
        case 'Frameworks':
          frameworks.forEach(fw => {
            addBadge(
              `https://img.shields.io/badge/framework-${fw}-green.svg?style`,
              fw,
              fw
            );
          });
          break;
        case 'GitHub Stars':
          addBadge(
            `https://img.shields.io/github/stars/${repoName}.svg?style=social`,
            'GitHub Stars'
          );
          break;
        case 'GitHub Last Commit':
          addBadge(
            `https://img.shields.io/github/last-commit/${repoName}.svg?style`,
            'GitHub Last Commit'
          );
          break;
        case 'GitHub Repo Size':
          addBadge(
            `https://img.shields.io/github/repo-size/${repoName}.svg?style`,
            'GitHub Repo Size'
          );
          break;
        case 'Website Status':
          addBadge(
            `https://img.shields.io/website-up-down-green-red/http/monip.org.svg`,
            'Website Status'
          );
          break;
        case 'npm Downloads':
          addBadge(
            `https://img.shields.io/npm/dt/${answers.npmPackage}.svg`,
            'npm Downloads'
          );
          break;
        default:
          break;
      }
    });

    markdown += '</div>\n\n';
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

  if (
    answers.selectedScripts &&
    answers.selectedScripts.length > 0 &&
    packageInfo?.scripts
  ) {
    const selectedScripts = answers.selectedScripts.reduce(
      (acc: { [key: string]: string }, key: string) => {
        if (packageInfo.scripts![key]) {
          acc[key] = packageInfo.scripts![key];
        }
        return acc;
      },
      {}
    );
    const scriptsMarkdown = formatScripts(selectedScripts);
    markdown += `## 🛠️ Scripts\n\n${scriptsMarkdown}\n\n`;
    addToTOC('Scripts', '-scripts');
  }

  markdown += `---\n\n`;

  addToTOC('Directory Tree', '-directory-tree');
  markdown += `## 🌳 Directory Tree\n\n\`\`\`graphql\n${generateTree(
    process.cwd()
  )}\`\`\`\n\n---\n\n`;

  const languageStats = analyzeCodebase(process.cwd());

  const languageUsage = generateLanguageUsage(languageStats);

  addToTOC('Language Usage', '-language-usage');
  markdown += `## 💻 Language Usage\n\n\`\`\`\n${languageUsage}\n\`\`\`\n\n---\n\n`;

  addToTOC('Contributing', '-contributing');
  markdown += `## 🤝 Contributing\n\n1. Fork the Project\n2. Create your Feature Branch\n3. Commit your Changes\n4. Push to the Branch\n5. Open a Pull Request\n6. Code review\n7. Merge the changes\n8. Update the documentation\n\n---\n\n`;

  addToTOC('License', '-license');
  markdown += `## 📝 License\n\nThis project is licensed under [${answers.licenseType}](./LICENSE).\n\n`;

  addToTOC('Author', '-author');
  markdown += `## 👤 Author\n\n**[${answers.authorName}](https://github.com/${answers.authorGithub})**\n\n- Twitter: [@${answers.authorTwitter}](https://twitter.com/${answers.authorTwitter})\n- GitHub: [@${answers.authorGithub}](https://github.com/${answers.authorGithub})\n\n`;

  const toc = `## 🗂️ Table of Contents\n\n${tocEntries.join('\n')}\n\n---\n\n`;

  markdown = markdown.replace('<!--TOC-->', toc);

  markdown += `\n---\n\n<p align="center"><i><font color="grey">This README.md has been generated with ❤️ using <a href="https://github.com/BankkRoll/quick-readme">quick-readme</a></font></i></p>\n`;

  fs.writeFileSync('README.md', markdown);
}
