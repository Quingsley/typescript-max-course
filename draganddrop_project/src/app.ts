// Drag and drop
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
// Project
enum ProjectStatus {
  active,
  finished,
}
class Project {
  constructor(
    public projectId: string,
    public title: string,
    public description: string,
    public numOfPeople: number,
    public projectStatus: ProjectStatus
  ) {}
}
// PROJECT STATE MANAGEMENT

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];
  addListeners(listeners: Listener<T>) {
    this.listeners.push(listeners);
  }
}
class ProjectState extends State<Project> {
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

const projectState = ProjectState.getInstance();
//Input Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validateObj: Validatable) {
  let isValid = true;
  if (validateObj.required) {
    isValid = isValid && validateObj.value.toString().length !== 0;
  }
  if (validateObj.minLength != null && typeof validateObj.value === "string") {
    isValid = isValid && validateObj.value.length >= validateObj.minLength;
  }
  if (validateObj.maxLength != null && typeof validateObj.value === "string") {
    isValid = isValid && validateObj.value.length <= validateObj.maxLength;
  }
  if (validateObj.min != null && typeof validateObj.value === "number") {
    isValid = isValid && validateObj.value >= validateObj.min;
  }
  if (validateObj.max != null && typeof validateObj.value === "number") {
    isValid = isValid && validateObj.value <= validateObj.max;
  }
  return isValid;
}
//decorator to bind this to the class
function AutoBindThis(_: any, __: string, descriptor: PropertyDescriptor) {
  const oldMethod = descriptor.value;
  const newDescriptor: PropertyDescriptor = {
    enumerable: false,
    configurable: true,
    get() {
      const boundFunc = oldMethod.bind(this);
      return boundFunc;
    },
  };
  return newDescriptor;
}

//////////////////////////////////////////////////////77777
//components
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  inputTemplate: HTMLTemplateElement;
  hostElement: T;
  elementToInsert: U;
  constructor(
    protected inputTemplateId: string,
    protected hostElId: string,
    protected whereToInsert: boolean,
    protected elToInsertId?: string
  ) {
    this.inputTemplate = document.getElementById(
      inputTemplateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElId)! as T;

    const importedNode = document.importNode(this.inputTemplate.content, true);
    this.elementToInsert = importedNode.firstElementChild! as U;
    this.elementToInsert.id = elToInsertId!;
    this.attachHTML(whereToInsert);
  }
  private attachHTML(isStart: boolean) {
    this.hostElement.insertAdjacentElement(
      isStart ? "afterbegin" : "beforeend",
      this.elementToInsert
    );
  }

  protected abstract configure(): void;
  protected abstract renderContent(): void;
}

// project item
class ProjectItem
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
// project list
class ProjectList
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

///////////////////////////////////////////////////////////
//Project input class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    super("project-input", "app", true, "user-input");

    // selecting the form input eleements
    this.titleInputElement = this.elementToInsert.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.elementToInsert.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = this.elementToInsert.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.configure();
  }
  protected renderContent(): void {}

  protected configure() {
    this.elementToInsert.addEventListener("submit", this.submitHandler);
  }

  private collectUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const numOfPeople = this.peopleInputElement.value;

    if (
      !validate({
        value: enteredTitle,
        required: true,
        maxLength: 20,
        minLength: 5,
      }) ||
      !validate({
        value: enteredDescription,
        required: true,
        maxLength: 40,
        minLength: 5,
      }) ||
      !validate({
        value: numOfPeople,
        required: true,
        max: 10,
        min: 1,
      })
    ) {
      alert("Invalid input , please try again!");
      return;
    } else {
      return [enteredTitle, enteredDescription, +numOfPeople];
    }
  }
  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @AutoBindThis
  private submitHandler(event: Event) {
    event.preventDefault();

    const userInput = this.collectUserInput();

    if (Array.isArray(userInput)) {
      this.clearInputs();
      const [title, description, numOfPeople] = userInput;
      projectState.addProject(title, description, numOfPeople);
      // console.log(title, description, numOfPeople);
    }
  }
}
////////////////////////////////////////////////////////7

const newProject = new ProjectInput();
const activeProjectsList = new ProjectList("active");
const finishedProjectsList = new ProjectList("finished");
