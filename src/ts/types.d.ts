/** Corresponds to the fetched data */
interface ProjectData {
  $schema: NonNullable<string>;
  projects: Array<Required<ProjectInfo>>;
}

/** Corresponds to the information about each project */
interface ProjectInfo {
  name: NonNullable<string>;
  description: NonNullable<string>;
  links?: Array<{
    url: NonNullable<string>;
    type: ProjectLinkType;
  }>;
  tags?: [ProjectTag, ...Array<ProjectTag>];
}

/** Corresponds to the tags used for each project */
enum ProjectTags {
  Java = "java",
  Language_French = "lang-fr"
}

type ProjectTag = ProjectTags[keyof typeof ProjectTags];

enum ProjectLinkTypes {
  Github = "github"
}

type ProjectLinkType = ProjectLinkTypes[keyof typeof ProjectLinkTypes];

export { ProjectData, ProjectInfo, ProjectLinkType, ProjectTag };
