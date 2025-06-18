self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("minimo").then(cache => cache.addAll([
      "index.html", "manifest.json", "swipe.js", "main.js", "icon.png"
    ]))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});