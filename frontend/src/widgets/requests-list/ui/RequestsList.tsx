import type { RequestItem } from '@/entities/request';

import { RequestsEmptyState } from './RequestsEmptyState';
import { RequestsLoadingState } from './RequestsLoadingState';
import { RequestsPagination } from './RequestsPagination';
import { RequestsTable } from './RequestsTable';

interface RequestsListProps {
  requests: RequestItem[];
  total: number;
  page: number;
  pages: number;
  isLoading: boolean;
  isAdmin: boolean;
  onPageChange: (page: number) => void;
  onUpdated: () => Promise<void> | void;
  onDeleted: () => Promise<void> | void;
  onError: (message: string) => void;
}

export function RequestsList({
  requests,
  total,
  page,
  pages,
  isLoading,
  isAdmin,
  onPageChange,
  onUpdated,
  onDeleted,
  onError,
}: RequestsListProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold text-slate-950">Список заявок</h2>
            <p className="mt-1 text-sm text-slate-500">
              Всего найдено: {total}
            </p>
          </div>

          {isAdmin && (
            <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
              Режим администратора
            </span>
          )}
        </div>
      </div>

      {isLoading && <RequestsLoadingState />}

      {!isLoading && requests.length === 0 && <RequestsEmptyState />}

      {!isLoading && requests.length > 0 && (
        <RequestsTable
          requests={requests}
          onUpdated={onUpdated}
          onDeleted={onDeleted}
          onError={onError}
        />
      )}

      {!isLoading && (
        <RequestsPagination
          page={page}
          pages={pages}
          total={total}
          onPageChange={onPageChange}
        />
      )}
    </section>
  );
}