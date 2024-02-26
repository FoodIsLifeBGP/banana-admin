import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { GlobalStateProvider } from './contexts/GlobalStateContext';

import Layout from './Components/Layout/index';
import LoginPage from './Pages/LoginPage';
import PasswordResetPage from './Pages/PasswordResetPage';

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/password-reset" element={<PasswordResetPage />} />

          {/* Protected routes */}
          <Route path="/*" element={<Layout />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
