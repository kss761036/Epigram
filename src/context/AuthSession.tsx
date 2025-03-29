'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SessionProvider, signOut, useSession } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

export default function AuthSession({ children }: Props) {
  return (
    <SessionProvider>
      <RefreshErrorWatcher />
      {children}
    </SessionProvider>
  );
}

function RefreshErrorWatcher() {
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/login' && session?.error === 'RefreshTokenError') {
      signOut({ callbackUrl: '/login' });
    }
  }, [session, pathname]);

  return null;
}
