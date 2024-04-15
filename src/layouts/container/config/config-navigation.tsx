import { HOME_PAGE } from '@shared/constants/routes.ts';
import { lazy } from 'react';

const DashboardIcon = lazy(() => import('@mui/icons-material/Dashboard'));

const navConfig = [
  {
    title: 'Dashboard',
    path: HOME_PAGE,
    icon: DashboardIcon,
  },
];

export { navConfig };
