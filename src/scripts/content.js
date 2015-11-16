//1. Scrap script and link tags
//2. Fetch the hashes through the ipfs-assets-cache server
//3. Load the content from the local gateway for each hashe
//4. NTH option for setting local/public gateway

function getAttrs(arr, attrName){
  return arr.filter(function(node){
    return node.attributes[attrName];
  })
  .map(function(node){
    return node.attributes[attrName].nodeValue;
  });
}

//1. Scrap script and link tags
var scripts = Array.prototype.slice.call(document.getElementsByTagName('script'));
var links = Array.prototype.slice.call(document.getElementsByTagName('link'));
var assets = []
  .concat(getAttrs(scripts, 'src'))
  .concat(getAttrs(links, 'href'))
  .map(function(url){
    if (url.startsWith('//')){
      return 'http:' + url;
    }
    return url;
  });

//2. Fetch the hashes through the ipfs-assets-cache server
//TODO: add multiparam support in server

//3. Load the content from the local gateway for each hashe

console.clear();
console.log(assets);
