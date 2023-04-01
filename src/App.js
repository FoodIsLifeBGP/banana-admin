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
import useGlobal from "./state";
import PrivateRoute from "./Pages/AuthenticationWrapper";

function App() {
  const [globalState] = useGlobal();
  const [localState, setLocalState] = React.useState(0);
  //TODO: Remove these console.logs
  console.log(localState);
  console.log(globalState);

  return (
    <div className={styles.App}>
      <button type="button" onClick={() => setLocalState(localState + 1)}>
        Add 1
      </button>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route exact path="/home" element={<HomePage />} />
              <Route exact path="/settings" element={<SettingsPage />} />
            </Route>
            <Route
              exact
              path="/review-applications"
              element={<ReviewApplicationPage />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
