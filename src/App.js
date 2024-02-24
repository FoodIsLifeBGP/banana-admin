import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { GlobalStateProvider } from './contexts/GlobalStateContext';

import Layout from './Components/Layout/index';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route path="/*" element={<Layout />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
