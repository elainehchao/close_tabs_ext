var tabsToCreationTimeMap = new Map();

chrome.tabs.onCreated.addListener(function (tab) {
    tabsToCreationTimeMap[tab.id] = Date.now();
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    tabsToCreationTimeMap[activeInfo.tabId] = Date.now();
});
