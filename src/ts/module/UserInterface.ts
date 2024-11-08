/**
 * @description Handles interractions with the user interface
 */

import { CorrespondanceMap, TargetsArray, URLTargetType } from "../types";

export default class UserInterface {
  private projectCount = document.querySelector("#project-count") as HTMLDivElement;
  private projectList = document.querySelector("#projects") as HTMLDivElement;

  private sourceRepoLinks = document.querySelectorAll("[data-source-code-url]");
  private sourceLiveDemos = document.querySelectorAll("[data-live-demo-url]");

  /* Making it slightly easier to define our targets and nodes */
  private targetSources: TargetsArray = [
    { nodes: this.sourceLiveDemos, target: "data-live-demo-url" },
    { nodes: this.sourceRepoLinks, target: "data-source-code-url" },
  ];
  private targetSourceCorrespondance: CorrespondanceMap = new Map(
    this.targetSources.map((obj) => [obj.nodes, obj.target])
  );

  constructor() {
    this.ini();
  }

  private ini() {
    this.setProjectCount();
    this.setURLEvents();
  }

  /** @description Sets the number of projects in the project count */
  private setProjectCount() {
    this.projectCount.textContent = this.projectList.childElementCount.toString(10);
  }

  /** @description Adds URLs interractions to buttons */
  private setURLEvents() {
    for (const [targetNodes, linkType] of this.targetSourceCorrespondance) {
      this.handleURLEvent(targetNodes, linkType);
    }
  }

  /** @description Add navigation event for each element of a NodeList */
  private handleURLEvent(targets: NodeListOf<Element>, linkType: URLTargetType) {
    if (targets === null) return;
    for (const linkedElement of targets) {
      linkedElement.addEventListener("click", () => {
        this.handleURLClick(linkedElement, linkType);
      });
    }
  }

  /** @description Handles the opening of a new window containing the target URL */
  private handleURLClick(element: Element, linkType: URLTargetType) {
    const attributeValue = element.getAttribute(linkType);
    if (!attributeValue) return;

    const attributeURL = new URL(attributeValue);
    window.open(attributeURL);
  }
}
