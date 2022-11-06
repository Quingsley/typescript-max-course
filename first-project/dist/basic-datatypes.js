"use strict";
const add = function (num1, num2, showRes, phrase) {
    if (showRes) {
        const res = num1 + num2;
        return phrase + res;
    }
    else {
        return "Invalid";
    }
};
const result = add(7, 8, true, "The result is ");
console.log(result);
//enum demo//
var Hobby;
(function (Hobby) {
    Hobby[Hobby["FOOTBALL"] = 0] = "FOOTBALL";
    Hobby[Hobby["SWIMMING"] = 1] = "SWIMMING";
    Hobby[Hobby["ROOKIE"] = 2] = "ROOKIE";
})(Hobby || (Hobby = {}));
//enum demo//
//objects
const person = {
    name: "jerome",
    age: 21,
    role: [2, "author"],
    hobbies: Hobby.ROOKIE,
};
person.role.push(2);
// person.role[1] = 2;
console.log(person.role);
console.log(person.hobbies);
const product = {
    id: "abc1",
    price: 12.99,
    tags: ["great-offer", "hot-and-new"],
    details: {
        title: "Red Carpet",
        description: "A great carpet - almost brand-new!",
    },
};
for (let tags of product.tags) {
    console.log(tags.toUpperCase());
}
console.log(product);
