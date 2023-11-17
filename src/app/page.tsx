//
import styles from "./page.module.css";
import HomeClient from "./home_client";

export default async function Home() {

  return (
    <main className={styles.main}>
      <HomeClient />
    </main>
  );
}
