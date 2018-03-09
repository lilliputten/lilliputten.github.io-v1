/**
 * @see [timarney/react-app-rewired : Override create-react-app webpack configs without ejecting](https://github.com/timarney/react-app-rewired)
 * @see README
 */

// Override...

const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

module.exports = function override(config, env) {

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
            // 'webpack-stats-plugin',
            // new StatsWriterPlugin(),
            // new StatsWriterPlugin({
            //   filename: 'stats.json', // Default
            // }),
          ],
        })
      }
    ]
  };
  /*}}}*/

  return config;

}
