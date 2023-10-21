import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('jwt');
  return user && token;
};

function AuthWrapper({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onUserIndex = pathname.includes('users');

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    } else if (onUserIndex) {
      navigate('/error');
    }
  }, [navigate, onUserIndex]);

  // If the above useEffect triggers a navigate, this component won't actually render the children.
  // The navigation action will take precedence.
  return children;
}

export default AuthWrapper;
