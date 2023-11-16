import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import HomePage from './Pages/HomePage/index';
import SettingsPage from './Pages/SettingsPage/index';
import ReviewApplicationPage from './Pages/ReviewApplicationPage/index';
import LoginPage from './Pages/LoginPage/index';
import NotificationPage from './Pages/NotificationPage';
import ErrorPage from './Pages/ErrorPage/index';
import AuthWrapper from './Services/AuthWrapper';
import AllDonorsPage from './Pages/AllDonorsPage';
import ClientsPage from './Pages/ClientsPage';

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
            path="/review-applications"
            element={(
              <AuthWrapper>
                <ReviewApplicationPage />
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
                <AllDonorsPage />
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
