'use client';

import { useEffect } from 'react';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

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
    (async function handleSignOut() {
      if (pathname !== '/login' && session?.error === 'RefreshTokenError') {
        // nextauth client api 이용하여, cookie 안전하게 삭제
        await signOut({ redirect: false });

        // nextjs middleware에게 다시 페이지 검증요청
        window.location.reload();
      }
    })();
  }, [session, pathname]);

  return null;
}
