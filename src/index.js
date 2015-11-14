var utils = require('./modules/utils');

chrome.browserAction.setTitle({ title: 'Foo'})
document.addEventListener('DOMContentLoaded', function() {

  //1. Scrap script and link tags
  //2. Fetch the hashes through the ipfs-assets-cache server
  //3. Load the content from the local gateway for each hashes
  //4. NTH option for setting local/public gateway


  utils.getCurrentTabUrl(function(url) {
    console.log('GOT URL ' + url);
    // Put the image URL in Google search.
    utils.renderStatus('Performing Google Image search for ' + url);

    utils.getImageUrl(url, function(imageUrl, width, height) {

      utils.renderStatus('Search term: ' + url + '\n' +
          'Google image search result: ' + imageUrl);
      var imageResult = document.getElementById('image-result');
      // Explicitly set the width/height to minimize the number of reflows. For
      // a single image, this does not matter, but if you're going to embed
      // multiple external images in your page, then the absence of width/height
      // attributes causes the popup to resize multiple times.
      imageResult.width = width;
      imageResult.height = height;
      imageResult.src = imageUrl;
      imageResult.hidden = false;

    }, function(errorMessage) {
      utils.renderStatus('Cannot display image. ' + errorMessage);
    });
  });
});
