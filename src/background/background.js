const domain = 'https://streema.com';

// background.js
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({
    tabId: tab.id
  });
});



// const expectedSidePanelState = {};
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);

  // Enables the side panel
  if (url.origin.includes(domain)) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'index.html',
      enabled: true
    });
  } else {
    // Disables the side panel on all other sites
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    });

    // expectedSidePanelState[tabId] = false;
    chrome.runtime.sendMessage({ action: "closeSidePanel" });
  }
});

chrome.runtime.onMessage.addListener(message => {
  console.log(message, "message")
  // Might not be as easy if there are multiple side panels open
  if (message.action === 'openSidepanel') {
    chrome.windows.getCurrent(window => chrome.sidePanel.open({windowId: window.id}))
  }

  return true;
})
