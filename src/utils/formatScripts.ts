export const formatScripts = (scripts: { [key: string]: string }) => {
  let markdown = 'Here are some common scripts you can run:\n\n';
  for (const [key, value] of Object.entries(scripts)) {
    markdown += `#### ${key}\n\n`;
    switch (key) {
      case 'start':
        markdown += 'Starts the application.\n\n';
        break;
      case 'dev':
        markdown += 'Runs the application in development mode.\n\n';
        break;
      case 'test':
        markdown += 'Runs the test suite.\n\n';
        break;
      case 'build':
        markdown += 'Builds the application for production.\n\n';
        break;
      case 'lint':
        markdown += 'Lints the codebase.\n\n';
        break;
      case 'format':
        markdown += 'Formats the codebase.\n\n';
        break;
      case 'prettier':
        markdown += 'Runs Prettier for code formatting.\n\n';
        break;
      case 'clean':
        markdown += 'Removes the build folder and other temporary files.\n\n';
        break;
      case 'deploy':
        markdown += 'Deploys the application to the specified environment.\n\n';
        break;
      case 'docs':
        markdown += 'Generates documentation.\n\n';
        break;
      case 'eject':
        markdown += 'Ejects from a boilerplate setup.\n\n';
        break;
      case 'storybook':
        markdown += 'Runs Storybook for component development.\n\n';
        break;
      case 'coverage':
        markdown += 'Generates test coverage report.\n\n';
        break;
      case 'analyze':
        markdown += 'Analyzes the bundle size.\n\n';
        break;
      case 'audit':
        markdown += 'Runs security audit for dependencies.\n\n';
        break;
      case 'serve':
        markdown += 'Serves a production build locally.\n\n';
        break;
      case 'validate':
        markdown += 'Runs various checks (e.g., lint, test, types).\n\n';
        break;
      case 'ci':
        markdown +=
          'Runs scripts intended for Continous Integration environments.\n\n';
        break;
      case 'watch':
        markdown += 'Runs the development build in watch mode.\n\n';
        break;
      case 'init':
        markdown += 'Initializes a new project or module.\n\n';
        break;
      case 'update':
        markdown +=
          'Updates project dependencies to their latest versions.\n\n';
        break;
      case 'uninstall':
        markdown += 'Removes a package from the project.\n\n';
        break;
      case 'migrate':
        markdown += 'Migrates the project to a new version.\n\n';
        break;
      case 'seed':
        markdown += 'Seeds a database for development or testing.\n\n';
        break;
      case 'prune':
        markdown += 'Removes unused or extraneous packages.\n\n';
        break;
      case 'prepublish':
        markdown += 'Runs before the package is packed and published.\n\n';
        break;
      case 'postinstall':
        markdown += 'Runs after the package has been installed.\n\n';
        break;
      case 'pretest':
        markdown += 'Runs setup before the test suite.\n\n';
        break;
      case 'posttest':
        markdown += 'Runs teardown after the test suite.\n\n';
        break;
      case 'predeploy':
        markdown += 'Runs before code is deployed to production.\n\n';
        break;
      case 'postdeploy':
        markdown += 'Runs after code has been deployed to production.\n\n';
        break;
      default:
        markdown += 'Runs the custom script.\n\n';
    }
    markdown += `You can run this script using npm or yarn:\n\n`;
    markdown += `\`\`\`shell\nnpm run ${key}\n\`\`\`\n\n`;
    markdown += `Or with yarn:\n\n`;
    markdown += `\`\`\`shell\nyarn ${key}\n\`\`\`\n\n`;
  }
  return markdown;
};
