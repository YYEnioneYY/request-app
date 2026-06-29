import { ApiError } from '@/shared/api/httpClient';

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Не удалось подключиться к серверу. Проверьте, что backend запущен.',
): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  return fallback;
}