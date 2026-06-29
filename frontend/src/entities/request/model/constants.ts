import type { RequestPriority, RequestStatus } from './types';

export const REQUEST_STATUSES: RequestStatus[] = [
  'new',
  'in_progress',
  'done',
];

export const REQUEST_PRIORITIES: RequestPriority[] = [
  'low',
  'normal',
  'high',
];

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  new: 'New',
  in_progress: 'In progress',
  done: 'Done',
};

export const REQUEST_PRIORITY_LABELS: Record<RequestPriority, string> = {
  low: 'Low',
  normal: 'Normal',
  high: 'High',
};