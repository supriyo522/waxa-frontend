import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../lib/auth';
import { productsAPI } from '../lib/api';
import styles from '../styles/products.module.css';

export default function Products() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [dataLoading, setDataLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    quantity_on_hand: 0,
    cost_price: '',
    selling_price: '',
    low_stock_threshold: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadProducts();
    }
  }, [user, search]);

  const loadProducts = async () => {
    try {
      const response = await productsAPI.getProducts(user.organization_id, search);
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setDataLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productsAPI.createProduct(user.organization_id, formData);
      setFormData({
        name: '',
        sku: '',
        quantity_on_hand: 0,
        cost_price: '',
        selling_price: '',
        low_stock_threshold: ''
      });
      setShowForm(false);
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create product');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await productsAPI.deleteProduct(id, user.organization_id);
      loadProducts();
    } catch (err) {
      setError('Failed to delete product');
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
        <title>Products - StockFlow</title>
      </Head>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <h1>Products</h1>
          <div className={styles.navLinks}>
            <a href="/dashboard">Dashboard</a>
            <a href="/settings">Settings</a>
            <button onClick={logout}>Logout</button>
          </div>
        </nav>

        <div className={styles.content}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.toolbar}>
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            <button 
              onClick={() => setShowForm(!showForm)}
              className={styles.addButton}
            >
              {showForm ? 'Cancel' : 'Add Product'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="SKU"
                  value={formData.sku}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formRow}>
                <input
                  type="number"
                  placeholder="Quantity on Hand"
                  value={formData.quantity_on_hand}
                  onChange={(e) => setFormData({...formData, quantity_on_hand: parseInt(e.target.value)})}
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Cost Price"
                  value={formData.cost_price}
                  onChange={(e) => setFormData({...formData, cost_price: e.target.value})}
                />
              </div>
              <div className={styles.formRow}>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Selling Price"
                  value={formData.selling_price}
                  onChange={(e) => setFormData({...formData, selling_price: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Low Stock Threshold"
                  value={formData.low_stock_threshold}
                  onChange={(e) => setFormData({...formData, low_stock_threshold: e.target.value})}
                />
              </div>
              <button type="submit" className={styles.submitButton}>Create Product</button>
            </form>
          )}

          <div className={styles.productsList}>
            {products.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>SKU</th>
                    <th>Qty</th>
                    <th>Cost Price</th>
                    <th>Selling Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.sku}</td>
                      <td>{product.quantity_on_hand}</td>
                      <td>{product.cost_price || '-'}</td>
                      <td>{product.selling_price || '-'}</td>
                      <td>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
