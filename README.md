
Project
=======

Core files:

- [App](src/blocks/App/App.js)
- [App-Header](src/blocks/App/Header/App-Header.js)
- [View](src/blocks/View/View.js)

Run command:

- `npm run -s start`
- `node-debug node_modules/react-app-rewired/scripts/start.js`
- `node-debug node_modules/react-app-rewired/scripts/build.js`
- `node node_modules/react-app-rewired/bin/index start`
- `node-debug node_modules/react-app-rewired/bin/index start` (???)

Config templates:

- `node_modules/react-scripts/config/`

Samples:

- `/Work/bem-tests/bem-react-core/tests`
- `/Work/bem-react/redux-todomvc/src/components`

Resources
=========

bem-react-components:

- `node_modules/bem-react-components/blocks`

markdown:

- [Choosing the Right Markdown Parser | CSS-Tricks](https://css-tricks.com/choosing-right-markdown-parser/)
- [jonschlinkert/remarkable: Markdown parser, done right. Commonmark support, extensions, syntax plugins, high speed - all in one. Gulp and metalsmith plugins are also available.](https://github.com/jonschlinkert/remarkable)
- [remarkable/parser.md at master · jonschlinkert/remarkable](https://github.com/jonschlinkert/remarkable/blob/master/docs/parser.md)
- [remarkable/plugins.md at master · jonschlinkert/remarkable](https://github.com/jonschlinkert/remarkable/blob/master/docs/plugins.md)
- [lwhiteley/remarkable-codegroup: remarkable plugin to put code blocks into groups](https://github.com/lwhiteley/remarkable-codegroup)
- [markdown-it/markdown-it: Markdown parser, done right. 100% CommonMark support, extensions, syntax plugins & high speed](https://github.com/markdown-it/markdown-it)
- [rlidwka/markdown-it-regexp: make simple markdown-it plugins easier](https://github.com/rlidwka/markdown-it-regexp)

- [markedjs/marked: A markdown parser and compiler. Built for speed.](https://github.com/markedjs/marked)
- [marked/Using_Advanced](https://github.com/markedjs/marked/blob/master/USING_ADVANCED.md)
- [marked/Using_Pro](https://github.com/markedjs/marked/blob/master/USING_PRO.md)
- `!TestPackages/node_modules/markdown-parse/index.js`

- [isagalaev/highlight.js: Javascript syntax highlighter](https://github.com/isagalaev/highlight.js/)
- [markdown-it-highlight](https://www.npmjs.com/package/markdown-it-highlight)
- [Building and testing — highlight.js 9.12.0 documentation](http://highlightjs.readthedocs.io/en/latest/building-testing.html)
- [Using highlight.js with React.js · Issue #925 · isagalaev/highlight.js](https://github.com/isagalaev/highlight.js/issues/925)

ES6:

- [Exploring ES6](http://exploringjs.com/es6/)
- [16. Modules](http://exploringjs.com/es6/ch_modules.html)
- [ES6 классы](http://jsraccoon.ru/es6-classes)
- [Classes - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [extends - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)

bem-tools:

- [bem-tools/bem-tools-create: bem create command](https://github.com/bem-tools/bem-tools-create)
- `npm i -g bem-tools-core bem-tools-create`
- [bem-tools / Toolbox / BEM](https://en.bem.info/toolbox/bem-tools/)
- TODO: Trace `templateFolder` in `node-debug C:\Users\Miheev\AppData\Roaming\npm\node_modules\bem-tools-core\index.js create xx__el`
- TODO: Try to use editorconfig tab values?

Events:

- [SyntheticEvent - React](https://reactjs.org/docs/events.html)
- [mobxjs/mobx: Simple, scalable state management.](https://github.com/mobxjs/mobx)
- [reactjs/redux: Predictable state container for JavaScript apps](https://github.com/reactjs/redux)

Redux:

- [Core Concepts - Redux](https://redux.js.org/introduction/core-concepts)
- [gaearon/redux-devtools: DevTools for Redux with hot reloading, action replay, and customizable UI](https://github.com/gaearon/redux-devtools)
- [Новый уровень React: Redux](https://getinstance.info/articles/react/learning-react-redux/)
- [С 0 до 1. Разбираемся с Redux / Хабрахабр](https://habrahabr.ru/post/269831/)
- [Что такое Redux простыми словами? — Toster.ru](https://toster.ru/q/424353)
- [evgenyrodionov/redux-logger: Logger for Redux](https://github.com/evgenyrodionov/redux-logger)

Site:

- [github.io](https://lilliputten.github.io)

Debug:

- [Inspector Help](https://nodejs.org/en/docs/inspector/)
- [Inspect with Developer Tools](chrome://inspect)
- [atom node-debugger](https://atom.io/packages/node-debugger)

Debug issues:

- [Can I debug source code instead of compiled one? · Issue #343 · facebook/create-react-app](https://github.com/facebook/create-react-app/issues/343)

start TODO:
- coloring: `chalk`
- base config: `node_modules/react-scripts/config/webpackDevServer.config.js`

Loading data:
- [Loading and Using External Data in React - Media Temple Blog](http://mediatemple.net/blog/tips/loading-and-using-external-data-in-react/)
- [AJAX Requests in React: How and Where to Fetch Data](https://daveceddia.com/ajax-requests-in-react/)

Used modules:

- `node_modules/bem-react-core/dist/react.min.js`

bem-react-core:

- [bem-react-core/docs/ru at master · bem/bem-react-core](https://github.com/bem/bem-react-core/tree/master/docs/ru)
- [bem-react-core/REFERENCE.md at master · bem/bem-react-core](https://github.com/bem/bem-react-core/blob/master/docs/ru/REFERENCE.md)

Misc:

- [atom-shortcuts](https://atom.io/packages/atom-shortcuts)
- [MSBUILD : error MSB3428: Could not load the Visual C++ component "VCBuild.exe". · Issue #1045 · nodejs/node-gyp](https://github.com/nodejs/node-gyp/issues/1045)
- [babel/babel-loader: 📦 Webpack plugin for Babel](https://github.com/babel/babel-loader)
- ??? [WebPack 2 no source maps · Issue #309 · webpack-contrib/sass-loader](https://github.com/webpack-contrib/sass-loader/issues/309)
- [Plugins · Babel](http://babeljs.io/docs/plugins/#options)
- [API · Babel](https://babeljs.io/docs/usage/api/)

react-app-rewired rewire helpers:

- [create-react-app/README.md at master · facebook/create-react-app](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#advanced-configuration)
- [Configure create-react-app without ejecting ⏏ – Kitze – Medium](https://medium.com/@kitze/configure-create-react-app-without-ejecting-d8450e96196a)
- [[javascript] config-overrides.js - CodeGist](http://codegists.com/snippet/javascript/config-overridesjs_mekto_javascript)
- [react-app-rewired/packages at master · timarney/react-app-rewired](https://github.com/timarney/react-app-rewired/tree/master/packages)
- [timarney/react-app-rewired: Override create-react-app webpack configs without ejecting](https://github.com/timarney/react-app-rewired)

postcss:

- [michael-ciniawsky/postcss-load-config: Autoload Config for PostCSS](https://github.com/michael-ciniawsky/postcss-load-config)
- [postcss/postcss-loader: PostCSS loader for webpack](https://github.com/postcss/postcss-loader#exec)
- [postcss/plugins.md at master · postcss/postcss](https://github.com/postcss/postcss/blob/master/docs/plugins.md)

SugarSS:

- [postcss/postcss-loader: PostCSS loader for webpack](https://github.com/postcss/postcss-loader)
- [postcss/sugarss: Indent-based CSS syntax for PostCSS](https://github.com/postcss/sugarss)
- [SugarSS syntax · Issue #495 · postcss/postcss](https://github.com/postcss/postcss/issues/495)

Webpack:

- [Webpack Visualizer](http://chrisbateman.github.io/webpack-visualizer/)
- [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)
- [Three simple ways to inspect a Webpack bundle – Jannik Hell – Medium](https://medium.com/@joeclever/three-simple-ways-to-inspect-a-webpack-bundle-7f6a8fe7195d)
- `webpack-bundle-analyzer build/stats.json`
- `webpack-bundle-analyzer -m static -r build/stats.html build/stats.json`

React & dom:

- [Full DOM Rendering · Enzyme](http://airbnb.io/enzyme/docs/api/mount.html)
- [javascript - ReactJS, find elements by classname in a React Component - Stack Overflow](https://stackoverflow.com/questions/42666140/reactjs-find-elements-by-classname-in-a-react-component)

Testing:

- [Testing React Apps · Jest](https://facebook.github.io/jest/docs/en/tutorial-react.html)
- [Jest CLI Options · Jest](https://facebook.github.io/jest/docs/en/cli.html)
- [Configuring Jest · Jest](https://facebook.github.io/jest/docs/en/configuration.html#modulenamemapper-object-string-string)
- [Using Matchers · Jest](https://facebook.github.io/jest/docs/en/using-matchers.html)
- `node node_modules\jest-cli\bin\jest.js --clearCache`
- `node node_modules\jest\bin\jest.js`
- `node node_modules\jest-cli\bin\jest.js --clearCache && node node_modules\jest-cli\bin\jest.js`

