import Cookies from 'js-cookie';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    await signOut({ redirect: false });

    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    router.push('/login');
  };

  return { logout };
}
