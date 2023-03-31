const CACHE_VERSION = 2;

const addResourcesToCase = async (resources) => {
    const cache = await caches.open(`static-v${CACHE_VERSION}`);
    await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
    event.waitUntil(addResourcesToCase(["/", "/index.html", "/bundle.js"]));
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keyList) =>
            Promise.all(
                keyList.map((key) => {
                    if (key !== `static-v${CACHE_VERSION}` && key !== `dynamic-v${CACHE_VERSION}`) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
});

const findResponseOrFetchAndPut = async (event) => {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
        return cachedResponse;
    }
    const fetchResponse = await fetch(event.request);
    const cache = await caches.open(`dynamic-v${CACHE_VERSION}`);
    await cache.put(event.request.url, fetchResponse.clone());
    return fetchResponse;
};

self.addEventListener("fetch", (event) => {
    event.respondWith((async () => await findResponseOrFetchAndPut(event))());
});
