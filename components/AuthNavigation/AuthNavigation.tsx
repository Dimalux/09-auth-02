// components/AuthNavigation/AuthNavigation.tsx


// components/AuthNavigation/AuthNavigation.tsx
'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { authApi } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      clearAuth();
      router.push('/sign-in');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isAuthenticated) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/notes" prefetch={false} className={css.navigationLink}>
            Notes
          </Link>
        </li>
        <li className={css.navigationItem}>
          <Link href="/profile" prefetch={false} className={css.navigationLink}>
            Profile
          </Link>
        </li>
        <li className={css.navigationItem}>
          <p className={css.userEmail}>{user?.email}</p>
          <button className={css.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}