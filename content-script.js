var scrollLength = [0];
var myHeaders = new Headers();
var timeStampArray = [0];

var maxScrollY = 0;
console.log("Inside popup.js");
window.onload = () => {
  
  let hour = 0;
  let minute = 0;
  let seconds = 0;
  let totalSeconds = 0;

  let intervalId = null;

  intervalId = setInterval(startTimer, 1000);
  function startTimer() {
    ++totalSeconds;
    hour = Math.floor(totalSeconds / 3600);
    minute = Math.floor((totalSeconds - hour * 3600) / 60);
    seconds = totalSeconds - (hour * 3600 + minute * 60);

    // document.getElementById("hour").innerHTML = hour;
    console.log('Total Minutes spent', minute, seconds);
  }


    const time_box_element =document.getElementById("time-box-value");
    time_box_element.innerHTML = minute + "minutes" + seconds + "seconds";

    let time_dict = {hour: hour, minute: minute, seconds: seconds};
    var time_array = [hour, minute, seconds];
    chrome.runtime.sendMessage({"type": "time_spent", time_taken: time_dict}, (time_dict) => {
      console.log("time_dict", time_dict);
    })
  
}


const supabaseClient = supabase.createClient(
  "https://iwnluhqtlcmaxrgbkyrk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzA4NDYxOCwiZXhwIjoxOTUyNjYwNjE4fQ.6OfnqomnPQUwbuXYs_T9IwZ3qfSRzVFzyTD9pFfrp6I"
);

  
    

document.addEventListener("scroll", function () {
  console.log("[CS] Scrolling..");
  let scrollY = window.scrollY;
  maxScrollY = Math.max(scrollY, maxScrollY);
  let host = window.location.hostname;

  // Timer
  let hour = 0;
  let minute = 0;
  let seconds = 0;
  let totalSeconds = 0;
  let intervalId = null;

  intervalId = setInterval(startTimer, 1000);
  function startTimer() {
    ++totalSeconds;
    hour = Math.floor(totalSeconds / 3600);
    minute = Math.floor((totalSeconds - hour * 3600) / 60);
    seconds = totalSeconds - (hour * 3600 + minute * 60);
  }
  console.log('time array', hour, minute, seconds);


  chrome.storage.local.get("scroll", async function (result) {

    let obj = result.scroll;
    obj[host] = maxScrollY;


    chrome.storage.local.set({ scroll: obj });

    var date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

    const { data, error } = await supabaseClient.from("Scroll").upsert([
      {
        session_id: host + "#" + date,
        host: host,
        scroll_value: maxScrollY,
      },
    ]);
    if (error) console.log("error: ", error);


    // : {id: 78879, created_at: '2022-01-01T05:12:44.088678+00:00', host: 'www.wionews.com', scroll_value: 7672, session_id: 'www.wionews.com#2022/01/01'}
    // length: 1
     
    let { data: Scroll, select_error } = await supabaseClient.from('Scroll').select('*').eq('host', host);

    scroll_value = data[0].scroll_value;
    host_name = data[0].host;

    chrome.runtime.sendMessage({"type": "scroll", scroll: scroll_value, host: host_name}, (scroll_value, host_name) => {
      console.log("scroll value & host name", scroll_value, host_name);
    })

    chrome.runtime.sendMessage({"type": "time_spent", time_taken: seconds}, (seconds) => {
      console.log("time_dict", seconds);
    })
  

    if (error) console.log("error: ", select_error);
  });

});
