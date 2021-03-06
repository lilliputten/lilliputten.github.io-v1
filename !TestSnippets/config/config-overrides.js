// Requirements...

const fs = require('fs-extra');
const { injectBabelPlugin } = require('react-app-rewired');
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');

// Helpers (used in examples):

/** deepClone ** {{{ */
function deepClone(object) {
  return JSON.parse(JSON.stringify(object));
}/*}}}*/
/** getLoader ** {{{ */
function getLoader(rules, matcher) {
  let match;

  rules.some(rule => {
    return (match = matcher(rule)
      ? { rules, rule }
      : getLoader(rule.use || rule.oneOf || [], matcher));
  });

  return match;
}/*}}}*/
/** rewireStylus ** {{{ */
function rewireStylus(config, env) {
  const { rule: cssRule, rules } = getLoader(
    config.module.rules,
    rule => String(rule.test) === String(/\.css$/)
  );

  const stylusRule = deepClone(cssRule);
  stylusRule.test = /\.styl$/;
  if (env === 'production') {
    stylusRule.loader.splice(3, 0, require.resolve('stylus-loader'));
  } else {
    stylusRule.use.splice(2, 0, require.resolve('stylus-loader'));
  }
  rules.splice(rules.indexOf(cssRule), 0, stylusRule);

  return config;
}/*}}}*/

// Override...

module.exports = function override(config, env) {

  /*{{{ Examples... */
  fs.writeFileSync('config.module.rules.json', JSON.stringify(config.module.rules));
  injectBabelPlugin('transform-decorators-legacy', config);
  rewireStylus(config, env);
  // console.log(config);
  // debugger;
  // process.exit();
  /*}}}*/

  /** Add/extend style loader ** {{{ */

  let
    oneOf = config.module.rules[1].oneOf,
    // styleLoader = oneOf[2],
    // postcssLoader = styleLoader.use[2],
    // See examples in:
    // - `node_modules/react-scripts/config/webpack.config.dev.js`
    // - `node_modules/react-scripts/config/webpack.config.prod.js`
    ssLoader = {
      test : /\.(css|sss)$/,
      // test : /\.sss$/,
      use : [
        require.resolve('style-loader'),
        {
          loader : require.resolve('css-loader'),
          options : { importLoaders : 1 },
        },
        {
          loader : require.resolve('postcss-loader'),
          options : {
            ident : 'postcss', // 'postcss_sss',
            // parser : 'sugarss', // XXX!
            // plugins : postcssLoader.plugins,
            plugins : () => [
              /*
               * See plugins list: https://github.com/postcss/postcss/blob/master/docs/plugins.md
               * TODO:
               * - postcss-opacity
               * - postcss-color-function // https://github.com/postcss/postcss-color-function
               * - *alpha*
               */
              require('postcss-flexbugs-fixes'),
              require('postcss-nested')(), // https://github.com/postcss/postcss-nested
              require('postcss-utilities')(), // https://github.com/ismamz/postcss-utilities
              require('autoprefixer')({
                browsers : [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox : 'no-2009',
              }),
            ],
          },
        },
      ],
    }
  ;

  // Replace default postcss with SugarSS
  oneOf[2] = ssLoader;
  // // Append SugarSS
  // oneOf.push(ssLoader);

/*}}}*/

  /** Add bem-loader in Babel scope ** {{{*/
  let rules = config.module.rules;
  let rules1 = rules[1];
  let babelLoader = rules1.oneOf[1];
  rules1.oneOf[1] = {
    test : babelLoader.test,
    include : babelLoader.include,
    use : [
      {
        loader : require.resolve('webpack-bem-loader'),
        options : {
          techs : ['js', 'css'],
        }
      },
      {
        loader : babelLoader.loader,
        options : Object.assign({}, babelLoader.options, {
          presets : [['es2015', {
            loose : true,
          }], 'react'],
          plugins : [
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
  };
  /*}}}*/

  return config;

}

