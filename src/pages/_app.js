import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../lib/auth';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { user, loading } = useAuth();


  useEffect(() => {
    const publicPages = ['/', '/login', '/signup'];
    const isPublicPage = publicPages.includes(router.pathname);

    if (!loading && !user && !isPublicPage) {
      router.push('/login');
    }
  }, [user, loading, router]);

  return <Component {...pageProps} />;
}

export default MyApp;
