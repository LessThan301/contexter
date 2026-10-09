// Kill switch for the service worker that Contexter (now Synoikon) installed at /contexter/.
// Browsers re-check /contexter/sw.js on their own; this version clears Contexter's caches,
// unregisters itself and moves any open windows to the same page under /synoikon/.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith('contexter-')) await caches.delete(key);
    await self.clients.claim(); // take over open /contexter/ windows so they can be navigated
    for (const client of await self.clients.matchAll({ type: 'window', includeUncontrolled: true })) {
      const url = new URL(client.url);
      url.pathname = url.pathname.replace(/^\/contexter(\/|$)/i, '/synoikon/');
      await client.navigate(url.href).catch(() => {});
    }
    await self.registration.unregister();
  })());
});
