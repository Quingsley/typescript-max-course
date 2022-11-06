type fname = {
  name: string;
};
type age = {
  age: number;
  startDate: Date;
};

type details = fname & age;

const p1: details = {
  name: "j",
  age: 2,
  startDate: new Date(),
};
console.log(p1);

type Combinable = string | number;

function add(a: string, b: string): string;
function add(a: number, b: number): number;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type guard = age | fname;

function printDetails(test: guard) {
  if ("startDate" in test) console.log("Start Date:" + test.startDate);
  if ("age" in test) console.log("Age:" + test.age);
  if ("name" in test) console.log("Name:" + test.name);
}

printDetails(p1);

class Car {
  drive() {
    console.log("DRIVING...");
  }
}

class Truck {
  drive() {
    console.log("DRIVING...");
  }

  loadCargo() {
    console.log("LoadingCargo..");
  }
}
const v1 = new Car();
const v2 = new Truck();

type Vehicle = Car | Truck;

function printVehicleDetails(data: Vehicle) {
  data.drive();
  if (data instanceof Truck) data.loadCargo();
}
printVehicleDetails(v2);

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function printDiscriminatedType(obj: Animal) {
  let speed;
  switch (obj.type) {
    case "bird":
      speed = obj.flyingSpeed;
      break;
    case "horse":
      speed = obj.runningSpeed;
      break;
  }
  return speed;
}
const res = printDiscriminatedType({ type: "bird", flyingSpeed: 20 });
console.log(res);

// const input = <HTMLInputElement>document.getElementById("input-message")!;
const input = document.getElementById("input-message")! as HTMLInputElement;

// input.value = "Hi there";

interface ErrorContainer {
  [prop: number]: string;
}

const errorBug: ErrorContainer = {
  1: "Invalid",
  2: "404",
};

let userInput = false;
let storedData = userInput ?? "DEFAULT";
console.log(storedData);
