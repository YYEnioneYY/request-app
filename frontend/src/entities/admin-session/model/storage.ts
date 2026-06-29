const ADMIN_ACCESS_TOKEN_KEY = 'internal_requests_admin_access_token';

export function getStoredAdminToken(): string | null {
  return localStorage.getItem(ADMIN_ACCESS_TOKEN_KEY);
}

export function setStoredAdminToken(token: string): void {
  localStorage.setItem(ADMIN_ACCESS_TOKEN_KEY, token);
}

export function removeStoredAdminToken(): void {
  localStorage.removeItem(ADMIN_ACCESS_TOKEN_KEY);
}