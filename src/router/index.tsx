import PageNotFound from '@/modules/dashboard/screens/error-screens/page-not-found';
import { useRoutes } from 'react-router-dom';

export const AppRoutes = () => {
  const routes = useRoutes([{ path: '*', element: <PageNotFound /> }]);
  return routes;
};
