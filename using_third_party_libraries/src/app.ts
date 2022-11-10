// Code goes here!
import "reflect-metadata";
import _ from "lodash";
import { Product } from "./product.model";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
var GLOBAL: any;
const products = [
  { title: "Pen", price: 10.2 },
  { title: "Journal", price: 50.55 },
];
const p1 = new Product("New Shoes", 30.36);
const p2 = new Product("", -39);
validate(p2).then((error) => {
  if (error.length > 0) {
    console.log("Validation error");
    console.log(error);
  } else {
    console.log(p2);
  }
});

p1.getInformation();

const loadedProducts = plainToClass(Product, products);
console.log(loadedProducts);

console.log(_.shuffle([1, 2, 3, 4]));
console.log(GLOBAL);
