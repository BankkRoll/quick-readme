#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
// src/index.ts
const fs_1 = require('fs');
const enquirer_1 = require('enquirer');
const guessMainLanguage_1 = require('./utils/guessMainLanguage');
const generateReadme_1 = require('./utils/generateReadme');
const readConfigFile = async () => {
  try {
    const file = await fs_1.promises.readFile('quick-readme.json', 'utf-8');
    return JSON.parse(file);
  } catch (error) {
    return null;
  }
};
const readPackageJson = async () => {
  try {
    const file = await fs_1.promises.readFile('package.json', 'utf-8');
    const packageJson = JSON.parse(file);
    return packageJson;
  } catch (error) {
    console.error('Could not read package.json:', error);
    return null;
  }
};
const guessBuildTool = packageInfo => {
  const buildScript = packageInfo.scripts?.['build'];
  if (!buildScript) return '';
  const buildTools = [
    'webpack',
    'parcel',
    'gulp',
    'vite',
    'esbuild',
    'rollup',
    'rome',
    'snowpack',
    'travis',
    'jenkins',
    'github-actions',
    'gitlab',
    'circleci',
    'teamcity',
    'appveyor',
    'bamboo',
  ];
  for (const tool of buildTools) {
    if (buildScript.toLowerCase().includes(tool)) return tool;
  }
  return '';
};
const collectInfo = async packageInfo => {
  const { languages, frameworks } = (0, guessMainLanguage_1.guessMainLanguage)(
    packageInfo
  );
  const initialBadges = [];
  const instructions =
    '\x1b[36mUse the arrow keys to navigate: ↓ ↑ → ←. Press Spacebar to select an item. Press "a" to select/deselect all. Press Enter to confirm your choices.\x1b[0m';
  const questions = [
    {
      type: 'input',
      name: 'title',
      message: 'Provide the title of your project (optional):',
      default: packageInfo?.name || '',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of your project (optional):',
      default: packageInfo?.description || '',
    },
    {
      type: 'input',
      name: 'repo',
      message: 'Provide the GitHub repository URL for your project (optional):',
      default: packageInfo?.repository?.url?.replace(/\.git$/, '') || '',
    },
    {
      type: 'input',
      name: 'websiteUrl',
      message: 'Provide the website URL for your project (optional):',
      default: '',
    },
    {
      type: 'input',
      name: 'bannerUrl',
      message: 'Provide the URL for the title banner (optional):',
      default: '',
    },
    {
      type: 'input',
      name: 'authorName',
      message: "Provide author's name (optional):",
      default:
        packageInfo?.repository?.url?.split('/').slice(-2, -1)[0] ||
        packageInfo?.author ||
        '',
    },
    {
      type: 'input',
      name: 'authorGithub',
      message: "Provide author's GitHub handle (optional):",
      default:
        packageInfo?.repository?.url?.split('/').slice(-2, -1)[0] ||
        packageInfo?.author ||
        '',
    },
    {
      type: 'input',
      name: 'authorTwitter',
      message: "Provide author's Twitter handle (optional):",
      default: '',
    },
    {
      type: 'input',
      name: 'projectFeatures',
      message:
        'Provide a list of the project features separated by commas (optional):',
      default: '',
    },
    {
      type: 'input',
      name: 'npmPackage',
      message: 'Provide the NPM package name (optional):',
      default: '',
    },
    {
      type: 'input',
      name: 'buildTool',
      message:
        'Provide the build tool you are using (e.g., Travis, Jenkins, optional):',
      default: guessBuildTool(packageInfo) || '',
    },
    {
      type: 'input',
      name: 'licenseType',
      message:
        'Provide the type of license your project uses (e.g., MIT, Apache, optional):',
      default: packageInfo?.license || '',
    },
    {
      type: 'multiselect',
      name: 'languages',
      message: `${instructions}\nSelect the main programming languages used (optional):`,
      choices: [
        'JavaScript',
        'TypeScript',
        'CoffeeScript',
        'Elm',
        'PureScript',
        'ClojureScript',
        'Dart',
        'Other',
      ],
      initial: languages,
      multiple: true,
    },
    {
      type: 'multiselect',
      name: 'frameworks',
      message: `Select the main frameworks used (optional):`,
      choices: [
        'ReactJS',
        'Angular',
        'VueJS',
        'NestJS',
        'ExpressJS',
        'Next.js',
        'Svelte',
        'Ember.js',
        'Other',
      ],
      initial: frameworks,
      multiple: true,
    },
    {
      type: 'multiselect',
      name: 'selectedScripts',
      message: 'Select the scripts to display (leave blank for none):',
      choices: Object.keys(packageInfo.scripts || {}),
      multiple: true,
    },
  ];
  const answers = await (0, enquirer_1.prompt)(questions);
  if (answers.buildTool) {
    initialBadges.push('Build Tool');
  }
  if (answers.npmPackage) {
    initialBadges.push('npm version', 'npm Downloads');
  }
  if (answers.licenseType) {
    initialBadges.push('License');
  }
  if (answers.language?.languages?.length ?? 0 > 0) {
    initialBadges.push('Languages');
  }
  if (answers.language?.frameworks?.length ?? 0 > 0) {
    initialBadges.push('Frameworks');
  }
  if (answers.repo) {
    initialBadges.push(
      'GitHub Stars',
      'GitHub Last Commit',
      'GitHub Repo Size'
    );
  }
  if (answers.websiteUrl) {
    initialBadges.push('Website Status');
  }
  const badgeAnswers = await (0, enquirer_1.prompt)({
    type: 'multiselect',
    name: 'selectedBadges',
    message:
      'Select the badges for your README. Pre-selected badges are based on project info, Others may require manual editing.',
    choices: [
      'Build Tool',
      'npm version',
      'License',
      'Languages',
      'Frameworks',
      'GitHub Stars',
      'GitHub Last Commit',
      'GitHub Repo Size',
      'Website Status',
      'npm Downloads',
    ],
    initial: initialBadges,
    multiple: true,
  });
  return { ...answers, ...badgeAnswers };
};
const main = async () => {
  try {
    const configFile = await readConfigFile();
    let answers;
    let proceedMessage =
      '\x1b[33mThis will overwrite your existing README.md. Do you want to proceed? (yes/no):\x1b[0m';
    if (configFile) {
      console.log('\x1b[32mFound quick-readme.json file.\x1b[0m');
      proceedMessage =
        '\x1b[33mMake sure your config is correct. This will overwrite your existing README.md. Do you want to proceed? (yes/no):\x1b[0m';
    }
    const shouldProceed = await (0, enquirer_1.prompt)({
      type: 'input',
      name: 'proceed',
      message: proceedMessage,
    });
    if (shouldProceed.proceed.toLowerCase() !== 'yes') {
      console.log('\x1b[31mOperation aborted.\x1b[0m');
      return;
    }
    if (configFile) {
      console.log('\x1b[32mSkipping questions and generating README...\x1b[0m');
      answers = configFile;
    } else {
      console.log('\x1b[32mProceeding with README generation...\x1b[0m');
      const packageInfo = await readPackageJson();
      if (!packageInfo) {
        throw new Error('Failed to read package.json or it does not exist.');
      }
      answers = await collectInfo(packageInfo);
      if (!answers) {
        throw new Error('Failed to collect information for README generation.');
      }
    }
    const packageInfo = await readPackageJson();
    if (!packageInfo) {
      throw new Error('Failed to read package.json or it does not exist.');
    }
    await (0, generateReadme_1.generateReadme)(answers, packageInfo);
    console.log('\x1b[32m✔ README.md generation successful.\x1b[0m');
    console.log(
      '\x1b[33m⚠ Please review and preview the generated README to ensure everything looks correct.\x1b[0m'
    );
    console.log('──────────────────────────────────────────────────');
    console.log('Thank you for using quick-readme!');
    console.log(' ');
    console.log(
      'If you found this tool helpful, please consider giving it a star ⭐'
    );
    console.log('\x1b[34m👉 https://github.com/BankkRoll/quick-readme\x1b[0m');
    console.log(' ');
    console.log('Have a feature request or found a bug? 🐛');
    console.log('Please leave an issue on the GitHub repository.');
    console.log('We appreciate your contribution! 💖');
    console.log('──────────────────────────────────────────────────');
  } catch (error) {
    console.error('\x1b[31mAn error occurred:\x1b[0m', error);
  }
};
main();
//# sourceMappingURL=index.js.map
