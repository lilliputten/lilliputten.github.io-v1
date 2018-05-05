module.exports = {
  levels: {
    // 'node_modules/bem-react-components/blocks':  { scheme: 'nested', schemeOptions : 'react', naming : 'react' },
    'src/blocks': { scheme: 'nested', schemeOptions : 'react', naming : 'react' },
  },
  modules: {
    'bem-tools': {
      plugins: {
        create: {
          levels: {
            'src/blocks': { default: true }
          },
          techs: ['js', 'css'],
          templates: {
            js: '.bem/templates/js.js',
            css: '.bem/templates/css.js',
          }
        }
      }
    }
  }
}
