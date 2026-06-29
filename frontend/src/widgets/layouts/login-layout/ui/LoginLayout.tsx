import { Link, Navigate, Outlet } from 'react-router';

import { useAdminSession } from '@/entities/admin-session';

export function LoginLayout() {
  const { isAdmin } = useAdminSession();

  if (isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
      <Link
        to="/"
        className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        Назад
      </Link>

      <Outlet />
    </main>
  );
}