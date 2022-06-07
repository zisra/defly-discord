function listen() {
  let first = document.getElementById("chat-history")?.lastChild?.textContent;
  var mutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        first !== document.getElementById("chat-history").lastChild.textContent
      ) {
        console.log(
          document.getElementById("chat-history").lastChild.textContent
        );
        const notif = new Notification(
          document.getElementById("chat-history").lastChild.textContent,
          {
            badge: "https://defly.io/favicon/android-icon-192x192.png",
          }
        );
        first = document.getElementById("chat-history").lastChild.textContent;
        setTimeout(() => notif.close(), 1000);
      }
    });
  });
  mutationObserver.observe(document.getElementById("chat-history"), {
    childList: true,
  });
}
if (!("Notification" in window)) {
  alert("This browser does not support desktop notifications");
} else if (Notification.permission === "granted") {
  listen();
} else if (Notification.permission !== "denied") {
  Notification.requestPermission().then(function (permission) {
    if (permission === "granted") {
      listen();
    }
  });
} else {
  alert("Please enable desktop notifications for this site");
}
