import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import styles from './style.module.scss';
import logo from '../../logo.svg';
// import Icon from '../../Components/Icon';

function NotificationPage() {
  // const ladyWidth = 400;
  // const bananaWidth = 60;

  // data to populate notifications
  const notifications = [
    {
      profilePic: `${logo}`,
      adminName: 'Admin 1',
      applicantName: 'creative ',
      status: 'DENIED - INCOMPLETE',
      date: {
        hour: '11',
        minute: '30',
        period: 'AM',
        month: '8',
        day: '19',
        year: '2023',
      },
    },
    {
      profilePic: `${logo}`,
      adminName: 'Admin 1',
      applicantName: 'creative ',
      status: 'DENIED - SUSPENDED',
      date: {
        hour: '11',
        minute: '30',
        period: 'AM',
        month: '8',
        day: '19',
        year: '2023',
      },
    },
    {
      profilePic: `${logo}`,
      adminName: 'Admin 1',
      applicantName: 'creative ',
      status: 'CLOSED',
      date: {
        hour: '11',
        minute: '30',
        period: 'AM',
        month: '8',
        day: '19',
        year: '2023',
      },
    },
    {
      profilePic: `${logo}`,
      adminName: 'Admin 1',
      applicantName: 'creative ',
      status: 'APPROVED',
      date: {
        hour: '11',
        minute: '30',
        period: 'AM',
        month: '8',
        day: '19',
        year: '2023',
      },
    },
    {
      profilePic: `${logo}`,
      adminName: 'Admin 1',
      applicantName: 'creative ',
      status: 'INACTIVE',
      date: {
        hour: '11',
        minute: '30',
        period: 'AM',
        month: '8',
        day: '19',
        year: '2023',
      },
    },

  ];

  return (
    <div>
      <Navbar />
      <h1 className={styles.body}>Notifications</h1>
    </div>
  );
}

export default NotificationPage;
