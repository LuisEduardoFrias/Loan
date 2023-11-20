"use client";
//
import Link from "next/link";
import LdDualRing,  { useColorLoading }  from "cp/ld_dual_ring";
import moment from "moment";
import CardNotification, { ModalType } from "cp/card_notification";
import Icon from "cp/icon";
import { usePushNotify, TypeNotify } from "cp/push_notify";
import styles from "./page.module.css";
import Loan from "m/loan";
import useFetch from "h/usefetch";
import { useEffect, useState, useId } from "react";

type Remove = {
  key: string;
  value: boolean;
};

export default function HomeClient(): JSX.Element {
  const [isLoading, fetchError, fetchData, getFetch] = useFetch(
    "http://localhost:3000/api/loan",
  );

  const init = { show: false, title: "", dialog: "" };
  const [clients, setClient] = useState<Loan[]>([]);
  const [notifyError, setNotifyError] = useState(init);
  const [remove, setRemove] = useState<Remove[]>([]);
  const setPushNotify = usePushNotify();
  const uniqueId = useId();
  useColorLoading("#351c00", "#351c00", "#dd8300");
  // #e6e294;

  useEffect(() => {}, [clients]);

  useEffect(function () {
    (async () => {
      const response = await getFetch();

      if (fetchError === null) {
        const { data, error } = response;

        if (data != null) {
          const dataArr = data
            .map(e => {
              if (e.paid === false) {
                setRemove(prev => [...prev, { key: e.key, value: false }]);
                return {
                  key: e.key,
                  name: e.name,
                  date: e.mony[0].date,
                  amount: getTotalAmonut(e),
                };
              }
            })
            .filter(e => e !== undefined);

          setClient(dataArr);
        } else {
          setNotifyError({ show: false, title: "Data Error", dialog: error });
        }
      } else {
        setNotifyError({
          show: false,
          title: "Fetch Error",
          dialog: fetchError,
        });
      }
    })();
  }, []);

  async function handleDelete(key: string) {
    const response = await fetchData({ key: key }, "DELETE");

    if (fetchError === null) {
      const { data, error } = response;

      if (data != null) {
        setPushNotify({
          keys: uniqueId,
          text: "Prestamo a sido pagado",
          type: TypeNotify.delete,
        });
        setClient(prev => prev.filter(c => c.key !== key));
      } else {
        setNotifyError({ show: false, title: "Data Error", dialog: error });
      }
    }
  }

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

  function getRemove(client: Loan) {
    return remove.filter(r => r.key === client.key)[0]?.value;
  }

  return (
    <>
      <CardNotification
        show={notifyError.show}
        type={ModalType.error}
        title={notifyError.title}
        dialog={notifyError.dialog}
        onClick3={_ => {}}
      />

      <LdDualRing show={isLoading} />

      <div className={styles.homeContainer}>
        {clients?.map((client, i) => (
          <div key={i} className={styles.homeCard}>
            <Link
              href={!getRemove(client) ? `/details?id=${client?.key}` : ""}
              className={
                getRemove(client) ? styles.CardLinkDelete : styles.CardLink
              }
            >
              <div
                className={
                  getRemove(client)
                    ? styles.cardPresentationDelete
                    : styles.cardPresentation
                }
              >
                {!getRemove(client) ? (
                  <label>{TowFirstUpperCase(client?.name)}</label>
                ) : (
                  <button
                    className={styles.cardOptionsBtn}
                    onClick={_ => handleDelete(client?.key)}
                  >
                    <Icon>delete</Icon>
                  </button>
                )}
              </div>
              <label className={styles.cardName}>
                {FirstUpperCase(client?.name)}
              </label>
              <label className={styles.cardAmoun}>RD$ {client?.amount}</label>
            </Link>

            <div className={styles.cardOptions}>
              <button
                className={styles.cardOptionsIcon}
                onClick={_ => {
                  setRemove(
                    remove.map(item => {
                      if (item.key === client.key) {
                        return { ...item, value: !getRemove(client) };
                      } else {
                        item.value = false;
                      }
                      return item;
                    }),
                  );
                }}
              >
                {!getRemove(client) ? (
                  <Icon>more_vert</Icon>
                ) : (
                  <Icon>close</Icon>
                )}
              </button>
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
