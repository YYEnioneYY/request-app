import type { RequestStatus } from '../model/types';
import { REQUEST_STATUS_LABELS } from '../model/constants';

interface StatusBadgeProps {
  status: RequestStatus;
}

const statusClassNames: Record<RequestStatus, string> = {
  new: 'bg-blue-50 text-blue-700 ring-blue-200',
  in_progress: 'bg-amber-50 text-amber-700 ring-amber-200',
  done: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClassNames[status]}`}
    >
      {REQUEST_STATUS_LABELS[status]}
    </span>
  );
}