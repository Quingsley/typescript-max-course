export default abstract class Component<
  T extends HTMLElement,
  U extends HTMLElement
> {
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
