"use strict";
let userInput;
let myName;
userInput = 23;
userInput = "jerome";
if (typeof userInput === "string") {
    myName = userInput;
    console.log(myName);
}
function generateError(message, statusCode) {
    throw { message: message, statuscode: statusCode };
}
console.log("In watch mode");
generateError("An errror occured", 403);
