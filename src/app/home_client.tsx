"use client";
//
import Link from "next/link";
import moment from "moment";
import Icon from "cp/icon/icon";
import styles from "./page.module.css";
import Loan from "m//loan";
import useFetch from "h/usefetch";
import { useEffect, useState } from "react";

export default function HomeClient() {
  const [isloader, handleGetFetch] = useFetch("/loan");

  const [clients, setClient] = useState([]);

  useEffect(() => {
    alert(clients);
  }, [clients]);

  useEffect(function () {
    (async () => {
      const response = await fetch(`api/loan`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { data, error } = await response.json();

      if (data != null) {
        const dataArr = data.map(e => {
          if (e.paid === false) {
            return {
              name: e.name,
              date: e.mony[0].date,
              amount: getTotalAmonut(e),
            };
          }
        });

        setClient(dataArr);
      } else {
        alert("error: " + error);
      }
    })();
  }, []);

  function getTotalAmonut(object: Loan) {
    return object.mony.reduce((acount, mony) => {
      const dattInitial = mony.date;
      const dataFormat = "D/M/YYYY";

      const dateNow = moment();
      const dateInit = moment(dattInitial, dataFormat);

      let diferentwikeen = dateNow.diff(dateInit, "weeks");
      diferentwikeen = diferentwikeen === 0 ? 1 : diferentwikeen;
      const redicts = mony.amount * 0.2;

      const totalRedicts = diferentwikeen * redicts;
      return acount + (mony.amount + totalRedicts);
    }, 0);
  }

  return (
    <>
      <div className={styles.homeContainer}>
        {clients.map((client, i) => (
          <div key={i} className={styles.homeCard}>
            <Link href={`/details?id=${1}`} className={styles.CardLink}>
              <label className={styles.cardPresentation}>
                {TowFirstUpperCase(client.name)}
              </label>
              <label className={styles.cardName}>
                {FirstUpperCase(client.name)}
              </label>
              <label className={styles.cardAmoun}>RD$ {client.amount}</label>
            </Link>
            <div className={styles.cardOptions}>
              <button className={styles.cardOptionsBack}>
                <Icon>close</Icon>
              </button>
              <button className={styles.cardOptionsBtn}>
                <Icon>delete</Icon>
              </button>
              <Icon className={styles.cardOptionsIcon}>more_vert</Icon>
            </div>
          </div>
        ))}
      </div>
      <Link href={"/add_loan"} className={styles.bottonAdd}>
        <Icon>add</Icon>
      </Link>
    </>
  );
}

function FirstUpperCase(value: string) {
  return value.substr(0, 1).toUpperCase() + value.substr(1, value.length);
}

function TowFirstUpperCase(value: string) {
  return value.substr(0, 2).toUpperCase();
}
