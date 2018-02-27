import path from 'path';
let url = 'someurl/file.md';
if ( this.state.hotLoad ) {
  url = path.join('/public-src', url);
}
console.log(url);
