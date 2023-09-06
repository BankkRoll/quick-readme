<div align="center">
<h1 align="center">
<img src="https://github.com/BankkRoll/quick-readme/assets/106103625/332aaeb9-0df8-439c-bd72-a1777b0e2019" />
<br>quick-readme
</h1>
<h3>◦ A CLI tool to generate README files super fast and easily!</h3>
</div>

---

<div align="center">
<img src="https://img.shields.io/npm/v/quick-readme.svg?style" alt="npm version" /> <img src="https://img.shields.io/badge/license-MIT-blue.svg?style" alt="License" /> <img src="https://img.shields.io/badge/JavaScript-JavaScript-F7DF1E?style&logo=JavaScript&logoColor=F7DF1E" alt="JavaScript" /> <img src="https://img.shields.io/badge/TypeScript-TypeScript-3178C6?style&logo=TypeScript&logoColor=3178C6" alt="TypeScript" /> <img src="https://img.shields.io/github/stars/BankkRoll/quick-readme.svg?style=social" alt="GitHub Stars" /> <img src="https://img.shields.io/github/last-commit/BankkRoll/quick-readme.svg?style" alt="GitHub Last Commit" /> <img src="https://img.shields.io/github/repo-size/BankkRoll/quick-readme.svg?style" alt="GitHub Repo Size" /> <img src="https://img.shields.io/website-up-down-green-red/http/monip.org.svg" alt="Website Status" /> <img src="https://img.shields.io/npm/dt/quick-readme.svg" alt="npm Downloads" /> </div>

</div>

---

## 🗂️ Table of Contents

