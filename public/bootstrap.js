if ('serviceWorker' in navigator) {
  addEventListener('load', () => navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'}).then(r => r.update()).catch(() => {}));
}
