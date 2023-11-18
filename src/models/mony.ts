export default class Mony {
 amount: number;
 date: string;
 time:string;
  constructor(amount: number) {
    this.amount = amount;
    this.date = new Date().toLocaleDateString("es-DO");
    this.time = new Date().toLocaleTimeString("es-DO");
  }
}
