"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Project
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["active"] = 0] = "active";
    ProjectStatus[ProjectStatus["finished"] = 1] = "finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    projectId;
    title;
    description;
    numOfPeople;
    projectStatus;
    constructor(projectId, title, description, numOfPeople, projectStatus) {
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.numOfPeople = numOfPeople;
        this.projectStatus = projectStatus;
    }
}
class State {
    listeners = [];
    addListeners(listeners) {
        this.listeners.push(listeners);
    }
}
class ProjectState extends State {
    static instance;
    projectList = [];
    constructor() {
        super();
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.active);
        this.projectList.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, projectStatus) {
        const project = this.projectList.find((prj) => prj.projectId === projectId);
        if (project && project.projectStatus !== projectStatus) {
            project.projectStatus = projectStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFunc of this.listeners) {
            listenerFunc(this.projectList.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
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
//components
class Component {
    inputTemplateId;
    hostElId;
    whereToInsert;
    elToInsertId;
    inputTemplate;
    hostElement;
    elementToInsert;
    constructor(inputTemplateId, hostElId, whereToInsert, elToInsertId) {
        this.inputTemplateId = inputTemplateId;
        this.hostElId = hostElId;
        this.whereToInsert = whereToInsert;
        this.elToInsertId = elToInsertId;
        this.inputTemplate = document.getElementById(inputTemplateId);
        this.hostElement = document.getElementById(hostElId);
        const importedNode = document.importNode(this.inputTemplate.content, true);
        this.elementToInsert = importedNode.firstElementChild;
        this.elementToInsert.id = elToInsertId;
        this.attachHTML(whereToInsert);
    }
    attachHTML(isStart) {
        this.hostElement.insertAdjacentElement(isStart ? "afterbegin" : "beforeend", this.elementToInsert);
    }
}
// project item
class ProjectItem extends Component {
    project;
    get persons() {
        if (this.project.numOfPeople === 1) {
            return "1 person";
        }
        return `${this.project.numOfPeople} persons`;
    }
    constructor(hostId, project) {
        super("single-project", hostId, false, project.projectId);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    dragStartHandler(event) {
        event.dataTransfer?.setData("text/plain", this.project.projectId);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(_) {
        console.log("drag");
    }
    configure() {
        this.elementToInsert.addEventListener("dragstart", this.dragStartHandler);
        this.elementToInsert.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
        this.elementToInsert.querySelector("h2").textContent = this.project.title;
        this.elementToInsert.querySelector("h3").textContent =
            this.persons + " assigned";
        this.elementToInsert.querySelector("p").textContent =
            this.project.description;
    }
}
__decorate([
    AutoBindThis
], ProjectItem.prototype, "dragStartHandler", null);
// project list
class ProjectList extends Component {
    type;
    assignedProjects;
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.renderContent();
        this.configure();
    }
    renderProjects() {
        const listId = `${this.type}-projects-list`;
        const listEl = document.getElementById(listId);
        listEl.innerHTML = "";
        for (const prjObj of this.assignedProjects) {
            new ProjectItem(this.elementToInsert.querySelector("ul").id, prjObj);
        }
    }
    renderContent() {
        let listId = `${this.type}-projects-list`;
        this.elementToInsert.querySelector("ul").id = listId;
        this.elementToInsert.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer?.types[0] === "text/plain") {
            event.preventDefault();
            const ulEl = this.elementToInsert.querySelector("ul");
            ulEl?.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const currentProjectId = event.dataTransfer?.getData("text/plain");
        projectState.moveProject(currentProjectId, this.type === "active" ? ProjectStatus.active : ProjectStatus.finished);
    }
    dragLeaveHandler(event) {
        const ulEl = this.elementToInsert.querySelector("ul");
        ulEl?.classList.remove("droppable");
    }
    configure() {
        this.elementToInsert.addEventListener("dragover", this.dragOverHandler);
        this.elementToInsert.addEventListener("dragleave", this.dragLeaveHandler);
        this.elementToInsert.addEventListener("drop", this.dropHandler);
        projectState.addListeners((project) => {
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
__decorate([
    AutoBindThis
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    AutoBindThis
], ProjectList.prototype, "dropHandler", null);
__decorate([
    AutoBindThis
], ProjectList.prototype, "dragLeaveHandler", null);
///////////////////////////////////////////////////////////
//Project input class
class ProjectInput extends Component {
    titleInputElement;
    descriptionInputElement;
    peopleInputElement;
    constructor() {
        super("project-input", "app", true, "user-input");
        // selecting the form input eleements
        this.titleInputElement = this.elementToInsert.querySelector("#title");
        this.descriptionInputElement = this.elementToInsert.querySelector("#description");
        this.peopleInputElement = this.elementToInsert.querySelector("#people");
        this.configure();
    }
    renderContent() { }
    configure() {
        this.elementToInsert.addEventListener("submit", this.submitHandler);
    }
    collectUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const numOfPeople = this.peopleInputElement.value;
        if (!validate({
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
            projectState.addProject(title, description, numOfPeople);
            // console.log(title, description, numOfPeople);
        }
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