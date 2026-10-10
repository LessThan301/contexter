// Kill switch for the service worker that Contexter (now Synoikon, https://synoikon.com) installed at
// lessthan301.github.io/contexter/. Browsers re-check /contexter/sw.js on their own; this version deletes the
// old app's caches on this origin, moves open /contexter/ windows to the same page on synoikon.com and
// unregisters itself.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // contexter-*: the original app; synoikon-*: the app while it lived at lessthan301.github.io/synoikon/
    // (synoikon-preview-*: the live preview at lessthan301.github.io/synoikon-preview/, kept)
    for (const key of await caches.keys()) if (/^contexter-|^synoikon-(?!preview-)/.test(key)) await caches.delete(key);
    await self.clients.claim(); // take over open /contexter/ windows so they can be navigated
    for (const client of await self.clients.matchAll({ type: 'window', includeUncontrolled: true })) {
      const url = new URL(client.url);
      if (!/^\/contexter(\/|$)/i.test(url.pathname)) continue; // leave other tabs alone
      const rest = url.pathname.replace(/^\/contexter/i, '') || '/';
      await client.navigate('https://synoikon.com' + rest + url.search + url.hash).catch(() => {});
    }
    await self.registration.unregister();
  })());
});
