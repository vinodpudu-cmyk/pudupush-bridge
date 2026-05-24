importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBCBuEq-OWw7aZnc1kMrjvd1oatFqUYGUU",
    authDomain: "push-2d47c.firebaseapp.com",
    projectId: "push-2d47c",
    storageBucket: "push-2d47c.firebasestorage.app",
    messagingSenderId: "911235507971",
    appId: "1:911235507971:web:ff7d4af6210bc59bdf2b36"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// ಹಿನ್ನೆಲೆಯಲ್ಲಿ ನೋಟಿಫಿಕೇಶನ್ ಬಂದಾಗ ಮೊಬೈಲ್ ಸ್ಕ್ರೀನ್ ಮೇಲೆ ತೋರಿಸುವ ಲಾಜಿಕ್
messaging.onBackgroundMessage(function(payload) {
  console.log('Background Message Received: ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || 'https://resources.blogblog.com/img/icon_missing.gif',
    data: { click_action: payload.data.click_action }
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// ನೋಟಿಫಿಕೇಶನ್ ಕ್ಲಿಕ್ ಮಾಡಿದಾಗ ಗ್ರಾಹಕರ ಸುದ್ದಿ ವೆಬ್ ಸೈಟ್ ಓಪನ್ ಮಾಡುವ ಲಾಜಿಕ್
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const targetUrl = event.notification.data.click_action || '/';
  
  event.waitUntil(
    clients.openWindow(targetUrl)
  );
});
