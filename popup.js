
chrome.storage.local.get(["scroll"], function (result) {
  console.log("result: ", result.scroll);
  let values = Object.values(result.scroll);

  // getting the value one time need to fix with realtime solution
  chrome.tabs.query(
    { active: true, currentWindow: true },
    async function (tabs) {
      console.log("tab: ", tabs[0]);

      let url = new URL(tabs[0].url);
      console.log("host: ", url.hostname);
      console.log("value: ", result.scroll[url.hostname]);
    }
  );
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  const scroll_element = document.getElementById('scroll-value');
  const host_element = document.getElementById('host-name');
  const time_box_element = document.getElementById('time-box-value');
  console.log('host element', host_element);

  
  // console.log('scroll element', scroll_element);
  // console.log('scroll value from CS', message.scroll);
  console.log('host name from CS', message.host);

  if (message.type == "scroll") {
    console.log('message type is scroll');
    scroll_element.innerHTML = message.scroll;
    host_element.innerHTML = message.host;}
  else if (message.type == "time_spent"){
    console.log('message type is time spent');
    seconds = message.time_taken.seconds;
    console.log('seconds', seconds);
    time_box_element.innerHTML = seconds;
  }
  

  
  
  console.log('sender', sender);
  }
);