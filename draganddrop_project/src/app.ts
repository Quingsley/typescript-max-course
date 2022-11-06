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
// project list
class ProjectList {
  inputTemplate: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  elementToInsert: HTMLElement;
  constructor(private type: "active" | "finished") {
    this.inputTemplate = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.inputTemplate.content, true);
    this.elementToInsert = importedNode.firstElementChild! as HTMLElement;
    this.elementToInsert.id = `${this.type}-projects`;

    this.attachHTML();
    this.renderContent();
  }
  private attachHTML() {
    this.hostElement.insertAdjacentElement("beforeend", this.elementToInsert);
  }

  private renderContent() {
    let listId = `${this.type}-projects-list`;
    this.elementToInsert.querySelector("ul")!.id = listId;

    this.elementToInsert.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }
}

///////////////////////////////////////////////////////////
//Project input class
class ProjectInput {
  inputTemplate: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  elementToInsert: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    this.inputTemplate = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.inputTemplate.content, true);
    this.elementToInsert = importedNode.firstElementChild! as HTMLFormElement;
    this.elementToInsert.id = "user-input";

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

    this.attachHTML();
    this.configure();
  }
  private attachHTML() {
    this.hostElement.insertAdjacentElement("afterbegin", this.elementToInsert);
  }

  private collectUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const numOfPeople = this.peopleInputElement.value;

    if (
      !validate({
        value: enteredTitle,
        required: true,
        maxLength: 10,
        minLength: 2,
      }) ||
      !validate({
        value: enteredDescription,
        required: true,
        maxLength: 20,
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
      console.log(title, description, numOfPeople);
    }
  }

  private configure() {
    this.elementToInsert.addEventListener("submit", this.submitHandler);
  }
}
////////////////////////////////////////////////////////7

const newProject = new ProjectInput();
const activeProjectsList = new ProjectList("active");
const finishedProjectsList = new ProjectList("finished");
