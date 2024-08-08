function setStatus(text) {
  const el = document.getElementById('status');
  if (el) {
    el.innerHTML = JSON.stringify(text)
  }
}

document.getElementById('save').addEventListener('click', () => {
    chrome.windows.getCurrent({populate: true}, (window) => {
      try {
        let urls = window.tabs.map(tab => tab.url).join("\n");
        let blob = new Blob([urls], { type: 'text/plain' });
        let url = URL.createObjectURL(blob);
        chrome.downloads.download({
          url: url,
          filename: 'urls.txt'
        });
        setStatus("URLs salvas!")
      } catch (error) {
        setStatus(JSON.stringify(error))
      }
    });
  });
  
  document.getElementById('copy').addEventListener('click', () => {
    chrome.windows.getCurrent({populate: true}, (window) => {
      let urls = window.tabs.map(tab => tab.url).join("\n");
      navigator.clipboard.writeText(urls).then(() => {
        setStatus('URLs copiadas!');
      }).catch(err => {
        setStatus(JSON.stringify(err))
      });
    });
  });