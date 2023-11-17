"use client";
//
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Icon from "cp/icon/icon";
import Form from "cp/form/form";
import BackButton from "cp/back_button/back_button";
import useFetch from "h/usefetch";

export default function DetailsClient() {
  const [isloader, handleFetch, handleGetFetch] = useFetch("/loan");
  const [showForm, setShowFrom] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await handleGetFetch();
      alert(JSON.stringify(response));
    }

    fetchData();
  }, []);

  async function handleForm(
    data: object[],
    setLoader: (show: booleand) => void,
    setNotif: (obj: INotificarion) => void,
  ) {
    const response = await handleFetch(data, "PUT");
    setLoader(isloader);
    setNotif({
      show: true,
      type: 0,
      title: "Datos",
      text: "Datos guardados con exito.",
    });
  }

  const arr: [] = [
    { monto: 200, fecha: "15/11/2023", semana: 2, redito: 40 },
    { monto: 200, fecha: "15/11/2023", semana: 2, redito: 40 },
    { monto: 200, fecha: "15/11/2023", semana: 2, redito: 40 },
    { monto: 200, fecha: "15/11/2023", semana: 2, redito: 40 },
    { monto: 200, fecha: "15/11/2023", semana: 2, redito: 40 },
    { monto: 500, fecha: "15/11/2023", semana: 5, redito: 500 },
    { monto: 250, fecha: "15/11/2023", semana: 4, redito: 45 },
  ];

  function setStyles(i: number) {
    return i % 2 === 0 ? styles.tg_dg7a : styles.tg_0lax;
  }

  function handleOC(value: booleand) {
    setShowFrom(value);
  }
  return (
    <div className={styles.DetailsClient}>
      <div className={styles.DetailsClientData}>
        <label htmlFor='name' className={styles.nameL}>
          Nombre:
        </label>
        <span className={styles.name} id='name'>
          Luis
        </span>
      </div>
      <table className={styles.tg}>
        <thead>
          <tr>
            <th className={styles.tg_amwm}>Monto</th>
            <th className={styles.tg_amwm}>Fecha</th>
            <th className={styles.tg_amwm}>Semana</th>
            <th className={styles.tg_amwm}>Reditos</th>
          </tr>
        </thead>
        <tbody className={styles.contenTr}>
          {arr.map((p, i) => (
            <tr>
              <td className={setStyles(i)}>RD${p.monto}</td>
              <td className={setStyles(i)}>RD${p.fecha}</td>
              <td className={setStyles(i)}>{p.semana}</td>
              <td className={setStyles(i)}>RD${p.redito}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div className={styles.contenAddAmount}>
          <Form operation={handleForm}>
            <label>Nombre: Luis</label>
            <input type='number' hidden id='key' value={"gsys6whw7j"} />
            <label>Monto</label>
            <input type='number' id='amount' />
            <button className={styles.add_btn}>Agregar</button>
            <button
              type='button'
              className={styles.close_btn}
              onClick={() => handleOC(false)}
            >
              <Icon>close</Icon>
            </button>
          </Form>
        </div>
      )}
      <button className='DetailsAdd' onClick={() => handleOC(true)}>
        <Icon>add</Icon>
      </button>

      <BackButton className={styles.DetailsBack} />
    </div>
  );
}
