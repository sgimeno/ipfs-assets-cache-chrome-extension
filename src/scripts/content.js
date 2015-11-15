function getAttr(collection, attrName){
  return collection.filter(function(node){
    return node.attributes[attrName];
  })
  .map(function(node){
    return node.attributes[attrName].nodeValue;
  });
}

var scripts = Array.prototype.slice.call(document.getElementsByTagName('script'));
var links = Array.prototype.slice.call(document.getElementsByTagName('link'));
var assets = getAttr(scripts, 'src').concat(getAttr(links, 'href'));

console.log(assets);
