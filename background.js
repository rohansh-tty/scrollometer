chrome.storage.local.set({ scroll: {} });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if ('set_user_id' === message) {
        chrome.cookies.get({ "url": 'https://scrollometerui.vercel.app/', "name": 'user_id' }, function (cookie) {
            console.log('cookie value: ', cookie.value)

            chrome.storage.local.set({ user_id_sm: cookie.value });
        });
    }
});

