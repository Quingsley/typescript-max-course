"use strict";
function printName() {
    console.log("Jerome");
}
function printUndefined() {
    console.log("foo");
    return;
}
// printName();
// console.log(printUndefined());
function addnUmbers(num1, num2) {
    return num1 + num2;
}
let res;
let myFunc;
res = printName;
console.log(res());
res = addnUmbers;
console.log(res(2, 4));
myFunc = addnUmbers;
console.log(myFunc(2, 10));
//FunctionTypes and callbacks
function addAges(a, b, callBack) {
    let result = a + b;
    return callBack(result);
}
const test = addAges(10, 15, (res) => res * 2);
console.log(test);
