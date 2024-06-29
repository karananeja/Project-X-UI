import PageNotFound from '@/modules/dashboard/screens/error-screens/page-not-found';
import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const routes = useRoutes([
    ...publicRoutes,
    { path: '*', element: <PageNotFound /> },
  ]);
  return routes;
};
