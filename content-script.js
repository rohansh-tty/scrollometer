var scrollLength = [0] 
var myHeaders = new Headers();


document.addEventListener('scroll', function(){

    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';

    console.log('st, sh', st, sh);

    // var percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    lastElement = scrollLength.slice(-1)[0];
    // if currentElement > lastElement, only then add it to array
    if (scrollTop > lastElement){
        // this is to make sure that the scroll stat doesn't reduce on scrolling up*
        scrollLength.push(scrollTop);
    }
    max_value = Math.max.apply(Math, scrollLength);
    scrollLength_in_mtrs = max_value * 0.0002645833;
    
    host = window.location.hostname;
    console.log('host', host);

    // var timestamp = Date(new Date()); // current time as number


    var stats_data = [[1, 20, host, scrollLength_in_mtrs]]
    // // next would be to show the scroll stats realtime on popup page.

    // // POST scroll data back to Google Sheet
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // var requestOptions = {
    //     method: "post",
    //     headers: myHeaders,
    //     redirect: "follow",
    //     body: JSON.stringify(stats_data)
    // };
    
    // fetch("https://v1.nocodeapi.com/gilf641/google_sheets/lLlefmIJOSPuLxtd?tabId=Sheet1", requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));


    console.log('Scrollometer:->>>', scrollLength_in_mtrs, 'meters');
		
});



// xano endpoint
let xanoURL = new this.URL();

