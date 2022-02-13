var scrollLength = [0];
var myHeaders = new Headers();
var timeStampArray = [0];

var maxScrollY = 0;
console.log("Inside content_script.js");

const supabaseClient = supabase.createClient(
  "https://iwnluhqtlcmaxrgbkyrk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzA4NDYxOCwiZXhwIjoxOTUyNjYwNjE4fQ.6OfnqomnPQUwbuXYs_T9IwZ3qfSRzVFzyTD9pFfrp6I"
);

  
    

document.addEventListener("scroll", function () {
  console.log("[CS] Scrolling..");
  let scrollY = window.scrollY;

  // making sure that reverse scrolling doesn't eat down 
  lastscroll = scrollLength.slice(-1)[0]
  if (scrollY > lastscroll){
    scrollLength.push(scrollY)
  }


  console.log('scrollY', scrollY, 'maxscrollY', maxScrollY)
  // max can be Math.max(scrollY, maxScrollY) or Math.max.apply(Math, scrollLength)
  maxScrollY =  Math.max.apply(Math, scrollLength) * 0.2646;
  scroll_value = Math.round(maxScrollY)
  let host = window.location.hostname;


  chrome.storage.local.get("scroll", async function (result) {

    let obj = result.scroll;
    obj[host] = scroll_value; // 1inch=96px, 1inch=25.4mm, mm=px*(25.4/96)
    chrome.storage.local.set({ scroll: obj });

    var date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
    
    const { data, error } = await supabaseClient.from("Scroll_duplicate").upsert([
      {
        session_id: host + "#" + date,
        host: host,
        scroll_value: scroll_value,
        date_: date,
        time_spent: 0
      },
    ]);
    if (error) console.log("error: ", error);
     
    let { data: Scroll, select_error } = await supabaseClient.from('Scroll_duplicate').select('*').eq('host', host);
    scroll_value = data[0].scroll_value;
    host_name = data[0].host;

    
    // get the start time, concat date with time
    start_time = data[0].created_at;
    session_id = data[0].session_id;
    date = session_id.split('#')[1];
    start_datetime = date.concat(' ', start_time);

    // get current date, concat date with time, using UTC time for easy calculations
    var curr_date = new Date();
    // to subtract timezone offset
    curr_date.setMinutes(curr_date.getMinutes() + curr_date.getTimezoneOffset());

    var dmy = curr_date.getDate() + '/' + curr_date.getMonth() +'/'+ curr_date.getYear();
    var curr_datetime = curr_date.toString();
  
    // to convert str to Date format
    var current = new Date(curr_datetime);
    var start = new Date(start_datetime);


    // get values in hh:mm:ss format
    var milliseconds = current.getTime() - start.getTime();
   

    if (error) console.log("error: ", select_error);

    chrome.runtime.sendMessage({scroll: scroll_value, host: host_name, time_spent: milliseconds }, (scroll_value, host_name) => {
    })


    // update time spent in supabase
    session_id_date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
    session_id_value = host + "#" + session_id_date;
    console.log('milliss', milliseconds);
    const { update_data, update_error } = await supabaseClient.from("Scroll_duplicate").update({time_spent: milliseconds}).eq('session_id', session_id_value);
    if (error) console.log("error: ", error);


  });
});