- [Features](#️-features)
- [Installation](#-installation)
- [Usage](#-usage)
  - [Question Usage](#question-usage)
  - [Config Usage](#config-usage)
- [Scripts](#-scripts)
- [Directory Tree](#-directory-tree)
- [Language Usage](#-language-usage)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ⚙️ Features

| Feature                    | Description                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Easy Readme Generation** | Generate professional README files with a simple command. No need to worry about formatting or layout.   |
| **Fast & Simple**          | Designed for ease of use. The intuitive interface guides you through the process in a matter of seconds. |
| **Fully Advanced Results** | Offers advanced options for customizing your README, including adding badges, custom scripts, and more.  |

---

## 📦 Installation

### Global Installation

To install the `quick-readme` package globally, open your terminal and run the following command:

```bash
npm install -g quick-readme
```

This will install the package globally, allowing you to use the `quick-readme` command anywhere in your terminal.

### Local Installation

To install the `quick-readme` package locally in your project, navigate to your project's directory and run:

```bash
npm install quick-readme --save-dev
```

This will install the package as a dev dependency in your project.

## 🚀 Usage

### Question Usage

Run the `quick-readme` command and answer the questions prompted to generate your README:

```bash
quick-readme
```

### Config Usage

You can also generate a README using a configuration file. Create a file named `quick-readme.json` in your project root and populate it with your project details. You can check out an example configuration file [/example.quick-readme.json](/example.quick-readme.json) or click the summary below to see the contents with details.

<details>
<summary>(Click to open!) Example quick-readme.json File</summary>

```json
{
  // The title of your project
  "title": "quick-readme",

  // A brief description of your project
  "description": "A CLI tool to generate README files super fast and easily!",

  // The GitHub repository URL of your project
  "repo": "https://github.com/BankkRoll/quick-readme",

  // The website URL of your project (if available)
  "websiteUrl": "",

  // The URL for the banner image to display at the top of your README
  "bannerUrl": "https://github.com/BankkRoll/quick-readme/assets/106103625/332aaeb9-0df8-439c-bd72-a1777b0e2019",

  // Your name or your organization's name
  "authorName": "BankkRoll",

  // Your GitHub handle
  "authorGithub": "BankkRoll",

  // Your Twitter handle
  "authorTwitter": "bankkroll_eth",

  // Features of your project, separated by commas
  "projectFeatures": "Easy Readme Generation, Fast & Simple, Fully Advanced Results",

  // The npm package name (if your project is an npm package)
  "npmPackage": "quick-readme",

  // The build tool your project uses
  "buildTool": "",

  // The license your project is under
  "licenseType": "MIT",

  // Programming languages used in the project
  "languages": ["JavaScript", "TypeScript"],

  // Frameworks used in the project
  "frameworks": [],

  // Scripts you want to highlight in your README
  "selectedScripts": [
    "start",
    "build",
    "format",
    "add-shebang",
    "prepublishOnly"
  ],

  // Badges to display at the top of your README
  "selectedBadges": [
    "npm version",
    "License",
    "Languages",
    "GitHub Stars",
    "GitHub Last Commit",
    "GitHub Repo Size"
  ],

  // Internal name of your project (usually the repo name)
  "name": "quick-readme",

  // Any custom scripts your project uses
  "scripts": {
    "start": "npm run start",
    "build": "npm run build",
    "format": "npm run format",
    "add-shebang": "npm run add-shebang",
    "prepublishOnly": "npm run prepublishOnly"
  },

  // Information about your project's repository
  "repository": {
    "url": "https://github.com/BankkRoll/quick-readme.git"
  },

  // License information
  "license": "MIT",

  // Author information
  "author": "BankkRoll"
}
```

</details>

## 🛠️ Scripts

Here are some common scripts you can run:

#### start

Starts the application.

You can run this script using npm or yarn:

```shell
npm run start
```

Or with yarn:

```shell
yarn start
```

#### build

Builds the application for production.

You can run this script using npm or yarn:

```shell
npm run build
```

Or with yarn:

```shell
yarn build
```

---

## 🌳 Directory Tree

```graphql
├── 📄 .npmignore
├── 📄 .prettierrc
├── 📄 add-shebang.js
├── 📦 dist/
    ├── 📄 index.d.ts
    ├── 📄 index.js
    ├── 📄 index.js.map
    └── 📂 utils/
        ├── 📄 analyzeCodebase.d.ts
        ├── 📄 analyzeCodebase.js
        ├── 📄 analyzeCodebase.js.map
        ├── 📄 formatScripts.d.ts
        ├── 📄 formatScripts.js
        ├── 📄 formatScripts.js.map
        ├── 📄 generateReadme.d.ts
        ├── 📄 generateReadme.js
        ├── 📄 generateReadme.js.map
        ├── 📄 guessMainLanguage.d.ts
        ├── 📄 guessMainLanguage.js
        ├── 📄 guessMainLanguage.js.map
        ├── 📄 languages.d.ts
        ├── 📄 languages.js
        ├── 📄 languages.js.map
        ├── 📄 tree.d.ts
        ├── 📄 tree.js
        └── 📄 tree.js.map
├── 📄 example.quick-readme.json
├── 📄 LICENSE.txt
├── 📄 package-lock.json
├── 📄 package.json
├── 📦 src/
    ├── 📄 index.ts
    └── 📂 utils/
        ├── 📄 analyzeCodebase.ts
        ├── 📄 formatScripts.ts
        ├── 📄 generateReadme.ts
        ├── 📄 guessMainLanguage.ts
        ├── 📄 languages.ts
        └── 📄 tree.ts
├── 📄 README.md
├── 📄 tsconfig.json
└── 📄 types.d.ts
```

---

## 💻 Language Usage

```
TypeScript: ██████ 58.41%
JSON: ██ 22.52%
Markdown: ██ 17.65%
Other:  1.43%
```

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request
6. Code review
7. Merge the changes
8. Update the documentation

---

## 📝 License

This project is licensed under [MIT](./LICENSE).

## 👤 Author

**[BankkRoll](https://github.com/BankkRoll)**

- Twitter: [@bankkroll_eth](https://twitter.com/bankkroll_eth)
- GitHub: [@BankkRoll](https://github.com/BankkRoll)

---

<p align="center"><i><font color="grey">This README.md has been generated with ❤️ using <a href="https://github.com/BankkRoll/quick-readme">quick-readme</a></font></i></p>
