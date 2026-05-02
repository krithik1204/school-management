import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

const AdminPage: FC = () => (
  <div>
    <Outlet />
  </div>
);

export default AdminPage;
