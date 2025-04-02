let opened = false;
addEventListener("click", () => {

    if (!opened) {
        opened = true;
        chrome.runtime.sendMessage({ action: 'openSidepanel' });
    }
});