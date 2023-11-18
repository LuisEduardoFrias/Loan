import Mony from "./mony.ts";
import { dajb } from "daj";

export default class Loan extends dajb {
  name: string;
  mony: Mony[];
  paid: boolean;

  constructor(name: string, amount: number) {
    super();
    this.name = name;
    this.mony = [new Mony(amount)];
    this.paid = false;
  }

  pay(value: boolean) {
    this.paid = value;
  }

  static getInstance(): Loan {
    return new Loan(null, 0);
  }
}
