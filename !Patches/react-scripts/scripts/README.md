> @since 2018.02.23, 23:35
> @version 2018.02.23, 23:35

- Disabling some console enchancements.
- Writing stats file (`build.js`).

## Changing:

- Package: `bem-react-core@1.0.17`
- Root: `node_modules`
- Path: `react-scripts/scripts`

Used vim regexps:
  - `windo %s#^\(\s*\)\(clearConsole();\)\s*$#\1// \2#` -- Remove console clearing.
  - `windo %s#^\(\s*\)\(console.log(\)\(chalk.\w\+(\)\(.*\)));\s*$#\1\2/*\3*/\4/*)*/);#` -- Remove console colorizing.

Changing files:
  - `build.js`
  - `init.js`
  - `start.js`

Unchanged files in folder:
  - `test.js`
  - `eject.js`
