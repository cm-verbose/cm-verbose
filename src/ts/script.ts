import UserInterface from "./module/UserInterface.js";

class Main {
  private SERVICE_WORKER_PATH = "./sw.js" as const;

  constructor() {
    this.ini();
    this.setupServiceWorker();
  }

  private ini() {
    new UserInterface();
  }

  /** @description Instantiates service worker */
  private setupServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register(this.SERVICE_WORKER_PATH);
      });
    }
  }
}

new Main();
