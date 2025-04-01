const domain = 'https://streema.com';

let opened = false;
addEventListener("click", () => {
    if (!window.location.href.includes(domain)) {
        return false;
      }

    if (!opened) {
        opened = true;
        chrome.runtime.sendMessage({ action: 'openSidepanel' });
    }
});