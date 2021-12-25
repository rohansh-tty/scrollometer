var scrollLength = [0];
var myHeaders = new Headers();
var timeStampArray = [0];

var maxScrollY = 0;

const supabaseClient = supabase.createClient(
  "https://iwnluhqtlcmaxrgbkyrk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzA4NDYxOCwiZXhwIjoxOTUyNjYwNjE4fQ.6OfnqomnPQUwbuXYs_T9IwZ3qfSRzVFzyTD9pFfrp6I"
);

document.addEventListener("scroll", function () {
  console.log("[CS] Scrolling..");

  let scrollY = window.scrollY;
  maxScrollY = Math.max(scrollY, maxScrollY);
  console.log("scrollY: ", maxScrollY);

  let host = window.location.hostname;
  console.log("host: ", host);

  chrome.storage.local.get("scroll", async function (result) {
    console.log("result: ", result.scroll);

    let obj = result.scroll;
    obj[host] = maxScrollY;

    console.log("obj: ", obj);

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
  });

  //   var scrollTop =
  //     window.pageYOffset ||
  //     (document.documentElement || document.body.parentNode || document.body)
  //       .scrollTop;
  //   lastElement = scrollLength.slice(-1)[0];
  //   if (scrollTop > lastElement) {
  //     // this is to make sure that the scroll stat doesn't reduce on scrolling up*
  //     scrollLength.push(scrollTop);
  //   }
  //   max_value = Math.max.apply(Math, scrollLength);
  //   scroll_in_mtrs = max_value * 0.0002645833;

  //   var lastReloadTimestamp = new Date(document.lastModified).getTime();

  //   host = window.location.hostname;

  // WILL HAVE TO FIX TIME ISSUE!!!  //
  //   if (performance.getEntriesByType("navigation")[0].type == "reload") {
  //     console.info("This page is reloaded");
  //     var customStartTime = new Date().getSeconds();
  //   } else {
  //     console.info("This page is not reloaded");
  //   }

  // startTime = customStartTime || parseInt(localStorage.getItem('startTime') || Date.now());
  // NEED TO FIX TIME PART

  //   var total_time_spent = (function () {
  //     "use strict";
  //     // var secondsSpentElement = document.getElementById("seconds-spent");
  //     // var millisecondsSpentElement = document.getElementById("milliseconds-spent");
  //     requestAnimationFrame(function updateTimeSpent() {
  //       var timeNow = performance.now();
  //       var secondsSpentElement = round(timeNow / 1000 / 60);
  //       console.log("Seconds Spent>>>>>>", secondsSpentElement);
  //       requestAnimationFrame(updateTimeSpent);
  //     });
  //     var performance = window.performance,
  //       round = Math.round;
  //   })();

  // console.log('Scrollo:->>>', scroll_in_mtrs, 'meters');
  //   console.log("TimeSpent:-->>>", total_time_spent);
  //   chrome.runtime.sendMessage({ scroll: scroll_in_mtrs }, (response) => {
  //     console.log("scrollength-content_script.js", response);
  //   });
});
