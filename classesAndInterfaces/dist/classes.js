"use strict";
class Department {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        //     private id: number;
        //   public name: string;
        this.employees = [];
        this.members = [];
    }
    addEmployees(employee) {
        this.employees.push(employee);
        this.members = this.employees;
    }
    printEmployeeInfo() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
    describe() {
        // this.id = 2;
        console.log(`Departmanet ${this.id}: ${this.name}`);
    }
}
Department.dateCreated = new Date();
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
    constructor(id, name, adm) {
        super(name, id);
        this.admins = adm;
    }
    newMethod() {
        console.log(this.admins);
    }
    get adms() {
        return this.admins;
    }
    set newadmins(value) {
        if (value) {
            this.addAdmin(value);
        }
        else {
            throw new Error("inavlid value");
        }
    }
    addAdmin(adm) {
        this.admins.push(adm);
    }
    addEmployees(employee) {
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
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
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
//# sourceMappingURL=classes.js.map