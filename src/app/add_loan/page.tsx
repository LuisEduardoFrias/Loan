//
import "./add_loan.css";
import AddLoanClient from "./add_loan_client";
//
export default function AddLoan() {
  return (
    <div className="addloan">
      <h1 className='addloan-title'>Agregar prestamo</h1>
      <AddLoanClient />
    </div>
  );
}
