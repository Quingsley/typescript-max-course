// PROJECT STATE MANAGEMENT

import { Project, ProjectStatus } from "../models/project";

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];
  addListeners(listeners: Listener<T>) {
    this.listeners.push(listeners);
  }
}
export class ProjectState extends State<Project> {
  private static instance: ProjectState;

  private projectList: Project[] = [];
  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.active
    );
    this.projectList.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, projectStatus: ProjectStatus) {
    const project = this.projectList.find((prj) => prj.projectId === projectId);
    if (project && project.projectStatus !== projectStatus) {
      project.projectStatus = projectStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFunc of this.listeners) {
      listenerFunc(this.projectList.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();
