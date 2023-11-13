import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import styles from './style.module.scss';
import Icon from '../../Components/Icon';
import { isAuthenticated } from '../../Services/AuthWrapper';
import Button from '../../Components/Button';

function ErrorPage() {
  const ladyWidth = 400;
  const bananaWidth = 60;

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
    <div className={styles.pageContainer}>
      {isAuthenticated() && <Navbar />}
      <div className={styles.body}>
        <div className={styles.leftBody}>
          <h1 className={styles.heading}>404</h1>
          <p className={styles.subhead}>Looks like this page went bananas.</p>
          <div className={styles.buttonContainer}>
            <Button type="submit" variant="buttonSecondary" text="Go back" action={goBack} />
            <Button type="submit" variant="buttonPrimary" text="Home" action={goHome} />
          </div>
        </div>
        <div className={styles.rightBody}>
          <Icon name="upsetWoman" size={ladyWidth} />
          <div className={styles.bananaPeel}>
            <Icon name="bananaPeel" size={bananaWidth} />
          </div>
        </div>
      </div>
      <div className={styles.bottomBar} />
    </div>
  );
}

export default ErrorPage;
