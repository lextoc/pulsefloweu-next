import { Button } from "@mui/material";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Please sign in to continue</p>
        <Button variant="contained">Sign in</Button>
      </div>
    </main>
  );
}
