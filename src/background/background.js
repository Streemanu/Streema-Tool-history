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
    // expectedSidePanelState[tabId] = false;
    await chrome.runtime.sendMessage({ action: "closeSidePanel" });
    // Disables the side panel on all other sites
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    });
  }
});

