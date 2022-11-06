type CombinableTypes = string | number;

const CombineValues = function (
  valueOne: CombinableTypes,
  valueTwo: CombinableTypes,
  conversionType: "as-number" | "as-string"
) {
  let result: string | number;
  if (typeof valueOne === "number" && typeof valueTwo === "number") {
    result = valueOne + valueTwo;
  } else {
    result = valueOne.toString() + valueTwo.toString();
  }
  if (conversionType === "as-number") {
    return +result;
  } else {
    return result;
  }
};

const combinedValues = CombineValues(20, 20, "as-number");
const combinedValuesAsStrings = CombineValues("20", "20", "as-number");
const combinedStrings = CombineValues("Hello ", "world", "as-string");
console.log(combinedValues);
console.log(combinedValuesAsStrings);
console.log(combinedStrings);

//type aliases
type User = { name: string; age: number };

const newUser: User = { name: "Jerome", age: 20 };
console.log(newUser);
