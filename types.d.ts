// types.d.ts
export interface IAnswers {
  title: string;
  authorName: string;
  authorGithub: string;
  authorTwitter: string;
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
  websiteUrl: string;
  selectedBadges: string[];
  selectedScripts?: string[];
}

export interface PackageInfo {
  name?: string;
  description?: string;
  main?: string;
  scripts?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
  dependencies?: { [key: string]: string };
  repository?: { url: string };
  license?: string;
  author?: string;
}

export interface GuessedLanguagesAndFrameworks {
  languages: string[];
  frameworks: string[];
}

export type TOCEntry = string;

export interface BadgeInfo {
  src: string;
  alt: string;
  logo?: string;
  logoColor?: string;
}

export interface LanguageColors {
  [language: string]: string;
}

export interface SelectedScripts {
  [key: string]: string;
}
