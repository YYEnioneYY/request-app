import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-6 py-16">
      <section className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-slate-200 bg-white px-8 py-14 text-center shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 9v4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 17h.01"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          404
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Страница не найдена
        </h1>

        <p className="mt-3 max-w-md text-slate-500">
          Возможно, страница была удалена, перемещена или адрес был введён
          неправильно.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          На главную
        </Link>
      </section>
    </main>
  );
}