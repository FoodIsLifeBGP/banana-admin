import React from 'react';
import Navbar from '../Navbar';
import styles from './style.module.scss';
import Footer from '../Footer';

function Layout({ children }) {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <main className="container">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
