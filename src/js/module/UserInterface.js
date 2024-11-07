export default class UserInterface {
    constructor() {
        this.projectCount = document.querySelector("#project-count");
        this.projectList = document.querySelector("#projects");
        this.sourceRepoLinks = document.querySelectorAll("[data-source-code-url]");
        this.sourceLiveDemos = document.querySelectorAll("[data-live-demo-url]");
        this.ini();
    }
    ini() {
        this.setProjectCount();
        this.setURLEvents();
    }
    /** @description Sets the number of projects in the project count */
    setProjectCount() {
        this.projectCount.textContent = `${this.projectList.childElementCount}`;
    }
    /** @description Adds URLs interractions to buttons */
    setURLEvents() {
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
    handleURLClick(element, target) {
        const attributeValue = element.getAttribute(target);
        if (!attributeValue)
            return;
        const attributeURL = new URL(attributeValue);
        window.open(attributeURL);
    }
}
