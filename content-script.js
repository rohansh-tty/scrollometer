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

  let host = window.location.hostname;

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

    chrome.runtime.sendMessage({scroll: scroll_value, host: host_name}, (scroll_value) => {
      console.log("scroll value", scroll_value)
    })

    if (error) console.log("error: ", select_error);
  });

});
