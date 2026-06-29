import { AdminLoginForm } from '@/features/admin-login';

export function AdminLoginPage() {
  return (
    <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="mt-2 text-2xl font-bold text-slate-950">
          Вход администратора
        </h1>
      </div>

      <AdminLoginForm />
    </section>
  );
}