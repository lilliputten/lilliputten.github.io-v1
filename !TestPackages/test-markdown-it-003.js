
var fs = require('fs');
var fm = require('front-matter');

var content = fs.readFileSync(__dirname + '/test.md', 'utf8');
var frontmatter = fm(content);
// var mdSource = frontmatter.body;
// var matterdata = frontmatter.attributes;

var md = require('markdown-it');
// var Plugin = require('./markdown-it-tags/test-regexp');
// var Plugin = require('./markdown-it-tags/test-regexp-class');
var Plugin = require('./markdown-it-tags/extra-tags');

// var hljs = require('highlight.js'); // https://highlightjs.org/
// var hljsPlugin = require('markdown-it-highlight').default;

var regexpPlugin = new Plugin(
  // Regexp to match
  // /@(\w+)/gm,
  /^{%\s*([\s\S]*?)\s*%}/gm,
  // This function will be called when something matches
  function(content, utils) {
    var extra = utils.escape(content);
    return '<pre class="extraTag">'
       + '---' + extra + '---'
       + '</pre>'
    ;
  }
);

// Run...
var html = md({
    typographer : true,
    quotes : '«»‘’',
    // highlight: function (str, lang) {
    //   if (lang && hljs.getLanguage(lang)) {
    //     try {
    //       return hljs.highlight(lang, str).value;
    //     } catch (__) {}
    //   }
    //   return ''; // use external default escaping
    // },
  })
  .use(regexpPlugin)
  // .use(hljsPlugin)
  .render(frontmatter.body)
;

// console.log('frontmatter:', frontmatter);
console.log(html);
