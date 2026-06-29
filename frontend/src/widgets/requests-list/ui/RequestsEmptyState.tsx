export function RequestsEmptyState() {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-400">
        ∅
      </div>

      <h3 className="mt-4 text-lg font-bold text-slate-950">
        Заявки не найдены
      </h3>

      <p className="mt-2 max-w-md text-sm text-slate-500">
        Измените параметры поиска или создайте новую заявку.
      </p>
    </div>
  );
}