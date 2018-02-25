// Try to load local file (and check for hot reload option from webpack)...
try {
  let url = 'a.md';
  debugger;
  let isHotLoad = module && module.hot && module.hot.active;
  if ( isHotLoad ) {
    let moduleName = String(module.i).replace(/^\.[/\\]/, ''),
      rootDepthRes = moduleName.match(/[/\\]/g),
      rootDepth = rootDepthRes ? rootDepthRes.length : 0,
      rootPrefix = '../'.repeat(rootDepth),
      rootUrl = rootPrefix + url
    ;
    let x = require('../../a.md');
    console.log(rootUrl, x);
    // let x = require(rootUrl);
  }
  debugger;
}
catch(err) {
  console.error(err);
  debugger;
}
