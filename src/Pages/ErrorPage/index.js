import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import styles from './style.module.scss';
import Icon from '../../Components/Icon';
import { isAuthenticated } from '../../Services/AuthWrapper';
import Button from '../../Components/Button';

function ErrorPage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate('/');
  };

  useEffect(() => {
    document.body.classList.add('theBody');
  }, []);

  return (
    <div className={styles.container}>
      {isAuthenticated() && <Navbar />}

      <div className={styles.body}>
        <div className={styles.bodyContent}>
          <h1 className={styles.heading}>404</h1>
          <p className={styles.subhead}>Looks like this page went bananas.</p>
          <div className={styles.buttonContainer}>
            <Button type="submit" variant="buttonSecondary" text="Back" action={goBack} />
            <Button type="submit" variant="buttonPrimary" text="Home" action={goHome} />
          </div>
        </div>
        <div className={`${styles.bodyContent} ${styles.rightBody}`}>
          <Icon name="upsetWoman" className={styles.upsetWoman} />
          <Icon name="bananaPeel" className={styles.bananaPeel} />
        </div>
      </div>

      <div className={styles.footer} />
    </div>
  );
}

export default ErrorPage;
