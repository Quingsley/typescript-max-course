abstract class Department {
  //     private id: number;
  //   public name: string;
  private employees: string[] = [];
  protected members: string[] = [];
  static dateCreated = new Date();

  constructor(private name: string, private readonly id: number) {}

  addEmployees(employee: string) {
    this.employees.push(employee);
    this.members = this.employees;
  }
  printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }

  describe(this: Department) {
    // this.id = 2;
    console.log(`Departmanet ${this.id}: ${this.name}`);
  }

  abstract newMethod(): void;
}
// const accounting = new Department("ACCOUNTS", 1);
// accounting.describe();

// accounting.addEmployees("X");
// accounting.addEmployees("Y");
// // accounting.employees[2] = "H";
// accounting.printEmployeeInfo();
// the this keyword ?
// const accountsCopy = { name: "DUMMY", describe: accounting.describe };

// accountsCopy.describe();

// inheritance
class ItDept extends Department {
  newMethod(): void {
    console.log(this.admins);
  }
  private admins: string[];
  constructor(id: number, name: string, adm: string[]) {
    super(name, id);
    this.admins = adm;
  }

  get adms() {
    return this.admins;
  }

  set newadmins(value: string) {
    if (value) {
      this.addAdmin(value);
    } else {
      throw new Error("inavlid value");
    }
  }

  addAdmin(adm: string) {
    this.admins.push(adm);
  }

  addEmployees(employee: string): void {
    this.members.push(employee);
  }
}

const itDep = new ItDept(2, "IT", ["NEW X"]);
itDep.addAdmin("QWERTY");

itDep.addEmployees("Jerome");
console.log(itDep);

//setter
itDep.newadmins = "New Admin";

//getter
console.log(itDep.adms);
itDep.newadmins = "New Admin";
//static property
console.log(Department.dateCreated);
itDep.newMethod();

class Personal {
  private static instance: Personal;
  private constructor(private name: string, private age: number) {}

  static getInstance() {
    if (Personal.instance) {
      return this.instance;
    }
    this.instance = new Personal("Jerome", 21);
    return this.instance;
  }
}

// const person2 = new Personal("foo", 3);
// console.log(person2);
const person = Personal.getInstance();
const person1 = Personal.getInstance();
console.log(person);
console.log(person1);
