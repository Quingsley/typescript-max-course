import { AutoBindThis } from "../decorators/autobind";
import { Draggable } from "../models/drag-drop";
import { Project } from "../models/project";
import Component from "./base-component";

// project item
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;
  get persons() {
    if (this.project.numOfPeople === 1) {
      return "1 person";
    }
    return `${this.project.numOfPeople} persons`;
  }
  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.projectId);
    this.project = project;
    this.configure();
    this.renderContent();
  }
  @AutoBindThis
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer?.setData("text/plain", this.project.projectId);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(_: DragEvent): void {
    console.log("drag");
  }
  protected configure() {
    this.elementToInsert.addEventListener("dragstart", this.dragStartHandler);
    this.elementToInsert.addEventListener("dragend", this.dragEndHandler);
  }
  protected renderContent() {
    this.elementToInsert.querySelector("h2")!.textContent = this.project.title;
    this.elementToInsert.querySelector("h3")!.textContent =
      this.persons + " assigned";
    this.elementToInsert.querySelector("p")!.textContent =
      this.project.description;
  }
}
