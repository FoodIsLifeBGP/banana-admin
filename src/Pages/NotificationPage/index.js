import React, { useEffect } from 'react';
import Navbar from '../../Components/Navbar';
// import styles from './style.module.scss';
// import Icon from '../../Components/Icon';

function NotificationPage() {
  // const ladyWidth = 400;
  // const bananaWidth = 60;

  useEffect(() => {
    document.body.classList.add('theBody');
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Notifications</h1>
    </div>
  );
}

export default NotificationPage;
