import { useState } from 'react';

import {
  REQUEST_STATUSES,
  REQUEST_STATUS_LABELS,
  updateRequestStatus,
} from '@/entities/request';
import type { RequestItem, RequestStatus } from '@/entities/request';
import { getApiErrorMessage } from '@/shared/lib/getApiErrorMessage';

interface UpdateRequestStatusSelectProps {
  request: RequestItem;
  onUpdated: () => Promise<void> | void;
  onError: (message: string) => void;
}

export function UpdateRequestStatusSelect({
  request,
  onUpdated,
  onError,
}: UpdateRequestStatusSelectProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleChange(value: RequestStatus) {
    if (value === request.status) {
      return;
    }

    setIsLoading(true);

    try {
      await updateRequestStatus(request.id, { status: value });
      await onUpdated();
    } catch (error) {
      onError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <select
      value={request.status}
      disabled={request.status === 'done' || isLoading}
      onChange={(event) => void handleChange(event.target.value as RequestStatus)}
      className="block w-40 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
    >
      {REQUEST_STATUSES.map((status) => (
        <option key={status} value={status}>
          {REQUEST_STATUS_LABELS[status]}
        </option>
      ))}
    </select>
  );
}