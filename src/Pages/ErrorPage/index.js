import React, { useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import styles from './style.module.scss';
import Icon from '../../Components/Icon';

function ErrorPage() {
  useEffect(() => {
    document.body.classList.add('theBody');
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.leftBody}>
          <h1>404</h1>
          <p>Looks like this page went bananas.</p>
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
          <Icon name="upsetWoman" />
          <div className={styles.bananaPeel}>
            <Icon name="bananaPeel" />
          </div>
        </div>
      </div>
      <div className={styles.bottomBar} />
    </div>
  );
}

export default ErrorPage;
