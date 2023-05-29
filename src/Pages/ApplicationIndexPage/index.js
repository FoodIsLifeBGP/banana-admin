import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useParams } from 'react-router-dom';

import BreadCrumb from '../../Components/BreadCrumb';
import Navbar from '../../Components/Navbar';
import Search from '../../Components/Search';
import Paginator from '../../Components/Paginator';
import Status from '../../Components/Status';
import styles from './style.module.scss';
import ApiService from '../../Services/ApiService';

// TODO: Pull real data, not dummy data
const testData = [
  {
    name: 'Zach Gallaway',
    businessName: 'Food 4 U',
    dateSubmitted: '2023/01/19',
    status: 'active',
  },
  {
    name: 'Jason Derulo 2',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'active',
  },
  {
    name: 'Jason Derulo 3',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'inactive',
  },
  {
    name: 'Jason Derulo 4',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'incomplete',
  },
  {
    name: 'Jason Derulo 5',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'suspended',
  },
  {
    name: 'Jason Derulo 6',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'active',
  },
  {
    name: 'Jason Derulo 7',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'active',
  },
  {
    name: 'Jason Derulo 8',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'inactive',
  },
  {
    name: 'Jason Derulo 9',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'inactive',
  },
  {
    name: 'Jason Derulo 10',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'suspended',
  },
  {
    name: 'Jason Derulo 11',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'active',
  },
  {
    name: 'Jason Derulo 12',
    businessName: 'Autotunes, Inc',
    dateSubmitted: '2023/01/17',
    status: 'active',
  },
];

// NOTE: `userVariant` can only be either "donors", "clients" or "all"
function ApplicationIndexPage() {
  const { userVariant } = useParams();
  let userVariantText = userVariant;
  const { axiosRequest } = ApiService();

  if (userVariant === 'all') {
    userVariantText = 'Donors & Clients';
  } else {
    userVariantText = userVariant.charAt(0).toUpperCase() + userVariant.slice(1);
  }

  const fetchUsers = async () => {
    try {
      const response = await axiosRequest(
        'GET',
        'clients',
      );
      console.log('response:', response);
    } catch (error) {
      console.log('error:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const newDonorPageBCT = [
    { pageName: 'Home', url: '/' },
    { pageName: userVariantText, url: '/' },
  ];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div className={styles.belowNav}>
        <BreadCrumb breadCrumbTrail={newDonorPageBCT} />
        <div className={styles.headerBar}>
          <h2 className={styles.headerLeft}>
            {userVariantText}
          </h2>
          <div className={styles.headerRight}>
            <Search className={styles.headerItem} />
            <input
              className={styles.viewAllButton}
              type="submit"
              value="New Applications"
            />
          </div>
        </div>
        {/* Replace table with dynamic table component when it's ready */}
        <table className={styles.table}>
          <tbody>
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
                <td className={styles.statusCell}>
                  <Status statusState={entry.status} />
                </td>
              </tr>
            ))}
          </tbody>
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

export default ApplicationIndexPage;
