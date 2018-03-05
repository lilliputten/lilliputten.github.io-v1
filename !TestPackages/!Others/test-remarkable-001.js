
var fs = require('fs');
var fm = require('front-matter');

var content = fs.readFileSync(__dirname + '/test.md', 'utf8');
var frontmatter = fm(content);
// var matterdata = frontmatter.attributes;

// var pygmentize = require('pygmentize');
// var pygments = require('pygments');
var hljs = require('highlight.js'); // https://highlightjs.org/

var Remarkable = require('remarkable');
var md = new Remarkable({
  typographer:  true,
  quotes: '«»‘’',
  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed
  // highlight: function (/*str, lang*/) { return ''; },
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return ''; // use external default escaping
  },
});

// Example:
// module.exports = function(self) {
//   self.inline.ruler.after(your_rule_fn);
//   self.renderer.rules.mention = your_render_fn;
// }

var remarkableCodeGroup = require('remarkable-codegroup');
md.use(remarkableCodeGroup);

// var remarkableVideo = require('./remarkable-video');
// md.use(remarkableVideo);

// Run marked
var html = md.render(frontmatter.body);
// console.log('frontmatter:', frontmatter);
console.log(html);
