chrome.action.onClicked.addListener((tab) => {
    chrome.windows.getCurrent({populate: true}, (window) => {
      let urls = window.tabs.map(tab => tab.url).join("\n");
      let blob = new Blob([urls], { type: 'text/plain' });
      let url = URL.createObjectURL(blob);
      chrome.downloads.download({
        url: url,
        filename: 'urls.txt'
      });
    });
  });
  