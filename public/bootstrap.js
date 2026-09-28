if ('serviceWorker' in navigator) {
  addEventListener('load', () => navigator.serviceWorker.register('/sw.js').then(r => r.update()).catch(() => {}));
}
