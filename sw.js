// Service worker: rende l'app disponibile offline quando è pubblicata su un sito (https).
// Aggiornando le librerie in lib/, incrementare VERSION per distribuirle.
const VERSION = 'posturale-v1';
const FILES = [
    'postura.html',
    'manifest.webmanifest',
    'icons/icon-192.png',
    'icons/icon-512.png',
    'icons/icon.svg',
    'lib/fontawesome/css/all.min.css',
    'lib/fontawesome/webfonts/fa-brands-400.woff2',
    'lib/fontawesome/webfonts/fa-regular-400.woff2',
    'lib/fontawesome/webfonts/fa-solid-900.woff2',
    'lib/fontawesome/webfonts/fa-v4compatibility.woff2',
    'lib/fonts/JTUSjIg69CK48gW7PXoo9WdhyyTh89ZNpQ.woff2',
    'lib/fonts/JTUSjIg69CK48gW7PXoo9WlhyyTh89Y.woff2',
    'lib/fonts/fonts.css',
    'lib/fonts/rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu0-K6z9mXg.woff2',
    'lib/fonts/rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu6-K6z9mXgjU0.woff2',
    'lib/fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDV30TGcro9o45zw.woff2',
    'lib/fonts/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDV36TGcro9o45zyRbg.woff2',
    'lib/fonts/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx7cwgknk-6nFg.woff2',
    'lib/fonts/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwgknk-4.woff2',
    'lib/html2canvas.min.js',
    'lib/jspdf.plugin.autotable.min.js',
    'lib/jspdf.umd.min.js',
    'lib/pdf.min.js',
    'lib/pdf.worker.min.js',
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

// Pagina: prima la rete (aggiornamenti immediati), poi la copia offline.
// Librerie e icone: prima la copia offline; il resto viene salvato al primo utilizzo.
self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;
    const isPage = e.request.mode === 'navigate' || new URL(e.request.url).pathname.endsWith('.html');
    if (isPage) {
        e.respondWith(
            fetch(e.request)
                .then(res => {
                    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); }
                    return res;
                })
                .catch(() => caches.match(e.request, { ignoreSearch: true }).then(hit => hit || caches.match('postura.html')))
        );
        return;
    }
    // File non precaricati (es. modello di rilevamento, ~21 MB): salvati al primo utilizzo
    e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
        if (res.ok && new URL(e.request.url).origin === self.location.origin) {
            const copy = res.clone();
            caches.open(VERSION).then(c => c.put(e.request, copy));
        }
        return res;
    })));
});
