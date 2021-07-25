// self.addEventListener("push", function(e) {
//   data = e.data.json();
//   var options = {
//     body: data.notification.body,
//     icon: data.notification.icon,
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: "2"
//     }
//   };
// });

importScripts("https://www.gstatic.com/firebasejs/5.6.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.6.0/firebase-messaging.js");

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  new RegExp(
    "https://firebasestorage.googleapis.com/v0/b/otra-vez-hn.appspot.com/.*"
  ),
  workbox.strategies.staleWhileRevalidate()
);

this.$fire.initializeApp({
  messagingSenderId: process.env.SENDER_ID
});

const messaging = this.$fire.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png"
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
