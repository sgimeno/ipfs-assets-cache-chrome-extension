console.log('background.js');

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Current tab is ' + tab.url);
  chrome.tabs.executeScript({ file: 'scripts/content.js' });
});
