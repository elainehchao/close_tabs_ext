var background = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function () {
    var oneDayButton = document.getElementById('oneDay');
    oneDayButton.addEventListener('click', function () {

        chrome.tabs.query({}, function (tabs) {
            var currentTime = new Date(Date.now());
            var oneDayAgo = new Date(currentTime);
            oneDayAgo.setHours(currentTime.getHours - 24);
            for (var i = 0; i < tabs.length; i++) {
                if (background.tabsToCreationTimeMap[tabs[i].id] < oneDayAgo) {
                    background.tabsToCreationTimeMap.delete(tabs[i].id);
                    chrome.tabs.remove(tabs[i].id);
                }
            }
        });
    }, false);
}, false);
