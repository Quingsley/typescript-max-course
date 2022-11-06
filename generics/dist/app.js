"use strict";
// const myArr: Array<string> = [];
// const promise: Promise<string> = new Promise((resolve, reject) =>
//   setTimeout(() => resolve("this is done"), 1000)
// );
// promise.then((data) => console.log(data.length));
//custom generics
function merge(obj1, obj2) {
    return Object.assign(obj1, obj2);
}
const mergedObj = merge({ name: "jerome" }, { age: 30 });
const merge2 = merge({ hobbies: ["rn", "ft"] }, { workTime: new Date() });
console.log(mergedObj);
console.log(merge2);
function countAndDescribe(element) {
    let description = "No values";
    if (element.length === 1) {
        description = "Got only 1 element";
    }
    else if (element.length > 1) {
        description = "Got " + element.length + " elements";
    }
    return [element, description];
}
console.log(countAndDescribe("hi there"));
//keyof constaint
function extractAndConvert(obj, key) {
    return "EXTRACTED VALUE " + obj[key];
}
console.log(extractAndConvert({ key: "Hello" }, "key"));
class DataStore {
    constructor() {
        this.data = [];
    }
    addItems(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    get viewData() {
        return [...this.data];
    }
}
const stringStore = new DataStore();
stringStore.addItems("A");
stringStore.addItems("B");
stringStore.addItems("C");
stringStore.addItems("D");
stringStore.removeItem("C");
console.log(stringStore.viewData);
function goals(title, desc) {
    let myGoals = {};
    myGoals.title = title;
    myGoals.description = desc;
    return myGoals;
}
const letters = ["A", "C", "D"];
// letters.push('F');
// letters.pop('C');
//# sourceMappingURL=app.js.map