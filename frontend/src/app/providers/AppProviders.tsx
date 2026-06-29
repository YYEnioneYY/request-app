import type { ReactNode } from 'react';

import { AdminSessionProvider } from '@/entities/admin-session';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return <AdminSessionProvider>{children}</AdminSessionProvider>;
}