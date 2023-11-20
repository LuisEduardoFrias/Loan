"use client";
//
import { useEffect, useState, useRef } from "react";
import styles from "./page.module.css";
import Icon from "cp/icon";
import moment from "moment";
import Loan from "m/loan";
import Mony from "m/mony";
import Form from "cp/form";
import BackButton from "cp/back_btn";
import useFetch from "h/usefetch";

export default function DetailsClient({ id }: string) {
  const [isLoading, fetchError, fetchData, getFetch] = useFetch(
    "http://localhost:3000/api/loan",
  );

  const [showForm, setShowFrom] = useState(false);
  const [state, setState] = useState<Loan>(null);

  useEffect(() => {
    //alert(JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    (async () => {
      const response = await getFetch();
      const { data, error } = response;
      setState(data.filter(e => e.key === id)[0]);
    })();
  }, []);

  async function handleForm(
    data: object[],
    setLoader: (show: booleand) => void,
    setNotif: (obj: INotificarion) => void,
  ) {
    const newState = { ...state };

    newState.mony.push(new Mony(data.amount));

    const response = await fetchData({ loan: newState }, "PUT");
    setLoader(isLoading);

    setState(newState);

    setNotif({
      show: true,
      type: 0,
      title: "Datos",
      text: "Datos guardados con exito.",
    });
  }

  function handleOC(value: booleand) {
    setShowFrom(value);
  }

  return (
    <div className={styles.DetailsClient}>
      <div className={styles.DetailsClientHeader}>
        <div className={styles.DetailsClientData}>
          <label htmlFor='name' className={styles.nameL}>
            Nombre:
          </label>
          <span className={styles.name} id='name'>
            {state && state?.name}
          </span>
        </div>

        <div className={styles.DetailsClientData}>
          <label htmlFor='name' className={styles.nameL}>
            Pagar redito
          </label>
          <button className={styles.payredicts}>
            <Icon>paid</Icon>
          </button>
        </div>
      </div>

      <Table styles={styles} data={state} />
      <AddAmount
        showForm={showForm}
        handleOC={handleOC}
        styles={styles}
        name={state && state?.name}
        handleForm={handleForm}
      />
      <button className='DetailsAdd' onClick={() => handleOC(true)}>
        <Icon>add</Icon>
      </button>

      <BackButton className={styles.DetailsBack} />
    </div>
  );
}

function Table({ styles, data }: { styles: any; data: Loan }): JSX.Element {
  let total = 0;

  function setStyles(i: number) {
    return i % 2 === 0 ? styles.tg_dg7a : styles.tg_0lax;
  }
  return (
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
        {data &&
          data?.mony?.map((p, i) => {
            const wikeen = getWikeen(p.date);
            const redicts = getRedicts(wikeen, p.amount);
            total += redicts;
            return (
              <tr key={i}>
                <td className={setStyles(i)}>RD${p.amount}</td>
                <td className={setStyles(i)}>{p.date}</td>
                <td className={setStyles(i)}>{wikeen}</td>
                <td className={setStyles(i)}>RD${redicts}</td>
              </tr>
            );
          })}
        <tr>
          <td className={setStyles(data?.mony.length)}>Total</td>
          <td className={setStyles(data?.mony.length)}></td>
          <td className={setStyles(data?.mony.length)}></td>
          <td className={setStyles(data?.mony.length)}>RD${total}</td>
        </tr>
      </tbody>
    </table>
  );
}

function AddAmount({
  showForm,
  handleOC,
  styles,
  name,
  handleForm,
}: {
  showForm: boolean;
  handleOC: (value: booleand) => void;
  styles: any;
  name: string;
  handleForm: (
    data: object[],
    setLoader: (show: booleand) => void,
    setNotif: (obj: INotificarion) => void,
  ) => void;
}): JSX.Element {
  const inputRef = useRef(null);

  return (
    <>
      {showForm && (
        <div className={styles.contenAddAmount}>
          <Form operation={handleForm}>
            <label>Nombre: {name}</label>
            <label>Monto</label>
            <input type='number' name='amount' />
            <button className={styles.add_btn}>Agregar</button>
            <button
              type='button'
              className={styles.close_btn}
              onClick={() => {
                handleOC(false);
              }}
            >
              <Icon>close</Icon>
            </button>
          </Form>
        </div>
      )}
    </>
  );
}

function getWikeen(dataInitial: string) {
  const dataFormat = "D/M/YYYY";
  const dateNow = moment();
  const dateInit = moment(dataInitial, dataFormat);
  let diferentwikeen = dateNow.diff(dateInit, "weeks");
  return diferentwikeen === 0 ? 1 : diferentwikeen;
}

function getRedicts(wikeen: number, amount: number) {
  const redicts = amount * 0.2;
  const totalRedicts = wikeen * redicts;
  return amount + totalRedicts;
}
