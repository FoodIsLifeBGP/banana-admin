import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import styles from './App.module.css';
import HomePage from './Pages/HomePage/index';
import SettingsPage from './Pages/SettingsPage/index';
import ReviewApplicationPage from './Pages/ReviewApplicationPage/index';
import LoginPage from './Pages/LoginPage/index';
import NotificationPage from './Pages/NotificationPage';
import ErrorPage from './Pages/ErrorPage/index';
import { AuthWrapper } from './Services/AuthWrapper';

function App() {
  const AuthHomePage = AuthWrapper(HomePage);
  const AuthSettingsPage = AuthWrapper(SettingsPage);
  const AuthReviewApplicationPage = AuthWrapper(ReviewApplicationPage);

  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthHomePage />} />
          <Route path="/settings" element={<AuthSettingsPage />} />
          <Route path="/review-applications" element={<AuthReviewApplicationPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
