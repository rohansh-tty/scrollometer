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
    console.log('scorll y', maxScrollY)
    obj[host] = maxScrollY;

    // console.log("obj: ", obj);

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

    // console.log('upsert data', data)


    let { data: Scroll, select_error } = await supabaseClient.from('Scroll').select('*').eq('host', host);
    console.log('read_data', data);

    scroll_value = data[0].scroll_value;

    chrome.runtime.sendMessage(scroll_value, (scroll_value) => {
      console.log("scroll value", scroll_value)
    })

    if (error) console.log("error: ", select_error);
  });

});
