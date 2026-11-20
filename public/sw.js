const CACHE_PREFIX = "chinese-compass-static-";
const CACHE = `${CACHE_PREFIX}v3`;
const OFFLINE = "/offline.html";
const NAVIGATE_URLS = [
  "/",
  "/dashboard",
  "/vocab",
  "/grammar",
  "/reading",
  "/writing",
  "/writing-practice",
  "/dictation",
  "/reflex",
  "/shadowing",
  "/speaking",
  "/pinyin",
  "/plan",
  "/roadmap",
  "/leaderboard",
  "/offline.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll([OFFLINE, ...NAVIGATE_URLS])).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE).map(key => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, copy)).catch(() => undefined);
        }
        return response;
      }).catch(async () => {
        const cache = await caches.open(CACHE);
        const cached = await cache.match(request);
        if (cached) return cached;
        return (await cache.match(OFFLINE)) ?? Response.error();
      }),
    );
    return;
  }

  const cacheable =
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icon") ||
    url.pathname === "/manifest.webmanifest" ||
    NAVIGATE_URLS.includes(url.pathname);

  if (!cacheable) return;

  event.respondWith(
    caches.open(CACHE).then(async cache => {
      const hit = await cache.match(request);
      if (hit) return hit;
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone()).catch(() => undefined);
        return response;
      } catch {
        return hit ?? Response.error();
      }
    }),
  );
});
