import type {
  RequestPriority,
  RequestSortBy,
  RequestStatus,
  SortOrder,
} from '@/entities/request';

export interface RequestPageFilters {
  search: string;
  status: RequestStatus | '';
  priority: RequestPriority | '';
  sort_by: RequestSortBy;
  order: SortOrder;
  page: number;
  size: number;
}

export const initialRequestFilters: RequestPageFilters = {
  search: '',
  status: '',
  priority: '',
  sort_by: 'created_at',
  order: 'desc',
  page: 1,
  size: 10,
};