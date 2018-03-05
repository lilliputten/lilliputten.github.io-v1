
var fs = require('fs');
var fm = require('front-matter');

var content = fs.readFileSync(__dirname + '/test.md', 'utf8');
var frontmatter = fm(content);
// var mdSource = frontmatter.body;
// var matterdata = frontmatter.attributes;

var md = require('markdown-it');
// var Plugin = require('./markdown-it-tags/test-regexp');
// var Plugin = require('./markdown-it-tags/test-regexp-class');
var Plugin = require('./markdown-it-tags/regexp-class');

var regexpPlugin = new Plugin(
  // Regexp to match
  // /@(\w+)/gm,
  /^{{\s*([\s\S]*?)\s*}}/gm,
  // This function will be called when something matches
  function(match, utils) {
    var extra = '--' + utils.escape(match[1]) + '--';
    return '<pre class="extraTag">'
       + extra
       + '</pre>'
    ;
  }
);

// Run...
var html = md()
  .use(regexpPlugin)
  .render(frontmatter.body)
;

// console.log('frontmatter:', frontmatter);
console.log(html);
