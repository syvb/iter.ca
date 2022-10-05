const V = 1;
const CACHE = `cache-${V}`;

self.addEventListener("install", event =>
    event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(["/now/", "/now"])))
);

// stale-while-revalidate
// https://web.dev/offline-cookbook/#stale-while-revalidate
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.open(CACHE).then(cache =>
            cache.match(event.request).then(res => {
                const fetchPromise = fetch(event.request).then(function (networkResponse) {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
                return res || fetchPromise;
            })
        )
    )
});
