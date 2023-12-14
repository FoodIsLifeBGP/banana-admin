import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../Components/Button';
import Icon from '../../Components/Icon';

import styles from './style.module.scss';

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
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.bodyContent}>
          <h1 className={styles.heading}>404</h1>
          <p className={styles.subhead}>Looks like this page went bananas.</p>
          <div className={styles.buttonContainer}>
            <Button type="submit" variant="buttonSecondary" text="Go back" action={goBack} />
            <Button type="submit" variant="buttonPrimary" text="Home" action={goHome} />
          </div>
        </div>
        <div className={`${styles.bodyContent} ${styles.rightBody}`}>
          <Icon name="upsetWoman" size={ladyWidth} />
          <Icon name="bananaPeel" size={bananaWidth} className={styles.bananaPeel} />
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
