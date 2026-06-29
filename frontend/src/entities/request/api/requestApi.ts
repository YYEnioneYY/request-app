import { httpClient } from '@/shared/api/httpClient';

import type {
  CreateRequestDto,
  RequestItem,
  RequestListResponse,
  RequestPriority,
  RequestSortBy,
  RequestStatus,
  SortOrder,
  UpdateRequestStatusDto,
} from '../model/types';

export interface GetRequestsParams {
  search?: string;
  status?: RequestStatus;
  priority?: RequestPriority;
  sort_by?: RequestSortBy;
  order?: SortOrder;
  page?: number;
  size?: number;
}

function buildQueryParams(params: GetRequestsParams): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : '';
}

export function getRequests(
  params: GetRequestsParams,
): Promise<RequestListResponse> {
  return httpClient<RequestListResponse>(
    `/requests${buildQueryParams(params)}`,
  );
}

export function createRequest(data: CreateRequestDto): Promise<RequestItem> {
  return httpClient<RequestItem>('/requests', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateRequestStatus(
  requestId: string,
  data: UpdateRequestStatusDto,
): Promise<RequestItem> {
  return httpClient<RequestItem>(`/requests/${requestId}/status`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function deleteRequest(
  requestId: string,
  accessToken: string,
): Promise<void> {
  return httpClient<void>(`/requests/${requestId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}