export type RequestStatus = 'new' | 'in_progress' | 'done';

export type RequestPriority = 'low' | 'normal' | 'high';

export type RequestSortBy = 'created_at' | 'priority';

export type SortOrder = 'asc' | 'desc';

export interface RequestItem {
  id: string;
  title: string;
  description: string | null;
  status: RequestStatus;
  priority: RequestPriority;
  created_at: string;
  updated_at: string;
}

export interface RequestListResponse {
  items: RequestItem[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface CreateRequestDto {
  title: string;
  description?: string | null;
  status: RequestStatus;
  priority: RequestPriority;
}

export interface UpdateRequestStatusDto {
  status: RequestStatus;
}