import { Link } from 'react-router';

import { useAdminSession } from '@/entities/admin-session';

export function AppHeader() {
  const { isAdmin, logout } = useAdminSession();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm shadow-blue-200">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 6.5H6.75A2.75 2.75 0 0 0 4 9.25v8A2.75 2.75 0 0 0 6.75 20h10.5A2.75 2.75 0 0 0 20 17.25v-8a2.75 2.75 0 0 0-2.75-2.75H16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M8.75 8.5h6.5A1.75 1.75 0 0 0 17 6.75v-.5a1.75 1.75 0 0 0-1.75-1.75h-.95A2.35 2.35 0 0 0 12 3a2.35 2.35 0 0 0-2.3 1.5h-.95A1.75 1.75 0 0 0 7 6.25v.5A1.75 1.75 0 0 0 8.75 8.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M8 12h8M8 15.5h5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div>
            <p className="text-lg font-bold leading-5 text-slate-950">
              Internal Requests
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Система внутренних заявок
            </p>
          </div>
        </Link>

        {isAdmin ? (
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 sm:flex">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Админ
            </div>

            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              Выйти
            </button>
          </div>
        ) : (
          <Link
            to="/admin/login"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            Войти
          </Link>
        )}
      </div>
    </header>
  );
}