import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('jwt');
  return user && token;
};

function AuthWrapper({ component, router }) {
  const navigate = useNavigate();
  const { pathname } = useLocation(router);
  const onUserIndex = pathname.includes('users');

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    } else if (onUserIndex) {
      navigate('/error');
    }
  }, [navigate, onUserIndex]);

  const WrappedComponent = React.createElement(router, null, React.createElement(component));
  return WrappedComponent;
}

export default AuthWrapper;
