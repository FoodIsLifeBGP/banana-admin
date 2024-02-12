import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import styles from './style.module.scss';

export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('jwt');
  return user && token;
};

export default function AuthWrapper({ children }) {
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
  return (
    <div className={styles.flexWrapper}>
      <div className={styles.container}>
        <Navbar />
        {children}
      </div>
      <Footer className={styles.footer} />
    </div>
  );
}
