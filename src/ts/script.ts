import UserInterface from "./module/UserInterface.js";

class Main {
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
        navigator.serviceWorker.register("./sw.js");
      });
    }
  }
}

new Main();
