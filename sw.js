const CACHE_NAME = "stpr-v4";

const urlsToCache = [
  "/",
  "/index.html",

  "/assets/css/style.css",
  "/assets/js/main.js",

  "/assets/img/logo.png",
  "/assets/img/icon-192.png",
  "/assets/img/icon-512.png"
];

// インストール
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );

  self.skipWaiting();
});

// 古いキャッシュ削除
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      console.log(keys);
      return Promise.all(
        keys.map(key => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});

// リクエスト処理
self.addEventListener("fetch", event => {

  const url = new URL(event.request.url);

  // HTMLは常に最新を取得
  if (
    event.request.mode === "navigate" ||
    url.pathname.endsWith(".html")
  ) {

    event.respondWith(
      fetch(event.request)
        .then(response => {
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );

    return;
  }

  // CSS・JS・画像はキャッシュ優先
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) {
          return cached;
        }

        return fetch(event.request)
          .then(response => {

            if (
              response &&
              response.status === 200
            ) {
              const clone = response.clone();

              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, clone);
                });
            }

            return response;
          });
      })
  );
});
