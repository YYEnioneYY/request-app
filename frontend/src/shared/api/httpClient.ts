import { API_BASE_URL } from '@/shared/config/env';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);

    this.name = 'ApiError';
    this.status = status;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function extractErrorMessage(data: unknown): string {
  if (isRecord(data)) {
    const detail = data.detail;

    if (typeof detail === 'string') {
      return detail;
    }

    const message = data.message;

    if (typeof message === 'string') {
      return message;
    }
  }

  if (typeof data === 'string' && data.length > 0) {
    return data;
  }

  return 'Произошла ошибка при выполнении запроса.';
}

export async function httpClient<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type');

  const data: unknown = contentType?.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new ApiError(extractErrorMessage(data), response.status);
  }

  return data as T;
}