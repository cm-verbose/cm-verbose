import UserInterface from "./module/UserInterface.js";
class Main {
  constructor() {
    this.SERVICE_WORKER_PATH = "./sw.js";
    this.ini();
    this.setupServiceWorker();
  }
  ini() {
    new UserInterface();
  }
  /** @description Instantiates service worker */
  setupServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register(this.SERVICE_WORKER_PATH);
      });
    }
  }
}
new Main();
