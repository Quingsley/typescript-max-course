import Component from "./base-component";
import * as validation from "../utils/validation";
import { AutoBindThis } from "../decorators/autobind";
import { projectState } from "../state/project-state";
//Project input class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
      !validation.validate({
        value: enteredTitle,
        required: true,
        maxLength: 20,
        minLength: 5,
      }) ||
      !validation.validate({
        value: enteredDescription,
        required: true,
        maxLength: 40,
        minLength: 5,
      }) ||
      !validation.validate({
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
