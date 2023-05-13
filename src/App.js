import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import styles from './App.module.css';
import HomePage from './Pages/HomePage';
import SettingsPage from './Pages/SettingsPage';
import ReviewApplicationPage from './Pages/ReviewApplicationPage';
import LoginPage from './Pages/LoginPage/index';
import AllDonorsPage from './Pages/UsersPage';

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/settings" element={<SettingsPage />} />
            <Route exact path="/review-applications" element={<ReviewApplicationPage />} />
            <Route exact path="/users" element={<AllDonorsPage />} />
            <Route exact path="/review-applications" element={<ReviewApplicationPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
