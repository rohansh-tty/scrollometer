console.log('Inside popup.js');



chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
    scroll_ = message.scroll;
    speed_ = message.speed;
    time_ = message.time;
    
    console.log('scroll length-popup', scroll_ ) ;

    var date = new Date().toLocaleTimeString();
    document.getElementById('scroll').innerHTML = scroll_.toFixed(4);
    
    // // update text below scroll
    // document.getElementById('scroll-text').innerHTML = "Total Scrolled::Updated Last on ${date}";
})
