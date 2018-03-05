// Create reference instance
var marked = require('marked');

// lex...
marked.InlineLexer.rules.chord = /^\[([^\n\]]+)\]/;
marked.Renderer.prototype.chord = function(text) {
  return '<span class="chord">' + text + '</span>';
};

// marked.setOptions({
//   highlight: function(code, lang, callback) {
//     require('pygmentize-bundled') ({ lang: lang, format: 'html' }, code, function (err, result) {
//       callback(err, result.toString());
//     });
//   }
// });

// Get reference
var renderer = new marked.Renderer();

// Override function
renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return `<h${level}>
  <a name="'${escapedText}'" class="anchor" href="#${escapedText}">
    <span class="header-link"></span>
  </a>
  ${text}
  </h${level}>`;
};

// ***

var fs = require('fs');
var fm = require('front-matter');

var content = fs.readFileSync(__dirname + '/test.md', 'utf8');
var frontmatter = fm(content);
// var matterdata = frontmatter.attributes;

// Run marked
var html = marked(frontmatter.body, { renderer: renderer });
// console.log('frontmatter:', frontmatter);
console.log(html);
