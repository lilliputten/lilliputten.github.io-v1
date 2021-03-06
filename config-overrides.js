/**
 * @see [timarney/react-app-rewired: Override create-react-app webpack configs without ejecting](https://github.com/timarney/react-app-rewired)
 * @see README
 */

// const postcss = require('./src/config/postcss');

/** Defines... ** {{{
 */
const

  // Dependencies...
  // fs = require('fs-extra'),
  path = require('path'),// .posix,

  srcRoot = process.cwd(), // .replace(/\\/g, '/'),
  prjRoot = srcRoot.replace(/\\/g, '/'),

  configCss = require('./src/config/css'),

  // // Bem-project config
  // bemrc = require('../.bemrc.js'),

  // // Source levels
  // srcLevels = Object.keys(bemrc.levels),
  //
  // /** systemLevels ** {{{ System-level levels
  //  */
  // systemLevels = [
  //   { path: 'node_modules/bem-core/common.blocks', check: false },
  //   { path: 'node_modules/bem-core/desktop.blocks', check: false },
  //   { path: 'node_modules/bem-components/common.blocks', check: false },
  //   { path: 'node_modules/bem-components/desktop.blocks', check: false },
  //   { path: 'node_modules/bem-components/design/common.blocks', check: false },
  //   { path: 'node_modules/bem-components/design/desktop.blocks', check: false },
  // ],/*}}}*/
  //
  // // All project levels
  // levels = systemLevels.concat(srcLevels),

  // isProd = (process.env.YENV === 'production'),

  postcssPlugins = [
    // autoprefixer included in cssnext
    // require('postcss-cssnext')({
    //   /**
    //    * NOTE: See:
    //    * - `src/config/css.js`
    //    * - `src/config/postcss.js`
    //    */
    //   features: postcss.cssnextFeatures,
    // }),
    require('postcss-import'),
    require('postcss-mixins')({
      mixinsDir: path.join(prjRoot, 'src', 'mixins'),
    }), // https://github.com/postcss/postcss-mixins
    require('postcss-each'),
    require('postcss-for'),
    require('postcss-define-function'), // https://github.com/titancat/postcss-define-function
    require('postcss-advanced-variables')({ // https://github.com/jonathantneal/postcss-advanced-variables
      // unresolved: 'warn', // 'ignore',
      variables: configCss,
    }),
    require('postcss-simple-vars'), // https://github.com/postcss/postcss-simple-vars
    require('postcss-conditionals'), // Already used (scss?)
    // require('postcss-color-alpha'), // https://github.com/avanes/postcss-color-alpha
    require('postcss-color-function'), // https://github.com/postcss/postcss-color-function // To delete?
    // require('postcss-color-mod-function'), // https://github.com/jonathantneal/postcss-color-mod-function
    require('postcss-flexbugs-fixes'), // https://github.com/luisrudge/postcss-flexbugs-fixes
    require('postcss-nested-ancestors'), // https://github.com/toomuchdesign/postcss-nested-ancestors
    require('postcss-nested'), // https://github.com/postcss/postcss-nested
    require('postcss-calc'),
    require('rebem-css'),
    require('postcss-url')({ url: 'rebase' }),
    // require('postcss-math'), // https://github.com/shauns/postcss-math
    require('postcss-utilities'), // https://github.com/ismamz/postcss-utilities
    // https://ismamz.github.io/postcss-utilities/docs#clear-fix
    require('autoprefixer')(),
  ]

;/*}}}*/

// console.log('Config initialized!'); // DEBUG

// const fs = require('fs');

// Override...
module.exports = function override(config, env) {

  // Writing config snapshot before overrides.
  // fs.writeFile('.webpack-config-export-before.json', JSON.stringify(config, null, 2));

  /*
   * styleLoader = oneOf[2],
   * postcssLoader = styleLoader.use[2],
   * See examples in:
   * - `node_modules/react-scripts/config/webpack.config.dev.js`
   * - `node_modules/react-scripts/config/webpack.config.prod.js`
  */
  let rules = config.module.rules;
  let rules1 = rules[1];
  let oneOf = rules1.oneOf;

  /** Extend bem-loader in Babel scope [1] ** {{{*/

  let oldBabelLoader = oneOf[1];

  /** babelLoader ** {{{ */
  let babelLoader = {
    test: oldBabelLoader.test,
    include: oldBabelLoader.include,
    use: [
      {
        loader: require.resolve('webpack-bem-loader'),
        options: {
          techs: ['js', 'css'],
        }
      },
      {
        loader: oldBabelLoader.loader,
        options: Object.assign({}, oldBabelLoader.options, {
          presets: [['es2015', {
            loose: true,
          }], 'react'],
          plugins: [
            'transform-object-rest-spread',
            // ['bem-import', {
            //   'levels': [
            //     './node_modules/bem-react-components/blocks',
            //     './src/blocks',
            //   ]
            // }],
          ],
        })
      }
    ]
  };/*}}}*/

  oneOf[1] = babelLoader;

  /*}}}*/

  /** Extend style loader [2] ** {{{*/

  // eslint-disable-next-line
  let oldCssLoader = oneOf[2]; // Sample of using old `cssLoader` value

  /** cssLoader ** {{{ */
  let cssLoader = {
    test: /\.css$/,
    // exclude: /\.config.css$/,
    use: [
      require.resolve('style-loader'),
      /** css-loader ** {{{*/{
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          // modules: true,
          // localIdentName: '[name]_[local]_[hash:base64:5]',
        },
      },/*}}}*/
      /** postcss-loader ** {{{*/{
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          parser: 'postcss-scss',
          plugins: () => postcssPlugins,
        },
      },/*}}}*/
    ],
  };/*}}}*/

  oneOf[2] = cssLoader;

  /*}}}*/

  // Writing config snapshot after overrides.
  // fs.writeFile('.webpack-config-export-after.json', JSON.stringify(config, null, 2));

  return config;

}
