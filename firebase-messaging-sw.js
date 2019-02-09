importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');   
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

 firebase.initializeApp({ messagingSenderId: "654554565170" });

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) { console.log('[firebase-messaging-sw.js] Received background message ', payload); // Customize notification here var notificationTitle = 'Background Message Title'; var notificationOptions = { body: 'Background Message body.', icon: '/firebase-logo.png' };

return self.registration.showNotification(notificationTitle,
    notificationOptions);
});


self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();
  const promiseChain = clients
      .matchAll({
          type: 'window',
          includeUncontrolled: true
       })
      .then(windowClients => {
          let matchingClient = null;
          for (let i = 0; i < windowClients.length; i++) {
              const windowClient = windowClients[i];
              if (windowClient.url === feClickAction) {
                  matchingClient = windowClient;
                  break;
              }
          }
          if (matchingClient) {
              return matchingClient.focus();
          } else {
              return clients.openWindow(feClickAction);
          }
      });
      event.waitUntil(promiseChain);
});
