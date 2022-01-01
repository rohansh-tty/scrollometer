console.log("Inside popup.js");


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
  console.log('host element', host_element);

  
  // console.log('scroll element', scroll_element);
  // console.log('scroll value from CS', message.scroll);
  console.log('host name from CS', message.host);

  scroll_element.innerHTML = message.scroll;
  host_element.innerHTML = message.host;



  

  console.log(sender);
  }
);