import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.scss';
import HomePage from './Pages/HomePage/index';
import SettingsPage from './Pages/SettingsPage/index';
import ReviewApplicationPage from './Pages/ReviewApplicationPage/index';
import LoginPage from './Pages/LoginPage/index';
import NotificationPage from './Pages/NotificationPage';
import ErrorPage from './Pages/ErrorPage/index';
import AuthWrapper from './Services/AuthWrapper';
import AdminsPage from './Pages/AdminsPage';
import DonorPage from './Pages/DonorPage';
import ClientsPage from './Pages/ClientsPage';
import NewAdminForm from './Components/NewAdminForm';

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={(
              <AuthWrapper>
                <HomePage />
              </AuthWrapper>
            )}
          />
          <Route
            path="/settings"
            element={(
              <AuthWrapper>
                <SettingsPage />
              </AuthWrapper>
            )}
          />
          <Route
            path="/clients/:id"
            element={(
              <AuthWrapper>
                <ReviewApplicationPage type="client" />
              </AuthWrapper>
            )}
          />
          <Route
            path="/donors/:id"
            element={(
              <AuthWrapper>
                <ReviewApplicationPage type="donor" />
              </AuthWrapper>
            )}
          />
          <Route
            path="/admins"
            element={(
              <AuthWrapper>
                <AdminsPage />
              </AuthWrapper>
            )}
          />
          <Route
            path="/admins/:id"
            element={(
              <AuthWrapper>
                <NewAdminForm />
              </AuthWrapper>
            )}
          />
          <Route
            path="/admins/create"
            element={(
              <AuthWrapper>
                <NewAdminForm />
              </AuthWrapper>
            )}
          />
          <Route
            path="/clients"
            element={(
              <AuthWrapper>
                <ClientsPage />
              </AuthWrapper>
            )}
          />
          <Route
            path="/donors"
            element={(
              <AuthWrapper>
                <DonorPage />
              </AuthWrapper>
            )}
          />
          <Route
            path="/notifications"
            element={(
              <AuthWrapper>
                <NotificationPage />
              </AuthWrapper>
            )}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
