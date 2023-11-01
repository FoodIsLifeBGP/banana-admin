import React, { useEffect } from 'react';

import BreadCrumb from '../../Components/BreadCrumb';
import Navbar from '../../Components/Navbar';
import Search from '../../Components/Search';

import styles from './style.module.css';

function DonorPage() {
  // TODO: Update to pull data from the backend
  useEffect(() => {
  });

  const newDonorPageBCT = [
    { pageName: 'Home', url: 'localhost:3000' },
    { pageName: 'Donor', url: 'localhost:3000' },
    { pageName: 'New Donor Applications', url: 'localhost:3000' },
  ];

  return (
    <div>
      <Navbar />
      <div className={styles.belowNav}>
        <BreadCrumb breadCrumbTrail={newDonorPageBCT} />
        <div className={styles.headerBar}>
          <h2 className={styles.headerLeft}>NEW APPLICATIONS (DONOR)</h2>
          <div className={styles.headerRight}>
            <Search className={styles.headerItem} />
            <input
              className={styles.viewAllButton}
              type="submit"
              value="View all list"
            />
          </div>
        </div>
        {/* Replace table with dynamic table component when it's ready */}
        <table className={styles.newDonorTable}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Business Name</th>
              <th>Date Registered</th>
              <th>Status</th>
            </tr>
          </thead>
          <tr />
        </table>
      </div>
    </div>
  );
}

export default DonorPage;
