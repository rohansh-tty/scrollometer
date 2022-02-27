const supabaseClient = supabase.createClient(
    "https://iwnluhqtlcmaxrgbkyrk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzA4NDYxOCwiZXhwIjoxOTUyNjYwNjE4fQ.6OfnqomnPQUwbuXYs_T9IwZ3qfSRzVFzyTD9pFfrp6I"
);

chrome.storage.local.get("user_id_sm", async({ user_id_sm }) => {
    if (user_id_sm) {
        chrome.tabs.query({ active: true, currentWindow: true },
            async function(tabs) {
                let { host } = new URL(tabs[0].url);
                console.log("host: ", tabs);

                const { data, error } = await supabaseClient
                    .from("Scroll")
                    .select()
                    .eq("user_id", user_id_sm)
                    .eq("host", host);

                const endTime = new Date();
                const startTime = new Date(data[0].created_time);
                const totalTime = endTime - startTime;

                const speed = data[0].scroll_value * 2.6458335e-7;

                const scroll_element = document.getElementById("scroll-value");
                const speed_element = document.getElementById("speed-value");
                const host_element = document.getElementById("host-name");
                const time_box_element = document.getElementById("time-value");

                scroll_element.innerHTML = data[0].scroll_value;
                host_element.innerHTML = host;
                time_box_element.innerHTML = msToTime(totalTime);
                speed_element.innerHTML = round(speed, 2);
            }
        );
    } else {
        console.log('login please.....')
    }
});

function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}