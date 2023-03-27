const addResourcesToCase = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(addResourcesToCase(["/", "/index.html", "/bundle.js"]));
});
