> @since 2018.02.27, 22:28
> @version 2018.02.27, 22:28

Disabling some console enchancements.

## Changing:

- Package: `react-dev-utils@4.2.1`
- Root: `node_modules`
- Path `react-dev-utils`

Used vim regexps:
  - `windo %s#^\(\s*\)\(clearConsole();\)\s*$#\1// \2#` -- Remove console clearing.
  - `windo %s#^\(\s*\)\(console.log(\)\(chalk.\w\+(\)\(.*\)));\s*$#\1\2/*\3*/\4/*)*/);#` -- Remove console colorizing.

Changing files:
  - `WebpackDevServerUtils.js`
