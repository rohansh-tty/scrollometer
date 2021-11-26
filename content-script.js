var scrollLength = [0] 
var myHeaders = new Headers();


// const { performance } = require('perf_hooks');


document.addEventListener('scroll', function(){

    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';

    console.log('st, sh', st, sh);
    var startTime = performance.now()
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    lastElement = scrollLength.slice(-1)[0];
    // if currentElement > lastElement, only then add it to array
    if (scrollTop > lastElement){
        // this is to make sure that the scroll stat doesn't reduce on scrolling up*
        scrollLength.push(scrollTop);
    }
    max_value = Math.max.apply(Math, scrollLength);
    scroll_in_mtrs = max_value * 0.0002645833;
    
    host = window.location.hostname;
    console.log('host', host);

    // var timestamp = Date(new Date()); // current time as number


    var endTime = performance.now();
    time_spent = endTime - startTime;
    // // next would be to show the scroll stats realtime on popup page.

  
    console.log('Scrollo:->>>', scroll_in_mtrs, 'meters');
    // console.log('speed:->>>', scroll_in_mtrs/time_spent, 'mtrs/sec');
    // console.log('time:->>>', time_spent, 'ms');

    chrome.runtime.sendMessage({scroll: scroll_in_mtrs}, (response)=>{
        console.log('scrollength-content_script.js', response);
    })


    
    print('updateing')

});
