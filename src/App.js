import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import styles from './App.module.css';
import HomePage from './Pages/HomePage';
import SettingsPage from './Pages/Settings';
import LoginPage from './Pages/LoginPage/index';

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
