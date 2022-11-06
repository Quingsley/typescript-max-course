"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(validateObj) {
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
function AutoBindThis(_, __, descriptor) {
    const oldMethod = descriptor.value;
    const newDescriptor = {
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
    type;
    inputTemplate;
    hostElement;
    elementToInsert;
    constructor(type) {
        this.type = type;
        this.inputTemplate = document.getElementById("project-list");
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.inputTemplate.content, true);
        this.elementToInsert = importedNode.firstElementChild;
        this.elementToInsert.id = `${this.type}-projects`;
        this.attachHTML();
        this.renderContent();
    }
    attachHTML() {
        this.hostElement.insertAdjacentElement("beforeend", this.elementToInsert);
    }
    renderContent() {
        let listId = `${this.type}-projects-list`;
        this.elementToInsert.querySelector("ul").id = listId;
        this.elementToInsert.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
    }
}
///////////////////////////////////////////////////////////
//Project input class
class ProjectInput {
    inputTemplate;
    hostElement;
    elementToInsert;
    titleInputElement;
    descriptionInputElement;
    peopleInputElement;
    constructor() {
        this.inputTemplate = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.inputTemplate.content, true);
        this.elementToInsert = importedNode.firstElementChild;
        this.elementToInsert.id = "user-input";
        // selecting the form input eleements
        this.titleInputElement = this.elementToInsert.querySelector("#title");
        this.descriptionInputElement = this.elementToInsert.querySelector("#description");
        this.peopleInputElement = this.elementToInsert.querySelector("#people");
        this.attachHTML();
        this.configure();
    }
    attachHTML() {
        this.hostElement.insertAdjacentElement("afterbegin", this.elementToInsert);
    }
    collectUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const numOfPeople = this.peopleInputElement.value;
        if (!validate({
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
            })) {
            alert("Invalid input , please try again!");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +numOfPeople];
        }
    }
    clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.collectUserInput();
        if (Array.isArray(userInput)) {
            this.clearInputs();
            const [title, description, numOfPeople] = userInput;
            console.log(title, description, numOfPeople);
        }
    }
    configure() {
        this.elementToInsert.addEventListener("submit", this.submitHandler);
    }
}
__decorate([
    AutoBindThis
], ProjectInput.prototype, "submitHandler", null);
////////////////////////////////////////////////////////7
const newProject = new ProjectInput();
const activeProjectsList = new ProjectList("active");
const finishedProjectsList = new ProjectList("finished");
//# sourceMappingURL=app.js.map