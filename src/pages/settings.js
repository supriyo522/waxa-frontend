import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../lib/auth';
import { settingsAPI } from '../lib/api';
import styles from '../styles/settings.module.css';

export default function Settings() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [settings, setSettings] = useState(null);
  const [threshold, setThreshold] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const loadSettings = useCallback(async () => {
    try {
      const response = await settingsAPI.getSettings(user.organization_id);
      setSettings(response.data);
      setThreshold(response.data.default_low_stock_threshold);
    } catch (err) {
      setError('Failed to load settings');
    } finally {
      setDataLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadSettings();
    }
  }, [user, loadSettings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await settingsAPI.updateSettings(user.organization_id, {
        default_low_stock_threshold: parseInt(threshold)
      });
      setSuccess('Settings updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update settings');
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
        <title>Settings - StockFlow</title>
      </Head>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <h1>Settings</h1>
          <div className={styles.navLinks}>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/products">Products</Link>
            <button onClick={logout}>Logout</button>
          </div>
        </nav>

        <div className={styles.content}>
          <div className={styles.settingsBox}>
            <h2>Global Settings</h2>
            
            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            {settings && (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="threshold">Default Low Stock Threshold</label>
                  <input
                    id="threshold"
                    type="number"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    required
                  />
                  <p className={styles.hint}>
                    Products with quantity at or below this value will be marked as low stock
                  </p>
                </div>

                <button type="submit" className={styles.button}>
                  Save Settings
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
