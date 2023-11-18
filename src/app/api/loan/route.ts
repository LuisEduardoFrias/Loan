import { NextResponse } from "next/server";
import { daj } from "daj";
import Loan from "m/loan";

export async function GET() {
  const response = await daj.getAsync(Loan.getInstance());
  return NextResponse.json(response);
}

export async function POST(request: any) {
  const { name, amount } = await request.json();
  console.log("post");

  return NextResponse.json(await daj.postAsync(new Loan(name, amount)));
}

export async function PUT(request) {
  const { loan } = await request.json();
  console.log("put");

  const newLoan: Loan = Loan.getInstance();
  newLoan.mapper(loan);

  const response = await daj.putAsync(newLoan);

  return NextResponse.json(response);
}

export async function DELETE(request) {
  const { key } = await request.json();
  console.log("delete");

  const { data } = await daj.getAsync(Loan.getInstance());

  const client = data.filter(c => c.key === key)[0];

  const newLoan: Loan = Loan.getInstance();
  newLoan.mapper(client);
  newLoan.paid = true;

  const response = await daj.putAsync(newLoan);

  return NextResponse.json(response);
}
