import { Outlet } from 'react-router';

import { AppHeader } from '@/widgets/app-header';

export function MainLayout() {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}