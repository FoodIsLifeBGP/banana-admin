/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('jwt');

  return user && token;
};

function AuthWrapper(WrappedComponent) {
  return function WrapperComponent(props) {
    const navigate = useNavigate();

    const { pathname } = useLocation();
    const { userVariant } = useParams();

    const onUserIndex = pathname.includes('users');
    const allowedUserVariant = ['donor', 'client', 'all'].includes(userVariant);

    useEffect(() => {
      if (!isAuthenticated()) {
        navigate('/login');
      } else if (onUserIndex && !allowedUserVariant) {
        navigate('/error');
      }
    }, [onUserIndex, allowedUserVariant]);

    return <WrappedComponent {...props} />;
  };
}

export { AuthWrapper, isAuthenticated };
