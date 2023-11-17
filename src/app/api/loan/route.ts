import { NextResponse } from "next/server";
import { daj } from "daj";
import Loan from "m/loan";

export async function GET() {
  var response = await daj.getAsync(Loan.getInstance());
  return NextResponse.json(response);
}

export async function POST(request: any) {
  const { name, amount } = await request.json();
  console.log("post");

  return NextResponse.json(await daj.postAsync(new Loan(name, amount)));
}

export async function PUT(request) {
  const { loan } = request.json();
  console.log("put");
  const response = await daj.putAsync(loan);

  return NextResponse.json({ name: "lusi" });
}

export async function DELETE(request) {
  const { loan } = request.json();
  console.log("delete");

  const response = await daj.putAsync(loan);

  return NextResponse.json({ name: "lusi" });
}
