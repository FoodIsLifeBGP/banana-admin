import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthWrapper from '../../Services/AuthWrapper';

import AdminsPage from '../../Pages/AdminsPage';
import ClientsPage from '../../Pages/ClientsPage';
import DonorPage from '../../Pages/DonorPage';
import ErrorPage from '../../Pages/ErrorPage';
import HomePage from '../../Pages/HomePage';
import NewAdminForm from '../NewAdminForm';
import NotificationPage from '../../Pages/NotificationPage';
import ReviewApplicationPage from '../../Pages/ReviewApplicationPage/index';
import SettingsPage from '../../Pages/SettingsPage/index';
import Navbar from '../Navbar';
import Footer from '../Footer';

import styles from './style.module.scss';

function Layout() {
  const protectedRoutes = [
    { path: '/', element: <HomePage /> },
    { path: '/settings', element: <SettingsPage /> },
    { path: '/clients/:id', element: <ReviewApplicationPage type="client" /> },
    { path: '/donors/:id', element: <ReviewApplicationPage type="donor" /> },
    { path: '/admins', element: <AdminsPage /> },
    { path: '/admins/:id', element: <NewAdminForm /> },
    { path: '/admins/create', element: <NewAdminForm /> },
    { path: '/clients', element: <ClientsPage /> },
    { path: '/donors', element: <DonorPage /> },
    { path: '/notifications', element: <NotificationPage /> },
    { path: '*', element: <ErrorPage /> },
  ];

  return (
    <div className={styles.pageContainer}>
      <AuthWrapper>
        <Navbar />
      </AuthWrapper>
      <main>
        <Routes>
          {protectedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<AuthWrapper>{route.element}</AuthWrapper>}
            />
          ))}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
