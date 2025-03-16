'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Cookies from 'js-cookie';

export function useAuth() {
  const { data: session, status } = useSession();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (session?.user?.accessToken) {
      setAccessToken(session.user.accessToken);
      setIsAuthenticated(true);
    } else {
      const tokenFromCookie = Cookies.get('accessToken');

      if (tokenFromCookie) {
        setAccessToken(tokenFromCookie);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [session, status]);

  return { accessToken, isAuthenticated };
}
