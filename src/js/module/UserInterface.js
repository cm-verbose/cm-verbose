/**
 * @description Handles interractions with the user interface
 */
export default class UserInterface {
    constructor() {
        this.projectCount = document.querySelector("#project-count");
        this.projectList = document.querySelector("#projects");
        this.sourceRepoLinks = document.querySelectorAll("[data-source-code-url]");
        this.sourceLiveDemos = document.querySelectorAll("[data-live-demo-url]");
        /* Making it slightly easier to define our targets and nodes */
        this.targetSources = [
            { nodes: this.sourceLiveDemos, target: "data-live-demo-url" },
            { nodes: this.sourceRepoLinks, target: "data-source-code-url" },
        ];
        this.targetSourceCorrespondance = new Map(this.targetSources.map((obj) => [obj.nodes, obj.target]));
        this.ini();
    }
    ini() {
        this.setProjectCount();
        this.setURLEvents();
    }
    /** @description Sets the number of projects in the project count */
    setProjectCount() {
        this.projectCount.textContent = this.projectList.childElementCount.toString(10);
    }
    /** @description Adds URLs interractions to buttons */
    setURLEvents() {
        for (const [targetNodes, linkType] of this.targetSourceCorrespondance) {
            this.handleURLEvent(targetNodes, linkType);
        }
    }
    /** @description Add navigation event for each element of a NodeList */
    handleURLEvent(targets, linkType) {
        if (targets === null)
            return;
        for (const linkedElement of targets) {
            linkedElement.addEventListener("click", () => {
                this.handleURLClick(linkedElement, linkType);
            });
        }
    }
    /** @description Handles the opening of a new window containing the target URL */
    handleURLClick(element, linkType) {
        const attributeValue = element.getAttribute(linkType);
        if (!attributeValue)
            return;
        const attributeURL = new URL(attributeValue);
        window.open(attributeURL);
    }
}
