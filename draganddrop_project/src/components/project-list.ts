import { AutoBindThis } from "../decorators/autobind";
import { DragTarget } from "../models/drag-drop";
import { Project, ProjectStatus } from "../models/project";
import { projectState } from "../state/project-state";
import Component from "./base-component";
import { ProjectItem } from "./project-item";

// project list
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];
  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];
    this.renderContent();
    this.configure();
  }

  private renderProjects() {
    const listId = `${this.type}-projects-list`;
    const listEl = document.getElementById(listId)! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjObj of this.assignedProjects) {
      new ProjectItem(this.elementToInsert.querySelector("ul")!.id, prjObj);
    }
  }

  protected renderContent() {
    let listId = `${this.type}-projects-list`;
    this.elementToInsert.querySelector("ul")!.id = listId;

    this.elementToInsert.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }
  @AutoBindThis
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer?.types[0] === "text/plain") {
      event.preventDefault();
      const ulEl = this.elementToInsert.querySelector("ul")!;
      ulEl?.classList.add("droppable");
    }
  }

  @AutoBindThis
  dropHandler(event: DragEvent): void {
    const currentProjectId = event.dataTransfer?.getData("text/plain");
    projectState.moveProject(
      currentProjectId!,
      this.type === "active" ? ProjectStatus.active : ProjectStatus.finished
    );
  }

  @AutoBindThis
  dragLeaveHandler(event: DragEvent): void {
    const ulEl = this.elementToInsert.querySelector("ul")!;
    ulEl?.classList.remove("droppable");
  }

  protected configure() {
    this.elementToInsert.addEventListener("dragover", this.dragOverHandler);
    this.elementToInsert.addEventListener("dragleave", this.dragLeaveHandler);
    this.elementToInsert.addEventListener("drop", this.dropHandler);
    projectState.addListeners((project: Project[]) => {
      const projectType = project.filter((project) => {
        if (this.type === "active") {
          return project.projectStatus === ProjectStatus.active;
        }
        return project.projectStatus === ProjectStatus.finished;
      });
      this.assignedProjects = projectType;

      this.renderProjects();
    });
  }
}
