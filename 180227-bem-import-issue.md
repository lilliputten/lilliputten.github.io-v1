> https://github.com/bem-site/bem-forum-content-ru/issues/1485

Пробую подключить [bem-react-components](https://github.com/bem/bem-react-components) в проект на основе [bem-react-boilerplate](https://github.com/bem/bem-react-boilerplate). Добавляю уровень в `.bemrc.js`:
```js
module.exports = {
  levels: {
    'node_modules/bem-react-components/blocks':  { scheme: 'nested', schemeOptions : 'react', naming : 'react' },
    'src/blocks': { scheme: 'nested', schemeOptions : 'react', naming : 'react' },
  },
  // ...
}
```
Делаю импорт:
```js
import Button from 'b:Button';
```
При запуске dev-сервера в консоли вижу ошибку:
```log
Failed to compile.
./node_modules/bem-react-components/blocks/Button/Button.js
Module parse failed: Unexpected token (61:12)
You may need an appropriate loader to handle this file type.
|         const { focused, hovered, pressed } = this.state;
|         return {
|             ...this.__base(...arguments),
|             disabled,
|             focused,
```
Строка 61 это именно `...this.__base(...arguments)`.

Насколько могу понять, требуется вручную ещё указать webpack, что файлы из `node_modules/bem-react-components/blocks/` должны обрабатываться babel'ем? Как это сделать?

Пробовал добавлять в `config-overrides.js`, возникает ошибка, связанная с некорректной работой с windows-путями:
```log
Module not found: Can't resolve './blocksAppApp.js' in 'D:\My\Project\Path\src'
```
Добавляю так:
```js
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
            ['bem-import', {
              'levels': [
                './node_modules/bem-react-components/blocks',
                './src/blocks',
              ]
            }],
          ],
        })
      }
    ]
  };
```

Ошибка выпадает в `node_modules/webpack/lib/ModuleNotFoundError.js`. Дальше пока не смотрю (на этом станке нет отладчика).

См.:
- [bem/babel-plugin-bem-import: BEM import resolver](https://github.com/bem/babel-plugin-bem-import)
- [bem/bem-react-components: Components library for develop with React and BEM methodology](https://github.com/bem/bem-react-components)
- [bem/webpack-bem-loader: Webpack BEM loader](https://github.com/bem/webpack-bem-loader)
-
