import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useParams } from 'react-router-dom';

import BreadCrumb from '../../Components/BreadCrumb';
import Navbar from '../../Components/Navbar';
import Search from '../../Components/Search';
import Paginator from '../../Components/Paginator';
import Status from '../../Components/Status';

import styles from './style.module.css';

// TODO: Pull real data, not dummy data
const testData = [
  {
    name: 'Zach Gallaway',
    businessName: 'Food 4 U',
    dateSubmitted: '2023/01/19',
    status: 'pending',
  },
  {
    name: 'Jason Derulo 2',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'pending',
  },
  {
    name: 'Jason Derulo 3',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'pending',
  },
  {
    name: 'Jason Derulo 4',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'pending',
  },
  {
    name: 'Jason Derulo 5',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'pending',
  },
  {
    name: 'Jason Derulo 6',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'pending',
  },
  {
    name: 'Jason Derulo 7',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'pending',
  },
  {
    name: 'Jason Derulo 8',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'pending',
  },
  {
    name: 'Jason Derulo 9',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'pending',
  },
  {
    name: 'Jason Derulo 10',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'pending',
  },
  {
    name: 'Jason Derulo 11',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'pending',
  },
  {
    name: 'Jason Derulo 12',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'pending',
  },
];

// NOTE: user variant can only be either "donor", "client" or "all"
function UserDetailPage() {
  const { userVariant } = useParams();
  console.log('userVariant:', userVariant);

  const entriesPerPage = 10;
  const [displayData, setDisplayData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(testData.length / entriesPerPage);

  // TODO: Update to pull data from the backend
  useEffect(() => {
    const startEntry = (currentPage - 1) * entriesPerPage;
    let endEntry = 0; // arbitrary
    if (currentPage * entriesPerPage <= testData.length) {
      endEntry = currentPage * entriesPerPage;
    } else { endEntry = testData.length; }
    setDisplayData(testData.slice(startEntry, endEntry));
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const priorPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const UserDetailPageBCT = [
    { pageName: 'Home', url: 'localhost:3000' },
    { pageName: 'Donor', url: 'localhost:3000' },
    { pageName: 'New Donor Applications', url: 'localhost:3000' },
  ];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div className={styles.belowNav}>
        <BreadCrumb breadCrumbTrail={UserDetailPageBCT} />
        <div className={styles.headerBar}>
          <h2 className={styles.headerLeft}>
            NEW APPLICATIONS (
            {userVariant}
            )
          </h2>
          <div className={styles.headerRight}>
            <Search className={styles.headerItem} />
            <input
              className={styles.viewAllButton}
              type="submit"
              value="All Applications"
            />
          </div>
        </div>
        {/* Replace table with dynamic table component when it's ready */}
        <table className={styles.newDonorTable}>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Business Name</th>
            <th>Date Registered</th>
            <th>Status</th>
          </tr>
          {/* Replace testData.map with line below for production
          {data.map((entry, index) => {  */}
          {displayData.map((entry, index) => (
            <tr key={v4()}>
              <td>{index + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.businessName}</td>
              <td>{entry.dateSubmitted}</td>
              <td className={styles.status}><Status statusState={entry.status} /></td>
            </tr>
          ))}
        </table>
        <Paginator
          pages={pages}
          currentPage={currentPage}
          paginate={paginate}
          nextPage={nextPage}
          priorPage={priorPage}
        />
      </div>
    </div>
  );
}

export default UserDetailPage;
