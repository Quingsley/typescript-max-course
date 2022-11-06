let userInput: unknown;
let myName: string;

userInput = 23;
userInput = "jerome";
if (typeof userInput === "string") {
  myName = userInput;
  console.log(myName);
}

function generateError(message: string, statusCode: number): never {
  throw { message: message, statuscode: statusCode };
}
console.log("In watch mode");

generateError("An errror occured", 403);
