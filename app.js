// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => {
        console.log('Service Worker enregistré');
    });
}

// Gestion du bouton d'installation
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
});

installBtn.addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
        console.log('Résultat:', choice.outcome);
        deferredPrompt = null;
        installBtn.style.display = 'none';
    });
});

// Bouton pour envoyer une notification
document.getElementById('notifyBtn').addEventListener('click', async () => {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then(reg => {
            reg.showNotification('Hello depuis la PWA !');
        });
    } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            navigator.serviceWorker.getRegistration().then(reg => {
                reg.showNotification('Hello depuis la PWA !');
            });
        }
    }
});