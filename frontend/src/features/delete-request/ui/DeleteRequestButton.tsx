import { useState } from 'react';

import { useAdminSession } from '@/entities/admin-session';
import { deleteRequest } from '@/entities/request';
import type { RequestItem } from '@/entities/request';
import { getApiErrorMessage } from '@/shared/lib/getApiErrorMessage';

interface DeleteRequestButtonProps {
  request: RequestItem;
  onDeleted: () => Promise<void> | void;
  onError: (message: string) => void;
}

export function DeleteRequestButton({
  request,
  onDeleted,
  onError,
}: DeleteRequestButtonProps) {
  const { isAdmin, accessToken } = useAdminSession();
  const [isLoading, setIsLoading] = useState(false);

  if (!isAdmin) {
    return <span className="text-sm text-slate-400">Только админ</span>;
  }

  async function handleDelete() {
    if (!accessToken) {
      onError('Для удаления заявки нужно войти как администратор.');
      return;
    }

    const isConfirmed = window.confirm(`Удалить заявку «${request.title}»?`);

    if (!isConfirmed) {
      return;
    }

    setIsLoading(true);

    try {
      await deleteRequest(request.id, accessToken);
      await onDeleted();
    } catch (error) {
      onError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      disabled={request.status === 'done' || isLoading}
      onClick={() => void handleDelete()}
      className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400"
    >
      {isLoading ? 'Удаление...' : 'Удалить'}
    </button>
  );
}