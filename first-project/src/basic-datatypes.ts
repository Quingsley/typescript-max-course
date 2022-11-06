const add = function (
  num1: number,
  num2: number,
  showRes: boolean,
  phrase: string
) {
  if (showRes) {
    const res = num1 + num2;
    return phrase + res;
  } else {
    return "Invalid";
  }
};

const result = add(7, 8, true, "The result is ");
console.log(result);

//enum demo//
enum Hobby {
  FOOTBALL,
  SWIMMING,
  ROOKIE,
}
//enum demo//

//objects
const person: {
  name: string;
  age: number;
  role: [number, string];
  hobbies: Hobby;
} = {
  name: "jerome",
  age: 21,
  role: [2, "author"],
  hobbies: Hobby.ROOKIE,
};
person.role.push(2);
// person.role[1] = 2;
console.log(person.role);
console.log(person.hobbies);

const product: {
  id: string;
  price: number;
  tags: string[];
  details: {
    title: string;
    description: string;
  };
} = {
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
