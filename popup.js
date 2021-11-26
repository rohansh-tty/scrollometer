console.log('Inside popup.js');



chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
    scroll_ = message.scroll;
    // scroll_ = scrollValue.slice(-1)[0]
    // speed = message.speed;
    // time = message.time;

    console.log('scroll length-popup', scroll_ ) ;

    // max_value = Math.max.apply(Math, scroll_);
    // scroll_in_mtrs = max_value * 0.0002645833;/
    document.getElementById('scroll').innerHTML = Math.round(scroll_);
    // document.getElementById('time').innerHTML = time;
    // document.getElementById('speed').innerHTML = speed;

})
