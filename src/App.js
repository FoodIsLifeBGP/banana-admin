import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppContextProvider } from './contexts/AppContext.tsx';

import Layout from './Components/Layout/index';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route path="/*" element={<Layout />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
