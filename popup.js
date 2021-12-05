console.log('Inside popup.js');



chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
    scroll_ = message.scroll;
    speed_ = message.speed;
    time_ = message.time;
    
    console.log('scroll length-popup', scroll_ ) ;
    document.getElementById('scroll').innerHTML = scroll_.toFixed(4);
  
})
