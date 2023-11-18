import DetailsClient from "./details_client";
import styles from "./page.module.css";
//
export default function Details(props) {
  return (
    <dev className={styles.Details}>
      <DetailsClient id={props.searchParams.id} />
      <br />
      <br />
    </dev>
  );
}
