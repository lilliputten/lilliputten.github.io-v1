
var fs = require('fs');
var fm = require('front-matter');

var content = fs.readFileSync(__dirname + '/test.md', 'utf8');
var frontmatter = fm(content);
// var mdSource = frontmatter.body;
// var matterdata = frontmatter.attributes;

var md = require('markdown-it');
var Plugin = require('markdown-it-regexp');

var plugin = Plugin(
  // regexp to match
  /@(\w+)/gm,
  // this function will be called when something matches
  function(match, utils) {
    var url = 'http://example.org/u/' + match[1]
    return '<a href="' + utils.escape(url) + '">'
         + utils.escape(match[1])
         + '</a>'
  }
);

// Run...
var html = md().use(plugin).render(frontmatter.body);
// console.log('frontmatter:', frontmatter);
console.log(html);
