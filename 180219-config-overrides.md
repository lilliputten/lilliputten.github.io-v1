> [bem-react-boilerplate: Расширение конфигурации (config-overrides) · Issue #1482 · bem-site/bem-forum-content-ru](https://github.com/bem-site/bem-forum-content-ru/issues/1482)

Пытаюсь дополнить конфигурацию `bem-react-boilerplate` через `config-overrides.js`. Хочется:

## 1. Удобный синтаксис для стилей

Пытаюсь добавить обработчик `SugarSS` или хотя бы подключать `stylus`. Пока получается только добавить соотв. парсер для всех исходных `.css`, что не является годным вариантом -- хотелось бы, чтобы css обрабатывалось именно, как css, а остальные вкусности применялись для файлов с соотв. расширением (`.sss`, `.styl`).

Создаю объект для обработки `.sss` файлов по аналогии с оригинальным:
```js
  let ssLoader = {
    test : /\.sss$/, // Вариант А: пытаемся применять к файлам `.sss`. Не работает вообще.
    // test : /\.css$/, // Вариант Б: применяем к css-файлам. Работает, но ломается на обычном css.
    use : [
      require.resolve('style-loader'),
      {
        loader : require.resolve('css-loader'),
        options : { importLoaders : 1 },
      },
      {
        loader : require.resolve('postcss-loader'),
        options : {
          ident : 'postcss_sss',
          parser : 'sugarss',
          plugins : // autoprefixer...
        },
      },
    ],
  };
```
Далее могу либо заменить исходный объект, либо попытаться добавить новый:
```js
  // Replace default postcss with SugarSS
  config.module.rules[1].oneOf[2] = ssLoader;
  // Append SugarSS
  config.module.rules[1].oneOf.push(ssLoader);
```
Проблема в том, что оно работает только в "Варианте Б" -- только если указываю расширение `.css` для `test`, но в этом случае сыпятся ошибки, если встречается обычный css. Типа такого:
 ```log
Failed to compile

./src/blocks/App/Logo/App-Logo.css
Module build failed: Syntax Error

(1:11) Unnecessary curly bracket

> 1 | .App-Logo {
    |           ^
```
Т.е., с одной стороны, понятно, что оно как-то работает. Но вот повесить на отдельное расширение не удаётся никак.

Такое ощущение, что есть ещё фильтрация по расширениям исходных файлов и задаваемое мной условие поиска `.sss` или `.styl` ничего не находит в отобранных файлах.

Как можно добавить своё собственный "кастомный" тип исходных файлов?

В шаблонах конфигов (`node_modules/react-scripts/config/`) тоже не вижу ничего подобного на список допустимых расширений. Как это делается? Что делаю не так?

## 2. Sourcemaps для babel

При отладке вижу только один уровень sourcemaps -- код до склейки вебпаком (уже обработанные babel'ем отдельные модули). Мой исходный код либо не передается от babel в webpack, либо не подхватывается там.

Пробовал (там же, в `config-overrides.js`):

1. Добавлять опции `devtool: 'source-map'`, `sourceMaps: true` (или `'inline'`) и `retainLines: true` для (for `babelLoader.loader`).

2. Передавать `sourceMaps: true` для опций babel-плагина `es2015`.

3. Использовать `config = injectBabelPlugin('source-map-support', config)`.

(См. [How to use sourcemaps? · Issue #1 · bem/bem-react-boilerplate](https://github.com/bem/bem-react-boilerplate/issues/1#issuecomment-361895813).)
