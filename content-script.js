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
    console.log("Signed in....", supabaseClient.auth.user());

    chrome.storage.local.set({ user_id_sm: session.user.id });
    chrome.storage.local.set({ session_expiry: session.expires_at * 1000 });
  } else if ("SIGNED_OUT" === event) {
    console.log("Signed out....");

    chrome.storage.local.set({ user_id_sm: null });
  }
});

document.addEventListener("scroll", function () {
  console.log("[CS] Scrolling..");
  let scrollY = window.scrollY;
  maxScrollY = Math.max(scrollY, maxScrollY);
  let host = window.location.hostname;

  console.log("host: ", host);

  chrome.storage.local.get(["scroll", "user_id_sm"], async function (result) {
    let obj = result.scroll;
    obj[host] = maxScrollY;
    chrome.storage.local.set({ scroll: obj });

    var date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

    console.log("result.user_id_sm: ", result.user_id_sm);

    if (result.user_id_sm) {
      console.log("date: ", date);

      const { data, error } = await supabaseClient.from("Scroll").upsert([
        {
          session_id: host + "#" + date,
          user_id: result.user_id_sm,
          host: host,
          scroll_value: maxScrollY,
          created_date: date,
        },
      ]);
      // if (data) console.log("data: ", data);
      if (error) console.log("error: ", error);
    } else {
      // TODO: Handle this case
    }

    // let { data: Scroll, select_error } = await supabaseClient
    //   .from("Scroll")
    //   .select("*")
    //   .eq("host", host);

    // // console.log("data: ", Scroll);

    // scroll_value = Scroll[0].scroll_value;
    // host_name = Scroll[0].host;

    // // get the start time, concat date with time
    // start_time = Scroll[0].created_at;
    // session_id = Scroll[0].session_id;
    // date = session_id.split("#")[1];
    // start_datetime = date.concat(" ", start_time);

    // // get current date, concat date with time, using UTC time for easy calculations
    // var curr_date = new Date();
    // // to subtract timezone offset
    // curr_date.setMinutes(
    //   curr_date.getMinutes() + curr_date.getTimezoneOffset()
    // );

    // var dmy =
    //   curr_date.getDate() +
    //   "/" +
    //   curr_date.getMonth() +
    //   "/" +
    //   curr_date.getYear();
    // var curr_datetime = curr_date.toString();

    // // to convert str to Date format
    // var current = new Date(curr_datetime);
    // var start = new Date(start_datetime);

    // // get values in hh:mm:ss format
    // var milliseconds = current.getTime() - start.getTime();

    // if (select_error) console.log("error: ", select_error);

    // chrome.runtime.sendMessage(
    //   { scroll: scroll_value, host: host_name, time_spent: milliseconds },
    //   (scroll_value, host_name) => {}
    // );
  });
});
