> @since 2018.02.23, 23:35
> @version 2018.02.23, 23:35

## Changing:

Pathing root: `node_modules`

Package: `bem-react-core@1.0.17`

Path `react-scripts/config`:
  - `webpackDevServer.config.js`: Loading local files from `site` folder
  - `webpack.config.dev.js`, `webpack.config.prod.js`: Added `appSrc` to modules path list (for including from `src` path; eg for `import from 'libs/someLib'`).
