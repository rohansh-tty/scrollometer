console.log("Inside popup.js");

chrome.storage.local.get(["scroll"], function (result) {
  console.log("result: ", result.scroll);
  let values = Object.values(result.scroll);

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
