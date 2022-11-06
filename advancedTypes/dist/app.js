"use strict";
const p1 = {
    name: "j",
    age: 2,
    startDate: new Date(),
};
console.log(p1);
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
function printDetails(test) {
    if ("startDate" in test)
        console.log("Start Date:" + test.startDate);
    if ("age" in test)
        console.log("Age:" + test.age);
    if ("name" in test)
        console.log("Name:" + test.name);
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
function printVehicleDetails(data) {
    data.drive();
    if (data instanceof Truck)
        data.loadCargo();
}
printVehicleDetails(v2);
function printDiscriminatedType(obj) {
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
const input = document.getElementById("input-message");
const errorBug = {
    1: "Invalid",
    2: "404",
};
let userInput = false;
let storedData = userInput !== null && userInput !== void 0 ? userInput : "DEFAULT";
console.log(storedData);
//# sourceMappingURL=app.js.map