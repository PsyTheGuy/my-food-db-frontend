import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function RouteGuard({ children }: { children: any}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<Boolean>(false);

  useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);

    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', authCheck)

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }
  }, []);

  function authCheck(url: string) {
    const publicPaths: string[] = ['/login'];
    const path: string = url.split('?')[0];

    if (!window.localStorage.getItem('token') && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }

  return (authorized && children);
}

export { RouteGuard };
