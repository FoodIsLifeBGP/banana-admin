import React from 'react';
import Navbar from '../../Components/Navbar';
import styles from './style.module.scss';
// import Icon from '../../Components/Icon';

function NotificationPage() {
  // const ladyWidth = 400;
  // const bananaWidth = 60;

  return (
    <div>
      <Navbar />
      <h1 className={styles.body}>Notifications</h1>
    </div>
  );
}

export default NotificationPage;
