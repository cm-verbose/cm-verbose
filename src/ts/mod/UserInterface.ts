import { ProjectData, ProjectInfo, ProjectLinkType, ProjectTag } from "../types";

/** Interractions with the user interface */
export default class UserInterface {
  private static PROJECT_URL = "/data/projects.json" as const;
  private projectList = document.querySelector("#project-list") as HTMLDivElement;
  private projectCounter = document.querySelector("#result-count") as HTMLDivElement;
  private searchInput = document.querySelector("#search-input") as HTMLInputElement;
  private githubLink = document.querySelector("#github") as HTMLDivElement;

  constructor() {
    this.setupProjects();
    this.githubLink.addEventListener("click", () => {
      window.location.href = "https://github.com/cm-verbose/";
    });
  }

  /** Sets up the projects elements */
  private async setupProjects() {
    const data = await this.getProjectData();

    if (!data) return;
    for (const project of data.projects) {
      this.createProjectElement(project);
    }
    this.setSearchEvents(data.projects);
    this.setCount(data.projects);
  }

  /** Fetch a .json file containing project information */
  private async getProjectData(): Promise<ProjectData | undefined> {
    const projectsURL = new URL(`${window.location.origin}${UserInterface.PROJECT_URL}`);
    try {
      const request = await fetch(projectsURL);
      const json = await request.json();
      return json as ProjectData;
    } catch (err) {
      console.error(`[Projects]: Failed fetching from ${projectsURL}`);
    }
  }

  /** Creating the project elements */
  private createProjectElement(project: Required<ProjectInfo>) {
    const element = document.createElement("div");
    element.setAttribute("class", "project");

    const title = document.createElement("h3");
    title.innerText = project.name;

    const description = document.createElement("p");
    description.textContent = project.description;

    const tagList = document.createElement("div");
    tagList.setAttribute("class", "project-tags");
    const tagElements = this.determineTags(project.tags);

    for (const tag of tagElements) {
      tagList.appendChild(tag);
    }

    const links = this.determineLinks(project.links);
    for (const link of links) {
      tagList.appendChild(link);
    }

    element.append(title, description, tagList);
    this.projectList.appendChild(element);
  }

  /** Determine elements to create based on their tags */
  private determineTags(tags: [ProjectTag, ...Array<ProjectTag>]): Array<HTMLDivElement> {
    const elements: Array<HTMLDivElement> = [];
    for (const tag of tags) {
      const element = document.createElement("div");
      switch (tag.name) {
        case "java":
          {
            const img = document.createElement("img");
            img.setAttribute("src", "./svg/java.svg");
            img.alt = "java";

            const span = document.createElement("span");
            span.textContent = "Java";

            element.append(img, span);
          }
          break;

        case "lang_fr": {
          element.textContent = "French";
        }
      }
      elements.push(element);
    }
    return elements;
  }

  /** Determine the links to create */
  private determineLinks(
    links: Array<{
      url: NonNullable<string>;
      type: ProjectLinkType;
    }>
  ) {
    const linksElements: Array<HTMLDivElement> = [];
    for (const link of links) {
      const element = document.createElement("div");
      switch (link.type) {
        case "github": {
          const img = document.createElement("img");
          img.setAttribute("src", "./svg/github.svg");
          img.alt = "java";

          const span = document.createElement("span");
          span.textContent = "Github";

          element.append(img, span);
          linksElements.push(element);
        }
      }
      element.addEventListener("click", () => {
        window.location.href = `${link.url}`;
      });
    }
    return linksElements;
  }

  private setSearchEvents(arr: Array<Required<ProjectInfo>>) {
    let timer: ReturnType<typeof setTimeout>;
    this.searchInput.addEventListener("keyup", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.handleSearch(arr);
      }, 2_000);
    });

    this.searchInput.addEventListener("keydown", () => {
      clearTimeout(timer);
    });
  }

  /** Handles searching for projects based on name, description and tags */
  private handleSearch(arr: Array<Required<ProjectInfo>>) {
    const query = this.searchInput.value;
    const regex = new RegExp(`${query}`, "gi");

    const filtered = arr.filter((x) => {
      let tagMatch = false;
      for (const tag of x.tags) {
        if (tag.name.match(regex) != null) {
          tagMatch = true;
          break;
        }
      }
      return x.description.match(regex) != null || x.name.match(regex) != null || tagMatch;
    });
    this.projectList.innerHTML = "";
    for (const project of filtered) {
      this.createProjectElement(project);
    }
    this.setCount(filtered);
  }

  private setCount(arr: Array<unknown>) {
    if (arr.length === 0) {
      this.projectCounter.textContent = `No results`;
    } else if (arr.length === 1) {
      this.projectCounter.textContent = `1 result`;
    } else {
      this.projectCounter.textContent = `${arr.length} results`;
    }
  }
}
