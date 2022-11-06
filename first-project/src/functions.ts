function printName(): void {
  console.log("Jerome");
}
function printUndefined(): undefined {
  console.log("foo");
  return;
}

// printName();
// console.log(printUndefined());

function addnUmbers(num1: number, num2: number) {
  return num1 + num2;
}
let res: Function;
let myFunc: (a: number, b: number) => number;
res = printName;
console.log(res());
res = addnUmbers;
console.log(res(2, 4));
myFunc = addnUmbers;
console.log(myFunc(2, 10));

//FunctionTypes and callbacks
function addAges(a: number, b: number, callBack: (result: number) => number) {
  let result = a + b;
  return callBack(result);
}

const test = addAges(10, 15, (res) => res * 2);
console.log(test);
