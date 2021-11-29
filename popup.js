console.log('Inside popup.js');



chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
    scroll_ = message.scroll;
    speed_ = message.speed;
    time_ = message.time;
    
 

    console.log('scroll length-popup', scroll_ ) ;
    console.log('speed popup', speed_);
    console.log('time popup', time_);


    // max_value = Math.max.apply(Math, scroll_);
    // scroll_in_mtrs = max_value * 0.0002645833;/
    document.getElementById('scroll').innerHTML = scroll_.toFixed(4);
    document.getElementById('speed').innerHTML = speed_.toFixed(4);
    document.getElementById('time').innerHTML = time_.toFixed(4);


    // document.getElementById('time').innerHTML = time;
    // document.getElementById('speed').innerHTML = speed;

})
