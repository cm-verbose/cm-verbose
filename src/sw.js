class ServiceWorker {
  pfx = "[Service Worker]";
  cacheName = "Assets";

  assetsPath = [
    "./js/script.js",
    "./js/module/UserInterface.js",
    "./font/Work_Sans/Work_Sans_Variable", 
    "./font/Work_Sans/Work_Sans_Italic.ttf", 
    "./css/style.css",
    "./svg/js.svg",
    "./svg/github.svg",
    "./index.html"
  ];

  constructor() {
    this.ini();
  }

  ini() {
    this.handleInstall();
    this.handleFetch();
  }

  /** @description handles service worker registration */
  handleInstall() {
    self.addEventListener("install", (e) => {
      this.info(`Installed`);
      e.waitUntil(
        (async () => {
          const cache = await caches.open(this.cacheName);
          this.info(`Caching ressources...`);
          cache.addAll(this.assetsPath);
        })()
      );
    });
  }

  /** @description handles http fetches of the ressources */
  handleFetch() {
    self.addEventListener("fetch", (e) => {
      if (e.request.url.startsWith("chrome-extension://")) return;

      e.respondWith(
        (async () => {
          const req = await caches.match(e.request);
          this.info(`Fetching ${e.request}`);
          if (req) {
            return req;
          }
          const response = await fetch(e.request);
          const cache = await caches.open(this.cacheName);
          this.info(`Caching new ressources : ${e.request.url}`);
          cache.put(e.request, response.clone());
          return response;
        })()
      );
    });
  }

  info(content) {
    console.log(`${this.pfx} ${content}`);
  }
}

new ServiceWorker();
