
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


chrome.storage.local.get(["scroll"], function (result) {
  console.log("result in popup.js: ", result.scroll);
  let values = Object.values(result.scroll);

  // getting the value one time need to fix with realtime solution
  chrome.tabs.query(
    { active: true, currentWindow: true },
    async function (tabs) {
      let url = new URL(tabs[0].url);
    }
  );
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  const scroll_element = document.getElementById('scroll-value');
  const speed_element = document.getElementById('speed-value');
  const host_element = document.getElementById('host-name');
  const time_box_element = document.getElementById('time-value');
  
  var milliseconds = message.time_spent;

  var hh = Math.floor(milliseconds / 1000 / 60 / 60);
  milliseconds -= hh * 1000 * 60 * 60;
  var mm = Math.floor(milliseconds / 1000 / 60);
  milliseconds -= mm * 1000 * 60;
  var ss = Math.floor(milliseconds / 1000);
  milliseconds -= ss * 1000;


   //speed caluclation
   total_seconds = mm*60 + ss;
   speed = round(message.scroll/total_seconds, 3);


  var pad_hh = hh.toString().padStart(2, '0');
  var pad_mm = mm.toString().padStart(2, '0');
  var pad_ss = ss.toString().padStart(2, '0');

  let currentTime = pad_hh + ":" + pad_mm + ":" + pad_ss;
  scroll_element.innerHTML = message.scroll;
  speed_element.innerHTML = speed;
  host_element.innerHTML = message.host;
  time_box_element.innerHTML = currentTime;

  }
);