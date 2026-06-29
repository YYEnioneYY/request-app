import type { RequestPriority } from '../model/types';
import { REQUEST_PRIORITY_LABELS } from '../model/constants';

interface PriorityBadgeProps {
  priority: RequestPriority;
}

const priorityClassNames: Record<RequestPriority, string> = {
  low: 'bg-slate-100 text-slate-700 ring-slate-200',
  normal: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  high: 'bg-rose-50 text-rose-700 ring-rose-200',
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${priorityClassNames[priority]}`}
    >
      {REQUEST_PRIORITY_LABELS[priority]}
    </span>
  );
}