export enum ProjectStatus {
  active,
  finished,
}
export class Project {
  constructor(
    public projectId: string,
    public title: string,
    public description: string,
    public numOfPeople: number,
    public projectStatus: ProjectStatus
  ) {}
}
