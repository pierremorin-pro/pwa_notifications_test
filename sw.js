self.addEventListener('install', event => {
    console.log('Service Worker installé');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('Service Worker activé');
});

self.addEventListener('push', event => {
    const data = event.data ? event.data.text() : 'Notification sans contenu';
    event.waitUntil(
        self.registration.showNotification('Notification PWA', {
            body: data,
            icon: 'icon-192.png'
        })
    );
});