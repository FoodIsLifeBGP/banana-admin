import React from 'react';
// import PropTypes from 'prop-types';
import styles from './style.module.css';
import ProfilePicture from '../ProfilePicture';

function NotificationCard() {
  return (
    <div>
      <ProfilePicture srcImage="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
      <div className={styles.notification}>Notification</div>
    </div>
  );
}

export default NotificationCard;
