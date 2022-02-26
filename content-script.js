var scrollLength = [0];
var myHeaders = new Headers();
var timeStampArray = [0];

var maxScrollY = 0;
console.log("Inside content_script.js");

const supabaseClient = supabase.createClient(
  "https://iwnluhqtlcmaxrgbkyrk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzA4NDYxOCwiZXhwIjoxOTUyNjYwNjE4fQ.6OfnqomnPQUwbuXYs_T9IwZ3qfSRzVFzyTD9pFfrp6I"
);

supabaseClient.auth.onAuthStateChange((event, session) => {
  if ("SIGNED_IN" === event) {
    chrome.runtime.sendMessage("set_user_id");
  }
});

document.addEventListener("scroll", function () {
  console.log("[CS] Scrolling..");
  let scrollY = window.scrollY;

  // making sure that reverse scrolling doesn't eat down
  lastscroll = scrollLength.slice(-1)[0];
  if (scrollY > lastscroll) {
    scrollLength.push(scrollY);
  }

  console.log("scrollY", scrollY, "maxscrollY", maxScrollY);
  // max can be Math.max(scrollY, maxScrollY) or Math.max.apply(Math, scrollLength)
  maxScrollY = Math.max.apply(Math, scrollLength) * 0.2646;
  scroll_value = Math.round(maxScrollY);
  let host = window.location.hostname;

  console.log("host: ", host);

  chrome.storage.local.get(["scroll", "user_id_sm"], async function (result) {
    // let obj = result.scroll;
    // obj[host] = scroll_value; // 1inch=96px, 1inch=25.4mm, mm=px*(25.4/96)
    // chrome.storage.local.set({ scroll: obj });

    var date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

    console.log("result.user_id_sm: ", result.user_id_sm);

    if (result.user_id_sm) {
      console.log("date: ", date);

      // const endTime = new Date();
      // const startTime = new Date(data[0].created_time);
      // const totalTime = endTime - startTime;

      const { data, error } = await supabaseClient.from("Scroll").upsert([
        {
          session_id: host + "#" + date,
          user_id: result.user_id_sm,
          host: host,
          scroll_value: maxScrollY,
          created_date: date,
          updated_time: new Date().toISOString()
          // total_time: totalTime
        },
      ]);
      // if (data) console.log("data: ", data);
      if (error) console.log("error: ", error);
    } else {
      // TODO: Handle this case
    }
  });
});
