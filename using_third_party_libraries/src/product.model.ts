import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
export class Product {
  @IsNotEmpty()
  public title: string;
  @IsNumber()
  @IsPositive()
  public price: number;
  constructor(title: string, price: number) {
    this.price = price;
    this.title = title;
  }
  getInformation() {
    console.log([this.title, `\$ ${this.price}`]);
  }
}
