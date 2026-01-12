const style = document.createElement('style');
style.innerHTML = 'html { display: none !important; }';
document.documentElement.appendChild(style);

chrome.storage.sync.get("blockedList", function(obj) {
    const blockedList = obj.blockedList || [];
    const currentUrl = window.location.hostname;

    //console.log(`${currentUrl}`);

    const isBlocked = blockedList.some((site) => 
        site.includes(currentUrl)
        //console.log(`${currentUrl} vs ${site} and ${site.includes(currentUrl)}`);
    );

    if (isBlocked) {
        // Redirect if blocked
        window.location.href = "https://www.google.com";
    } else {
        // Unhide the page if it's safe
        style.remove();
    }
});
