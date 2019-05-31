var tabsToCreationTimeMap = new Map();

chrome.tabs.onCreated.addListener(function (tab) {
    tabsToCreationTimeMap[tab.id] = Date.now();
});
