import React from 'react';
import { v4 } from 'uuid';
import styles from './style.module.css';
import Navbar from '../../Components/Navbar';
import Search from '../../Components/Search';
import Paginator from '../../Components/Paginator';
import Status from '../../Components/Status';

const testData = [
  {
    name: 'Zach Gallaway',
    businessName: 'Food 4 U',
    dateSubmitted: '2023/01/19',
    status: 'pending',
  },
];

function DonorPage() {
  return (
    <div>
      <Navbar />
      <div className={styles.belowNav}>
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
        <table>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Business Name</th>
            <th>Date Registered</th>
            <th>Status</th>
          </tr>
          {/* Replace testData.map with line below for production
          {data.map((entry, index) => {  */}
          {testData.map((entry, index) => (
            <tr key={v4()}>
              <td>{index + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.businessName}</td>
              <td>{entry.dateSubmitted}</td>
              <td className={styles.status}><Status statusState={entry.status} /></td>
            </tr>
          ))}
        </table>
        <Paginator entries={testData.length} entriesPerPage={10} />
      </div>
    </div>
  );
}

export default DonorPage;
