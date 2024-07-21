import { useEffect } from 'react';
import { useAuthStatus } from './hooks/useProject';
import { useNavigate } from 'react-router-dom';

const AppRoot = () => {
  // other hooks
  const navigate = useNavigate();

  // custom hooks
  const { loggedIn } = useAuthStatus();

  // useEffect hooks
  useEffect(() => {
    if (!loggedIn) navigate('/auth');
  }, [loggedIn, navigate]);

  return null;
};

export default AppRoot;
