import { useCallback, useEffect, useState } from 'react';

import { useAdminSession } from '@/entities/admin-session';
import { getRequests } from '@/entities/request';
import type { RequestListResponse } from '@/entities/request';
import { CreateRequestModal } from '@/features/create-request';
import {
  initialRequestFilters,
  RequestsFilters,
} from '@/features/filter-requests';
import type { RequestPageFilters } from '@/features/filter-requests';
import { getApiErrorMessage } from '@/shared/lib/getApiErrorMessage';
import { RequestsList } from '@/widgets/requests-list';

export function RequestsPage() {
  const { isAdmin } = useAdminSession();

  const [filters, setFilters] = useState<RequestPageFilters>(
    initialRequestFilters,
  );
  const [data, setData] = useState<RequestListResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const loadRequests = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await getRequests({
        search: filters.search || undefined,
        status: filters.status || undefined,
        priority: filters.priority || undefined,
        sort_by: filters.sort_by,
        order: filters.order,
        page: filters.page,
        size: filters.size,
      });

      setData(response);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    void loadRequests();
  }, [loadRequests]);

  function updateFilter<Key extends keyof RequestPageFilters>(
    key: Key,
    value: RequestPageFilters[Key],
  ) {
    setFilters((prevState) => {
      const nextState: RequestPageFilters = {
        ...prevState,
        [key]: value,
      };

      if (key !== 'page') {
        nextState.page = 1;
      }

      return nextState;
    });
  }

  const requests = data?.items ?? [];
  const total = data?.total ?? 0;
  const pages = data?.pages ?? 0;

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h1 className="mt-2 text-3xl font-bold text-slate-950">
              Внутренние заявки
            </h1>

            <p className="mt-2 max-w-2xl text-slate-500">
              Управление заявками: создание, поиск, сортировка, смена статуса
              и удаление для администратора.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            + Создать заявку
          </button>
        </div>

        <RequestsFilters
          filters={filters}
          onChange={updateFilter}
          onReset={() => setFilters(initialRequestFilters)}
        />

        {errorMessage && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {errorMessage}
          </div>
        )}

        <RequestsList
          requests={requests}
          total={total}
          page={filters.page}
          pages={pages}
          isLoading={isLoading}
          isAdmin={isAdmin}
          onPageChange={(page) => updateFilter('page', page)}
          onUpdated={loadRequests}
          onDeleted={loadRequests}
          onError={setErrorMessage}
        />
      </div>

      <CreateRequestModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={loadRequests}
      />
    </main>
  );
}