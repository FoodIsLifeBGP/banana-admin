import React from 'react';

import BananaAdminNavbar from '../Navbar';

import styles from './style.module.scss';

function Layout({ children }) {
  return (
    <div className={styles.pageContainer}>
      <BananaAdminNavbar />
      <main className="container">{children}</main>
      <div className={styles.footer} />
    </div>
  );
}

export default Layout;
