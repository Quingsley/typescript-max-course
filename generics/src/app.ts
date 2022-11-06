// const myArr: Array<string> = [];

// const promise: Promise<string> = new Promise((resolve, reject) =>
//   setTimeout(() => resolve("this is done"), 1000)
// );

// promise.then((data) => console.log(data.length));

//custom generics

function merge<T extends Object, U extends Object>(obj1: T, obj2: U) {
  return Object.assign(obj1, obj2);
}

const mergedObj = merge({ name: "jerome" }, { age: 30 });
const merge2 = merge({ hobbies: ["rn", "ft"] }, { workTime: new Date() });
console.log(mergedObj);
console.log(merge2);

interface lengthy {
  length: number;
}

function countAndDescribe<T extends lengthy>(element: T) {
  let description = "No values";
  if (element.length === 1) {
    description = "Got only 1 element";
  } else if (element.length > 1) {
    description = "Got " + element.length + " elements";
  }
  return [element, description];
}

console.log(countAndDescribe("hi there"));

//keyof constaint
function extractAndConvert<T extends Object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "EXTRACTED VALUE " + obj[key];
}
console.log(extractAndConvert({ key: "Hello" }, "key"));

class DataStore<T extends string | number | boolean> {
  private data: T[] = [];

  addItems(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }
  get viewData() {
    return [...this.data];
  }
}
const stringStore = new DataStore<string>();
stringStore.addItems("A");
stringStore.addItems("B");
stringStore.addItems("C");
stringStore.addItems("D");
stringStore.removeItem("C");
console.log(stringStore.viewData);

// const numberStore = new DataStore<Object>();
// numberStore.addItems({ name: "J", order: 2 });
// numberStore.addItems({ name: "K", order: 3 });
// numberStore.addItems({ name: "L", order: 4 });
// numberStore.addItems({ name: "M", order: 5 });
// numberStore.removeItem({ name: "M", order: 5 });
// console.log(numberStore.viewData);

interface CourseGoal {
  title: string;
  description: string;
}

function goals(title: string, desc: string): CourseGoal {
  let myGoals: Partial<CourseGoal> = {};
  myGoals.title = title;
  myGoals.description = desc;
  return myGoals as CourseGoal;
}

const letters: Readonly<string[]> = ["A", "C", "D"];
// letters.push('F');
// letters.pop('C');
