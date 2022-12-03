import React from 'react';
import Navbar from '../../Components/Navbar';
import styles from './style.module.css';
import Icon from '../../Components/Icon';

function ErrorPage() {
  return (
    <div>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.leftBody}>
          <h1>404</h1>
          <p>Looks like this page went bananas</p>
          <div className={styles.buttonContainer}>
            <input
              className={styles.goBackButton}
              type="submit"
              value="Go back"
            />
            <input
              className={styles.homeButton}
              type="submit"
              value="Home"
            />
          </div>
        </div>
        <div className={styles.rightBody}>
          <Icon name="upsetWoman" size={493.19} />
          <Icon name="bananaPeel" size={66.72} className={styles.bananaPeel} />
        </div>
      </div>
      <div className={styles.bottomBar} />
    </div>
  );
}

export default ErrorPage;
