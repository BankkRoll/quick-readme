'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const fs_1 = require('fs');
const readline_1 = __importDefault(require('readline'));
const guessMainLanguage_1 = require('./utils/guessMainLanguage');
const generateReadme_1 = require('./utils/generateReadme');
const rl = readline_1.default.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const prompt = async question => {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
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
  if (packageInfo.scripts['build']?.includes('travis')) return 'Travis';
  if (packageInfo.scripts['build']?.includes('jenkins')) return 'Jenkins';
  return '';
};
const collectInfo = async packageInfo => {
  const answers = {
    title: packageInfo?.name || '',
    description: packageInfo?.description || '',
    bannerUrl: '',
    repo: '',
    projectFeatures: '',
    npmPackage: '',
    buildTool: guessBuildTool(packageInfo) || '',
    licenseType: packageInfo?.license || '',
    language: (0, guessMainLanguage_1.guessMainLanguage)(packageInfo) || {
      languages: [],
      frameworks: [],
    },
  };
  answers.title =
    (await prompt('What is the title of your project? (optional) ')) ||
    answers.title;
  answers.description =
    (await prompt('Provide a description of your project: (optional) ')) ||
    answers.description;
  answers.bannerUrl =
    (await prompt('Provide the URL for the title banner (optional): ')) ||
    answers.bannerUrl;
  answers.repo =
    (await prompt('Provide your GitHub repository URL (optional): ')) ||
    answers.repo;
  answers.projectFeatures =
    (await prompt(
      'List your project features separated by commas (optional): '
    )) || answers.projectFeatures;
  answers.npmPackage =
    (await prompt('Provide your NPM package name if any (optional): ')) ||
    answers.npmPackage;
  answers.buildTool =
    (await prompt(
      'Provide the build tool you are using if any (Travis, Jenkins, etc.) (optional): '
    )) || answers.buildTool;
  answers.licenseType =
    (await prompt(
      'Provide the type of license your project uses (MIT, Apache, etc.) (optional): '
    )) || answers.licenseType;
  answers.language.languages =
    (
      await prompt(
        'What are the main programming languages used? (JavaScript, Python, etc.) (optional): '
      )
    ).split(',') || answers.language.languages;
  answers.language.frameworks =
    (
      await prompt(
        'What are the main frameworks used? (React, Angular, etc.) (optional): '
      )
    ).split(',') || answers.language.frameworks;
  return answers;
};
const main = async () => {
  try {
    const packageInfo = await readPackageJson();
    const answers = await collectInfo(packageInfo);
    await (0, generateReadme_1.generateReadme)(answers, packageInfo);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    rl.close();
  }
};
main();
//# sourceMappingURL=index.js.map
