// background.js
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Only trigger if the URL actually changed
    if (changeInfo.url) {
        chrome.storage.sync.get("blockedList", (obj) => {
            const blockedList = obj.blockedList || [];

            if (changeInfo.url.includes("google.com")) return;

            const isBlocked = blockedList.some(site => changeInfo.url.includes(site));

            if (isBlocked) {
                chrome.tabs.update(tabId, { url: "https://www.google.com" });
            }
        });
    }
});