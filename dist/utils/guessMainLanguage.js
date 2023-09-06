'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.guessMainLanguage = void 0;
// src/utils/guessMainLanguage.ts
const guessMainLanguage = packageInfo => {
  let languages = [];
  let frameworks = [];
  if (packageInfo.main) {
    if (packageInfo.main.endsWith('.js')) languages.push('JavaScript');
    if (packageInfo.main.endsWith('.jsx')) {
      languages.push('JavaScript');
      frameworks.push('ReactJS');
    }
    if (packageInfo.main.endsWith('.ts')) languages.push('TypeScript');
    if (packageInfo.main.endsWith('.tsx')) {
      languages.push('TypeScript');
      frameworks.push('ReactJS');
    }
    if (packageInfo.main.endsWith('.coffee')) languages.push('CoffeeScript');
    if (packageInfo.main.endsWith('.elm')) languages.push('Elm');
    if (packageInfo.main.endsWith('.purs')) languages.push('PureScript');
    if (packageInfo.main.endsWith('.cljs')) languages.push('ClojureScript');
    if (packageInfo.main.endsWith('.dart')) languages.push('Dart');
  }
  const allDependencies = {
    ...packageInfo.devDependencies,
    ...packageInfo.dependencies,
  };
  if (allDependencies['typescript']) languages.push('TypeScript');
  if (allDependencies['react'] || allDependencies['react-dom']) {
    languages.push('JavaScript');
    frameworks.push('ReactJS');
  }
  if (allDependencies['vue']) {
    languages.push('JavaScript');
    frameworks.push('VueJS');
  }
  if (allDependencies['@angular/core']) {
    languages.push('TypeScript');
    frameworks.push('Angular');
  }
  if (allDependencies['@nestjs/core']) {
    languages.push('TypeScript');
    frameworks.push('NestJS');
  }
  if (allDependencies['express']) {
    languages.push('JavaScript');
    frameworks.push('ExpressJS');
  }
  if (allDependencies['next']) {
    languages.push('JavaScript');
    frameworks.push('Next.js');
  }
  if (allDependencies['svelte']) {
    languages.push('JavaScript');
    frameworks.push('Svelte');
  }
  if (allDependencies['ember-source']) {
    languages.push('JavaScript');
    frameworks.push('Ember.js');
  }
  if (allDependencies['backbone']) {
    languages.push('JavaScript');
    frameworks.push('Backbone.js');
  }
  if (allDependencies['jquery']) {
    languages.push('JavaScript');
    frameworks.push('jQuery');
  }
  if (allDependencies['lodash']) {
    languages.push('JavaScript');
    frameworks.push('Lodash');
  }
  if (allDependencies['mobx']) {
    languages.push('JavaScript');
    frameworks.push('MobX');
  }
  if (allDependencies['rxjs']) {
    languages.push('JavaScript');
    frameworks.push('RxJS');
  }
  if (allDependencies['graphql']) {
    languages.push('JavaScript');
    frameworks.push('GraphQL');
  }
  if (allDependencies['apollo-server']) {
    languages.push('JavaScript');
    frameworks.push('Apollo Server');
  }
  languages = Array.from(new Set(languages));
  frameworks = Array.from(new Set(frameworks));
  return { languages, frameworks };
};
exports.guessMainLanguage = guessMainLanguage;
//# sourceMappingURL=guessMainLanguage.js.map
