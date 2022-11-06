interface Named {
  readonly name: string;
}
interface Person extends Named {
  age: number;
  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: "Jerome",
  age: 22,
  greet(phrase) {
    console.log(phrase + " " + this.name);
  },
};
user1.greet("Hi I am");
// user1.name = 'fff';

class User implements Person {
  name: string;
  age: number;
  hooby?: string;
  constructor(name: string, age: number, hobby?: string) {
    this.name = name;
    this.age = age;
    this.hooby = hobby;
  }
  greet(phrase: string): void {
    console.log(phrase + " " + this.name);
  }
}
const user = new User("foo", 12);
// user.name = "ggg";
console.log(user);
user.greet("hello");

interface addNums {
  (a: number, b: number): number;
}

const myFunc: addNums = (num1: number, num2: number) => num1 + num2;
const res = myFunc(5, 7);
console.log(res);
