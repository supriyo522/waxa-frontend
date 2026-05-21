import Head from 'next/head';
import Link from 'next/link';
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
          <Link href="/signup" className={styles.primaryButton}>Get Started</Link>
          <Link href="/login" className={styles.secondaryButton}>Login</Link>
        </div>
      </div>
    </>
  );
}
