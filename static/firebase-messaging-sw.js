
importScripts(
  'https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js'
)
firebase.initializeApp({"apiKey":"AIzaSyAq-KAKHh9BQqVXw40ZiJGwHtKd4DIr9AQ","authDomain":"otra-vez-hn.firebaseapp.com","projectId":"otra-vez-hn","storageBucket":"otra-vez-hn.appspot.com","messagingSenderId":"637150103756","appId":"1:637150103756:web:980e30634fdcbdd58a5a69","measurementId":"G-WEPL28H3V4"})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

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

firebase.initializeApp({
  messagingSenderId: process.env.SENDER_ID
});

const messaging = firebase.messaging();

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
