import { getToken } from '@/lib/utils';
import { useEffect, useState } from 'react';

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const token = getToken();

  useEffect(() => {
    token ? setLoggedIn(true) : setLoggedIn(false);
    setCheckingStatus(false);
  }, [token]);

  return { loggedIn, checkingStatus };
};
