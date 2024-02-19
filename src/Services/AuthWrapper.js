import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalStateContext } from '../contexts/GlobalStateContext';

function AuthWrapper({ children }) {
  const { jwt } = useGlobalStateContext();
  const isAuthenticated = Boolean(jwt);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [jwt]);

  return children;
}

export default AuthWrapper;
