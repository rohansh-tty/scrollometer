

var scrollLength = [0] 
var myHeaders = new Headers();
var timeStampArray = [0]

document.addEventListener('scroll', function(){
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    lastElement = scrollLength.slice(-1)[0];
    if (scrollTop > lastElement){
        // this is to make sure that the scroll stat doesn't reduce on scrolling up*
        scrollLength.push(scrollTop);
    }
    max_value = Math.max.apply(Math, scrollLength);
    scroll_in_mtrs = max_value * 0.0002645833;

    var lastReloadTimestamp = new Date(document.lastModified).getTime();

    
    host = window.location.hostname;

// WILL HAVE TO FIX TIME ISSUE!!!  //
    if (performance.getEntriesByType('navigation')[0].type == 'reload') {
        console.info( "This page is reloaded" );
        var customStartTime = new Date().getSeconds()
      } else {
        console.info( "This page is not reloaded");
      }
      
    // startTime = customStartTime || parseInt(localStorage.getItem('startTime') || Date.now());
    // NEED TO FIX TIME PART
    
  
    
    var total_time_spent = (function(){"use strict";
        // var secondsSpentElement = document.getElementById("seconds-spent");
        // var millisecondsSpentElement = document.getElementById("milliseconds-spent");
        requestAnimationFrame(function updateTimeSpent(){
            var timeNow = performance.now();
            var secondsSpentElement = round(timeNow/1000/60);
            console.log('Seconds Spent>>>>>>', secondsSpentElement);
            requestAnimationFrame(updateTimeSpent);
        });
        var performance = window.performance, round = Math.round;
        
        })();

    // console.log('Scrollo:->>>', scroll_in_mtrs, 'meters');
    console.log('TimeSpent:-->>>', total_time_spent);
    chrome.runtime.sendMessage({scroll: scroll_in_mtrs}, (response)=>{
        console.log('scrollength-content_script.js', response);
    })
}
);





