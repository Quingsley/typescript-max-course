"use strict";
let user1;
user1 = {
    name: "Jerome",
    age: 22,
    greet(phrase) {
        console.log(phrase + " " + this.name);
    },
};
user1.greet("Hi I am");
// user1.name = 'fff';
class User {
    constructor(name, age, hobby) {
        this.name = name;
        this.age = age;
        this.hooby = hobby;
    }
    greet(phrase) {
        console.log(phrase + " " + this.name);
    }
}
const user = new User("foo", 12);
// user.name = "ggg";
console.log(user);
user.greet("hello");
const myFunc = (num1, num2) => num1 + num2;
const res = myFunc(5, 7);
console.log(res);
//# sourceMappingURL=app.js.map