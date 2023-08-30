import { promises as fs } from 'fs';
import readline from 'readline';
import { guessMainLanguage } from './utils/guessMainLanguage';
import { generateReadme } from './utils/generateReadme';

interface IAnswers {
  title: string;
  description: string;
  bannerUrl: string;
  repo: string;
  projectFeatures: string;
  npmPackage: string;
  buildTool: string;
  licenseType: string;
  language: {
    languages: string[];
    frameworks: string[];
  };
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = async (question: string): Promise<string> => {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
};

const readPackageJson = async () => {
  try {
    const file = await fs.readFile('package.json', 'utf-8');
    const packageJson = JSON.parse(file);
    return packageJson;
  } catch (error) {
    console.error('Could not read package.json:', error);
    return null;
  }
};

const guessBuildTool = (packageInfo: any): string => {
  if (packageInfo.scripts['build']?.includes('travis')) return 'Travis';
  if (packageInfo.scripts['build']?.includes('jenkins')) return 'Jenkins';
  return '';
};

const collectInfo = async (packageInfo: any): Promise<IAnswers> => {
  const answers: IAnswers = {
    title: packageInfo?.name || '',
    description: packageInfo?.description || '',
    bannerUrl: '',
    repo: '',
    projectFeatures: '',
    npmPackage: '',
    buildTool: guessBuildTool(packageInfo) || '',
    licenseType: packageInfo?.license || '',
    language: guessMainLanguage(packageInfo) || {
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
    await generateReadme(answers, packageInfo);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    rl.close();
  }
};

main();
