import { PriorityBadge, StatusBadge } from '@/entities/request';
import type { RequestItem } from '@/entities/request';
import { DeleteRequestButton } from '@/features/delete-request';
import { UpdateRequestStatusSelect } from '@/features/update-request-status';

interface RequestsTableProps {
  requests: RequestItem[];
  onUpdated: () => Promise<void> | void;
  onDeleted: () => Promise<void> | void;
  onError: (message: string) => void;
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function RequestsTable({
  requests,
  onUpdated,
  onDeleted,
  onError,
}: RequestsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px] text-left">
        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-5 py-3">Заявка</th>
            <th className="px-5 py-3">Статус</th>
            <th className="px-5 py-3">Приоритет</th>
            <th className="px-5 py-3">Создана</th>
            <th className="px-5 py-3">Обновлена</th>
            <th className="px-5 py-3">Действия</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {requests.map((request) => (
            <tr
              key={request.id}
              className="align-top transition hover:bg-slate-50"
            >
              <td className="max-w-md px-5 py-4">
                <p className="font-semibold text-slate-950">
                  {request.title}
                </p>

                <p className="mt-1 max-w-md text-sm text-slate-500">
                  {request.description || 'Описание не указано'}
                </p>
              </td>

              <td className="px-5 py-4">
                <div className="space-y-2">
                  <StatusBadge status={request.status} />

                  <UpdateRequestStatusSelect
                    request={request}
                    onUpdated={onUpdated}
                    onError={onError}
                  />
                </div>
              </td>

              <td className="px-5 py-4">
                <PriorityBadge priority={request.priority} />
              </td>

              <td className="px-5 py-4 text-sm text-slate-500">
                {formatDate(request.created_at)}
              </td>

              <td className="px-5 py-4 text-sm text-slate-500">
                {formatDate(request.updated_at)}
              </td>

              <td className="px-5 py-4">
                <DeleteRequestButton
                  request={request}
                  onDeleted={onDeleted}
                  onError={onError}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}