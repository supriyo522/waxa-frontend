import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../lib/auth';
import { dashboardAPI } from '../lib/api';
import styles from '../styles/dashboard.module.css';

export default function Dashboard() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [dashData, setDashData] = useState(null);
  const [error, setError] = useState('');
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadDashboard();
    }
  }, [user]);

  const loadDashboard = async () => {
    try {
      const response = await dashboardAPI.getDashboard(user.organization_id);
      setDashData(response.data);
    } catch (err) {
      setError('Failed to load dashboard');
    } finally {
      setDataLoading(false);
    }
  };

  if (loading || dataLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard - StockFlow</title>
      </Head>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <h1>StockFlow Dashboard</h1>
          <div className={styles.navLinks}>
            <a href="/products">Products</a>
            <a href="/settings">Settings</a>
            <button onClick={logout}>Logout</button>
          </div>
        </nav>

        <div className={styles.content}>
          <h2>Welcome, {user.email}</h2>
          
          {error && <div className={styles.error}>{error}</div>}

          {dashData && (
            <>
              <div className={styles.cards}>
                <div className={styles.card}>
                  <h3>Total Products</h3>
                  <p className={styles.value}>{dashData.total_products}</p>
                </div>
                <div className={styles.card}>
                  <h3>Total Quantity</h3>
                  <p className={styles.value}>{dashData.total_quantity}</p>
                </div>
              </div>

              <div className={styles.section}>
                <h3>Low Stock Items</h3>
                {dashData.low_stock_items.length > 0 ? (
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Quantity</th>
                        <th>Threshold</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashData.low_stock_items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.sku}</td>
                          <td>{item.quantity_on_hand}</td>
                          <td>{item.threshold}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No low stock items</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
