"use strict";
const CombineValues = function (valueOne, valueTwo, conversionType) {
    let result;
    if (typeof valueOne === "number" && typeof valueTwo === "number") {
        result = valueOne + valueTwo;
    }
    else {
        result = valueOne.toString() + valueTwo.toString();
    }
    if (conversionType === "as-number") {
        return +result;
    }
    else {
        return result;
    }
};
const combinedValues = CombineValues(20, 20, "as-number");
const combinedValuesAsStrings = CombineValues("20", "20", "as-number");
const combinedStrings = CombineValues("Hello ", "world", "as-string");
console.log(combinedValues);
console.log(combinedValuesAsStrings);
console.log(combinedStrings);
const newUser = { name: "Jerome", age: 20 };
console.log(newUser);
