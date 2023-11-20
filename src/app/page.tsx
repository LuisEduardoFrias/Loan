//
import Icon from "r-packages/comps/icon";
import styles from "./page.module.css";
import HomeClient from "./home_client.tsx";

export default async function Home() {
  return (
    <main className={styles.main}>
      <HomeClient />
    </main>
  );
}
