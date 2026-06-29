import { Route, Routes } from 'react-router';

import { AdminLoginPage } from '@/pages/admin-login-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { RequestsPage } from '@/pages/requests-page';
import { LoginLayout } from '@/widgets/layouts/login-layout';
import { MainLayout } from '@/widgets/layouts/main-layout';

function App() {
  return (
    <Routes>
      <Route element={<LoginLayout />}>
        <Route path="/admin/login" element={<AdminLoginPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<RequestsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;