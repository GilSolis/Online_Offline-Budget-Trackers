const cacheName = 'v2';
const cacheFiles = [
    "/",
    "index.html",
    "styles.css",
    "index.js"
];




//Call install Event
self.addEventListener('install', e => {
    console.log("Service Worker: Installed");
    e.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheFiles);
                console.log("past caching")
            })
            .then(() => self.skipWaiting())
    );
});

// Call activate event
self.addEventListener('activate', e => {
    console.log('service working: activated');
    //remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker:Clearing old Cache');
                        return caches.delete(cache);
                    }

                })
            )
        })
    )
});

// call fetch event
self.addEventListener('fetch', e => {
    console.log('service worker: fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
})
