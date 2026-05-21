import Head from 'next/head';
import styles from '../styles/global.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>StockFlow - Inventory Management</title>
      </Head>
      <div className={styles.container}>
        <h1>Welcome to StockFlow</h1>
        <p>Simple inventory management for your organization</p>
        <div className={styles.buttonGroup}>
          <a href="/signup" className={styles.primaryButton}>Get Started</a>
          <a href="/login" className={styles.secondaryButton}>Login</a>
        </div>
      </div>
    </>
  );
}
