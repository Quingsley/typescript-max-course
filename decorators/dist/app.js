"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(target) {
    console.log("DECORATOR");
    console.log(target);
}
function TestFactory(myclass) {
    console.log("Test Factory");
    return function (target) {
        console.log("1.DECORATOR");
        console.log(myclass);
        console.log(target);
    };
}
// a decorator with a return type
function TemplateGen(template, domId) {
    console.log("Template factory");
    return function (originalConstuctor) {
        return class extends originalConstuctor {
            constructor(...args) {
                super();
                console.log("Rendering template");
                const elm = document.getElementById(domId);
                if (elm) {
                    elm.innerHTML = template;
                    elm.querySelector("h1").textContent = this.name;
                }
            }
        };
    };
}
let Person = class Person {
    name = "jj";
    constructor() {
        console.log("Logging...");
    }
};
Person = __decorate([
    TestFactory("Hello"),
    TemplateGen("<h1>TITLE</h1>", "app")
], Person);
const newPerson = new Person();
function Log(target, propName) {
    console.log("LOG DECORATOR");
    console.log(target, propName);
}
function Log2(target, accessor, propDescriptor) {
    console.log("ACCESSOR DECORATOR");
    console.log(target);
    console.log(accessor);
    console.log(propDescriptor);
}
function Log3(target, methodName, methodDescriptor) {
    console.log("METHOD DECORATOR");
    console.log(target);
    console.log(methodName);
    console.log(methodDescriptor);
}
function Log4(target, methodUsed, positon) {
    console.log("PARAMETER DECORATOR");
    console.log(target);
    console.log(methodUsed);
    console.log(positon);
}
class Product {
    title;
    _price;
    constructor(title, price) {
        this.title = title;
        this._price = price;
    }
    set price(value) {
        if (value > 0) {
            this._price = value;
        }
        else {
            throw new Error("invaiid!!");
        }
    }
    totalPrice(vat) {
        this._price = this._price * (1 + vat / 100);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "totalPrice", null);
const p1 = new Product("suger", 200);
p1.price = 250;
p1.totalPrice(16);
//AutoBind Decorator
function AutoBind(_, __, descriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor = {
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
    message = "You clicked Me!!";
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    AutoBind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const btn = document.querySelector("button");
btn.addEventListener("click", p.showMessage);
const configValidators = {};
function Requred(target, propName) {
    configValidators[target.constructor.name] = {
        ...configValidators[target.constructor.name],
        [propName]: [
            ...(configValidators[target.constructor.name]?.[propName] ?? []),
            "required",
        ],
    };
}
function PositiveNumbers(target, propName) {
    configValidators[target.constructor.name] = {
        ...configValidators[target.constructor.name],
        [propName]: [
            ...(configValidators[target.constructor.name]?.[propName] ?? []),
            "positive",
        ],
    };
}
function validate(obj) {
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
    title;
    price;
    constructor(title, price) {
        this.price = price;
        this.title = title;
    }
}
__decorate([
    Requred
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumbers
], Course.prototype, "price", void 0);
const formEl = document.querySelector("form");
formEl?.addEventListener("submit", (event) => {
    event.preventDefault();
    const titleEl = document.getElementById("title");
    const priceEl = document.getElementById("price");
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
//# sourceMappingURL=app.js.map