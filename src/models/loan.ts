import { Mony } from "./mony.ts";
import { dajb } from "daj";

export default class Loan extends dajb {
  mony: Mony[];
  constructor(name: string, amount: number) {
   super();
    this.name = name;

    const date = new Date().toLocaleDateString("es-DO");
    const time = new Date().toLocaleTimeString("es-DO");

    this.mony = [{ amount, date, time }];
    this.paid = false;
  }

  pay(value: boolean) {
    this.paid = value;
  }
  
  static getInstance(): Loan {
    return new Loan(null, 0);
  }
}
