export default class UserInterface {
  private projectCount = document.querySelector("#project-count") as HTMLDivElement;
  private projectList = document.querySelector("#projects") as HTMLDivElement;

  private sourceRepoLinks = document.querySelectorAll("[data-source-code-url]");
  private sourceLiveDemos = document.querySelectorAll("[data-live-demo-url]");

  constructor() {
    this.ini();
  }

  private ini() {
    this.setProjectCount();
    this.setURLEvents();
  }

  /** @description Sets the number of projects in the project count */
  private setProjectCount() {
    this.projectCount.textContent = `${this.projectList.childElementCount}`;
  }

  /** @description Adds URLs interractions to buttons */
  private setURLEvents() {
    if (this.sourceLiveDemos !== null) {
      for (const linkedElement of this.sourceLiveDemos) {
        linkedElement.addEventListener("click", () => {
          this.handleURLClick(linkedElement, "data-live-demo-url");
        });
      }
    }

    if (this.sourceRepoLinks !== null) {
      for (const linkedElement of this.sourceRepoLinks) {
        linkedElement.addEventListener("click", () => {
          this.handleURLClick(linkedElement, "data-source-code-url");
        });
      }
    }
  }

  /** @description Handles the opening of a new window containing the target URL */
  private handleURLClick(element: Element, target: string) {
    const attributeValue = element.getAttribute(target);
    if (!attributeValue) return;

    const attributeURL = new URL(attributeValue);
    window.open(attributeURL);
  }
}
