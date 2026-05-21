import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { authAPI } from '../lib/api';
import { useAuth } from '../lib/auth';
import styles from '../styles/auth.module.css';

export default function Signup() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization_name, setOrganizationName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.signup(email, password, organization_name);
      login(response.data.user, response.data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - StockFlow</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.formBox}>
          <h1>Create Your Account</h1>
          {error && <div className={styles.error}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="org_name">Organization Name</label>
              <input
                id="org_name"
                type="text"
                value={organization_name}
                onChange={(e) => setOrganizationName(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={loading} className={styles.button}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className={styles.link}>
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
