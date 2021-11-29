var scrollLength = [0] 
var myHeaders = new Headers();

document.addEventListener('scroll', function(){

    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';

    // var startTime = performance.now()
     // enter your custom date in the Date() function.

    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    lastElement = scrollLength.slice(-1)[0];
    if (scrollTop > lastElement){
        // this is to make sure that the scroll stat doesn't reduce on scrolling up*
        scrollLength.push(scrollTop);
    }
    max_value = Math.max.apply(Math, scrollLength);
    scroll_in_mtrs = max_value * 0.0002645833;
    
    host = window.location.hostname;

// WILL HAVE TO FIX TIME ISSUE!!!  //


    // only if the page gets reloaded time reloadds
    if (performance.getEntriesByType('navigation')[0].type == 'reload') {
        console.info( "This page is reloaded" );
        var customStartTime = new Date()

        // var endTime = performance.now();
        // time_spent = endTime - startTime;
    
      } else {
        console.info( "This page is not reloaded");
      }
      
    startTime = customStartTime || parseInt(localStorage.getItem('startTime') || Date.now());
   
    speed_ = scroll_in_mtrs/startTime;

    // // next would be to show the scroll stats realtime on popup page.

  
    console.log('Scrollo:->>>', scroll_in_mtrs, 'meters');
    console.log('Time spent>>>> ', startTime);
  

    chrome.runtime.sendMessage({scroll: scroll_in_mtrs, time: startTime, speed: speed_}, (response)=>{
        console.log('scrollength-content_script.js', response);
    })

});
