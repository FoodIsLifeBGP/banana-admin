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

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthWrapper component={HomePage} router={Routes} />} />
          <Route
            path="/settings"
            element={<AuthWrapper component={SettingsPage} router={Routes} />}
          />
          <Route
            path="/review-applications"
            element={<AuthWrapper component={ReviewApplicationPage} router={Routes} />}
          />
          <Route
            path="/donors"
            element={<AuthWrapper component={AllDonorsPage} router={Routes} />}
          />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
