import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import type { ReactNode } from 'react';

import { loginAdmin } from '../api/adminSessionApi';
import {
  getStoredAdminToken,
  removeStoredAdminToken,
  setStoredAdminToken,
} from './storage';
import type { AdminLoginRequest } from './types';

interface AdminSessionContextValue {
  accessToken: string | null;
  isAdmin: boolean;
  login: (data: AdminLoginRequest) => Promise<void>;
  logout: () => void;
}

interface AdminSessionProviderProps {
  children: ReactNode;
}

const AdminSessionContext = createContext<AdminSessionContextValue | null>(
  null,
);

export function AdminSessionProvider({
  children,
}: AdminSessionProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    getStoredAdminToken(),
  );

  const login = useCallback(async (data: AdminLoginRequest) => {
    const response = await loginAdmin(data);

    setStoredAdminToken(response.access_token);
    setAccessToken(response.access_token);
  }, []);

  const logout = useCallback(() => {
    removeStoredAdminToken();
    setAccessToken(null);
  }, []);

  const value = useMemo<AdminSessionContextValue>(
    () => ({
      accessToken,
      isAdmin: Boolean(accessToken),
      login,
      logout,
    }),
    [accessToken, login, logout],
  );

  return (
    <AdminSessionContext.Provider value={value}>
      {children}
    </AdminSessionContext.Provider>
  );
}

export function useAdminSession() {
  const context = useContext(AdminSessionContext);

  if (context === null) {
    throw new Error('useAdminSession must be used inside AdminSessionProvider');
  }

  return context;
}