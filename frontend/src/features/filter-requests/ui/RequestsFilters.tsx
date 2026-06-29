import {
  REQUEST_PRIORITIES,
  REQUEST_PRIORITY_LABELS,
  REQUEST_STATUSES,
  REQUEST_STATUS_LABELS,
} from '@/entities/request';
import type {
  RequestPriority,
  RequestSortBy,
  RequestStatus,
  SortOrder,
} from '@/entities/request';

import type { RequestPageFilters } from '../model/types';

interface RequestsFiltersProps {
  filters: RequestPageFilters;
  onChange: <Key extends keyof RequestPageFilters>(
    key: Key,
    value: RequestPageFilters[Key],
  ) => void;
  onReset: () => void;
}

export function RequestsFilters({
  filters,
  onChange,
  onReset,
}: RequestsFiltersProps) {
  return (
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr_auto]">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Поиск
          </label>
          <input
            value={filters.search}
            onChange={(event) => onChange('search', event.target.value)}
            placeholder="Название или описание"
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Статус
          </label>
          <select
            value={filters.status}
            onChange={(event) =>
              onChange('status', event.target.value as RequestStatus | '')
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Все</option>
            {REQUEST_STATUSES.map((status) => (
              <option key={status} value={status}>
                {REQUEST_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Приоритет
          </label>
          <select
            value={filters.priority}
            onChange={(event) =>
              onChange('priority', event.target.value as RequestPriority | '')
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Все</option>
            {REQUEST_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {REQUEST_PRIORITY_LABELS[priority]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Сортировать
          </label>
          <select
            value={filters.sort_by}
            onChange={(event) =>
              onChange('sort_by', event.target.value as RequestSortBy)
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="created_at">По дате</option>
            <option value="priority">По приоритету</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Порядок
          </label>
          <select
            value={filters.order}
            onChange={(event) =>
              onChange('order', event.target.value as SortOrder)
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="desc">По убыванию</option>
            <option value="asc">По возрастанию</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={onReset}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Сбросить
          </button>
        </div>
      </div>
    </section>
  );
}