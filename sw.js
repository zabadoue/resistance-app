// Service worker de « Résistance » — garantit la MISE À JOUR AUTOMATIQUE de la PWA.
//
// Stratégie :
//   • Navigations / HTML  → NETWORK-FIRST : on va TOUJOURS chercher le dernier
//     index.html sur le réseau (donc la dernière version du jeu). Repli sur le
//     cache seulement si hors-ligne. C'est ce qui fait qu'un correctif apparaît
//     dès l'ouverture suivante, sans réinstaller.
//   • Assets hashés (index-XXXX.js, images…) → CACHE-FIRST : leur nom change à
//     chaque build, donc le cache ne peut jamais être « périmé » → chargement
//     instantané + hors-ligne.
//
// Bump CACHE à chaque changement de stratégie pour purger les vieux caches.
const CACHE = 'resistance-v1';

self.addEventListener('install', () => {
  // Le nouveau SW prend la main sans attendre la fermeture des onglets.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();   // contrôle immédiatement les pages déjà ouvertes
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // laisse passer les polices Google, etc.

  const isDoc = req.mode === 'navigate'
    || url.pathname.endsWith('/')
    || url.pathname.endsWith('.html')
    || url.pathname.endsWith('.webmanifest');

  if (isDoc) {
    // NETWORK-FIRST : la dernière version prime, cache = filet de secours hors-ligne.
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: 'no-store' });
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      } catch {
        return (await caches.match(req))
          || (await caches.match('./index.html'))
          || Response.error();
      }
    })());
    return;
  }

  // CACHE-FIRST pour les assets immuables (noms hashés).
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    const fresh = await fetch(req);
    if (fresh && fresh.ok) {
      const cache = await caches.open(CACHE);
      cache.put(req, fresh.clone());
    }
    return fresh;
  })());
});
