import { httpClient } from '@/shared/api/httpClient';

import type { AdminLoginRequest, AdminLoginResponse } from '../model/types';

export function loginAdmin(
  data: AdminLoginRequest,
): Promise<AdminLoginResponse> {
  return httpClient<AdminLoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}