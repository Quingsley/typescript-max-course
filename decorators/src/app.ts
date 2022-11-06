function Logger(target: Function) {
  console.log("DECORATOR");
  console.log(target);
}
function TestFactory(myclass: string) {
  console.log("Test Factory");
  return function (target: Function) {
    console.log("1.DECORATOR");
    console.log(myclass);
    console.log(target);
  };
}

// a decorator with a return type
function TemplateGen(template: string, domId: string) {
  console.log("Template factory");
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstuctor: T
  ) {
    return class extends originalConstuctor {
      constructor(...args: any[]) {
        super();
        console.log("Rendering template");
        const elm = document.getElementById(domId);

        if (elm) {
          elm.innerHTML = template;
          elm.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@TestFactory("Hello")
@TemplateGen("<h1>TITLE</h1>", "app")
class Person {
  name: string = "jj";
  constructor() {
    console.log("Logging...");
  }
}
const newPerson = new Person();

function Log(target: any, propName: string | symbol) {
  console.log("LOG DECORATOR");
  console.log(target, propName);
}

function Log2(
  target: any,
  accessor: string,
  propDescriptor: PropertyDescriptor
) {
  console.log("ACCESSOR DECORATOR");
  console.log(target);
  console.log(accessor);
  console.log(propDescriptor);
}

function Log3(
  target: any,
  methodName: string | symbol,
  methodDescriptor: PropertyDescriptor
) {
  console.log("METHOD DECORATOR");
  console.log(target);
  console.log(methodName);
  console.log(methodDescriptor);
}

function Log4(target: any, methodUsed: string | symbol, positon: number) {
  console.log("PARAMETER DECORATOR");
  console.log(target);
  console.log(methodUsed);
  console.log(positon);
}

class Product {
  @Log
  title: string;
  private _price: number;
  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }
  @Log2
  set price(value: number) {
    if (value > 0) {
      this._price = value;
    } else {
      throw new Error("invaiid!!");
    }
  }
  @Log3
  totalPrice(@Log4 vat: number) {
    this._price = this._price * (1 + vat / 100);
  }
}

const p1 = new Product("suger", 200);
p1.price = 250;
p1.totalPrice(16);

//AutoBind Decorator
function AutoBind(_: any, __: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,

    get() {
      const boundFunc = originalMethod.bind(this);
      return boundFunc;
    },
  };
  return adjustedDescriptor;
}

class Printer {
  private message = "You clicked Me!!";
  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const btn = document.querySelector("button")!;

btn.addEventListener("click", p.showMessage);

//form validation
interface ValidatorConfig {
  [propertyName: string]: {
    [validatableProp: string]: string[];
  };
}

const configValidators: ValidatorConfig = {};
function Requred(target: any, propName: string) {
  configValidators[target.constructor.name] = {
    ...configValidators[target.constructor.name],
    [propName]: [
      ...(configValidators[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
}
function PositiveNumbers(target: any, propName: string) {
  configValidators[target.constructor.name] = {
    ...configValidators[target.constructor.name],
    [propName]: [
      ...(configValidators[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
}
function validate(obj: any) {
  const validateObj = configValidators[obj.constructor.name];
  if (!validateObj) {
    return true;
  }
  let isValid = true;
  for (const propName in validateObj) {
    for (const validator of validateObj[propName]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[propName];

          break;

        case "positive":
          isValid = isValid && obj[propName] > 0;
          break;
      }
    }
    return isValid;
  }
}

class Course {
  @Requred
  title: string;

  @PositiveNumbers
  price: number;

  constructor(title: string, price: number) {
    this.price = price;
    this.title = title;
  }
}
const formEl = document.querySelector("form");
formEl?.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;
  const title = titleEl.value;

  const price = +priceEl.value;
  let newCourse;
  if (typeof price === "number") {
    newCourse = new Course(title, price);
    if (!validate(newCourse)) {
      alert("Invalid input please try again");
      return;
    }
    console.log(newCourse);
  }
});

// const config: { [input: string]: string[] } = {};

// const addValidator = (input: string, type: string) => {
//   config[input] = config[input] ? [...config[input], type] : [type];
// };

// const Required = (_: any, input: string) => addValidator(input, "required");
// const Maxlength = (_: any, input: string) => addValidator(input, "maxlength");
// const Positive = (_: any, input: string) => addValidator(input, "positive");

// const validate = (course: any) =>
//   Object.entries(config).every(([input, types]) =>
//     types.every(
//       (type) =>
//         (type === "required" && course[input]) ||
//         (type === "positive" && course[input] > 0) ||
//         (type === "maxlength" && course[input].length < 5)
//     )
//   );

// class Course {
//   @Required @Maxlength title: string;
//   @Required @Positive price: number;

//   constructor(title: string, price: number) {
//     this.title = title;
//     this.price = price;
//   }
// }

// const formEl = document.querySelector("form");
// formEl?.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const titleEl = document.getElementById("title") as HTMLInputElement;
//   const priceEl = document.getElementById("price") as HTMLInputElement;
//   const title = titleEl.value;

//   const price = +priceEl.value;

//   const newCourse = new Course(title, price);
//   if (!validate(newCourse)) {
//     alert("Invalid input please try again");
//     return;
//   }
//   console.log(newCourse);
// });
