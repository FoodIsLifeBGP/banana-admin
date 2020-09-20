import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import styles from './App.module.css';
import HomePage from './Pages/HomePage';
import Settings from './Pages/Settings';

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/settings" component={Settings} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
