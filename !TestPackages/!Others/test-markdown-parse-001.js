var parser = require('markdown-parse');
var fs = require('fs');

var content = fs.readFileSync(__dirname + '/test.md', 'utf8');

parser(content, function(err, result){

    console.log('the original body:')
    console.log(result.body)

    console.log('the html:')
    console.log(result.html)

    console.log('the front matter:')
    console.dir(result.attributes)
})
