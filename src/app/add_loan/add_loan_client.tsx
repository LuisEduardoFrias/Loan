"use client";

import Form from "cp/form";
import useFetch from "h/usefetch";
import BackButton from "cp/back_btn";
import "./add_loan.css";

interface IAddLoanForms {
  name: string;
  amount: number;
}

export default function AddLoanClient() {
  const [isLoading, fetchError, fetchData, getFetch] = useFetch(
    "http://localhost:3000/api/loan",
  );

  async function handleForm(
    data: object[],
    setLoader: (show: boolean) => void,
    setNotif: (obj: INotificarion) => void,
  ) {
    const response = await fetchData(data);
    setLoader(isLoading);
    setNotif({
      show: true,
      type: 0,
      title: "Datos",
      text: "Prestamo agregado con exito.",
    });
  }

  const formProps: IFormsProp<IAddLoanForms> = {
    operation: handleForm,
  };

  return (
      <Form<IAddLoanForms> {...formProps}>
        <label>Nombre</label>
        <input type='text' name='name' />
        <label>Monto</label>
        <input type='number' name='amount' />
        <button className='send-btn'>Guardar</button>
        <BackButton className='back-btn' />
      </Form>
  );
}
