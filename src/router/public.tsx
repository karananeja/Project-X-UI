import AppRoot from '@/modules/app-root';
import Authentication from '@/modules/authentication';
import Login from '@/modules/authentication/screens/login';
import SignUp from '@/modules/authentication/screens/signup';
import { Navigate } from 'react-router-dom';

export const publicRoutes = [
  { path: '/', element: <AppRoot /> },
  {
    path: 'auth',
    element: <Authentication />,
    children: [
      { index: true, element: <Navigate to='login' replace={true} /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
    ],
  },
];
