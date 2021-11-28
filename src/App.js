import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';
import styles from './App.module.css';
import HomePage from './Pages/HomePage';
import SettingsPage from './Pages/Settings';
import LoginPage from './Pages/LoginPage/index.js';

function App() {
	return (
		<div className={styles.App}>
			<Router>
				<div>
					<Switch>
						<Route exact={true} path="/" component={LoginPage} />
						<Route exact={true} path="/home" component={HomePage} />
						<Route exact={true} path="/settings" component={SettingsPage} />
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
