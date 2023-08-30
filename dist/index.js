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
  terminal: true,
});
const prompt = async (question, color = '\x1b[34m') => {
  // Default color is blue
  return new Promise(resolve => {
    rl.question(color + question + '\x1b[0m', answer => {
      resolve(answer);
    });
  });
};
const promptWithDefault = async (
  question,
  defaultValue,
  color = '\x1b[34m'
) => {
  return new Promise(resolve => {
    process.stdout.write(color + question + '\x1b[0m');
    process.stdout.write(defaultValue);
    rl.once('line', userInput => {
      resolve(userInput === '' ? defaultValue : userInput);
    });
  });
};
const readPackageJson = async () => {
  try {
    const file = await fs_1.promises.readFile('package.json', 'utf-8');
    const packageJson = JSON.parse(file);
    return packageJson;
  } catch (error) {
    console.error('\x1b[31m', 'Could not read package.json:', error, '\x1b[0m'); // Red for error
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
    authorName: packageInfo?.authorName || packageInfo?.author || '',
    authorGithub: packageInfo?.authorGithub || '',
    authorTwitter: packageInfo?.authorTwitter || '',
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
  answers.title = await promptWithDefault(
    'What is the title of your project? (optional) ',
    answers.title
  );
  answers.description = await promptWithDefault(
    'Provide a description of your project: (optional) ',
    answers.description
  );
  answers.authorName = await promptWithDefault(
    "What is the author's name? (optional): ",
    answers.authorName
  );
  answers.authorGithub = await promptWithDefault(
    "What is the author's GitHub handle? (optional): ",
    answers.authorGithub
  );
  answers.authorTwitter = await promptWithDefault(
    "What is the author's Twitter handle? (optional): ",
    answers.authorTwitter
  );
  answers.bannerUrl = await promptWithDefault(
    'Provide the URL for the title banner (optional): ',
    answers.bannerUrl
  );
  answers.repo = await promptWithDefault(
    'Provide your GitHub repository URL (optional): ',
    answers.repo
  );
  answers.projectFeatures = await promptWithDefault(
    'List your project features separated by commas (optional): ',
    answers.projectFeatures
  );
  answers.npmPackage = await promptWithDefault(
    'Provide your NPM package name if any (optional): ',
    answers.npmPackage
  );
  answers.buildTool = await promptWithDefault(
    'Provide the build tool you are using if any (Travis, Jenkins, etc.) (optional): ',
    answers.buildTool
  );
  answers.licenseType = await promptWithDefault(
    'Provide the type of license your project uses (MIT, Apache, etc.) (optional): ',
    answers.licenseType
  );
  // For languages and frameworks, since these are arrays, handling default values may need special treatment.
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
    const shouldProceed = await prompt(
      'This will overwrite your existing README.md. Do you want to proceed? (yes/no): ',
      '\x1b[33m'
    ); // Yellow for warning
    if (shouldProceed.toLowerCase() !== 'yes') {
      console.log('\x1b[33m', 'Operation aborted.', '\x1b[0m'); // Yellow for warning
      rl.close();
      return;
    }
    console.log('\x1b[32m', 'Proceeding with README generation...', '\x1b[0m'); // Green for success
    const packageInfo = await readPackageJson();
    const answers = await collectInfo(packageInfo);
    await (0, generateReadme_1.generateReadme)(answers, packageInfo);
  } catch (error) {
    console.error('\x1b[31m', 'An error occurred:', error, '\x1b[0m'); // Red for error
  } finally {
    rl.close();
  }
};
main();
//# sourceMappingURL=index.js.map
