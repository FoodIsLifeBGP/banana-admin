import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../Components/BreadCrumb';
import Navbar from '../../Components/Navbar';
import Search from '../../Components/Search';
import styles from './style.module.css';
import { GetDonors } from '../../Services/DonorsService';
import { DataTable, Pagination } from '../../Components/DataTable';

function AllDonorsPage() {
  const defaultPageSize = 8;
  const [donors, setDonors] = useState([]);
  const [sortColumn, setSortColumn] = useState({ sort_by: 'no', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const getDonors = async () => {
    try {
      const response = await GetDonors(currentPage, defaultPageSize);
      setDonors(response);
    } catch (error) {
      setItemsCount(0);
      setDonors([]);
    }
  };

  const columns = [
    { path: 'id', label: 'id' },
    { path: 'name', label: 'Name', content: (d) => `${d.first_name} ${d.last_name}` },
    { path: 'organization_name', label: 'Organization' },
    { path: 'created_at', label: 'Created At' },
    {
      key: 'account_status',
      label: 'Status',
      content: (d) => {
        switch (d.account_status) {
        case 'approved':
          return <span className="badge badge-success">{d.account_status}</span>;
        case 'rejected':
          return <span className="badge badge-danger">{d.account_status}</span>;
        case 'pending':
          return <span className="badge badge-warning">{d.account_status}</span>;
        default:
          return <span className="badge">{d.account_status}</span>;
        }
      },
    },
  ];

  const handleSort = (sortcolumn) => {
    setSortColumn(sortcolumn);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  useEffect(() => {
    getDonors();
  }, [currentPage, sortColumn, searchQuery]);

  const newDonorPageBCT = [
    { pageName: 'Home', url: 'localhost:3000' },
    { pageName: 'Donor', url: 'localhost:3000' },
    { pageName: 'All Lists', url: 'localhost:3000' },
  ];

  return (
    <div>
      <Navbar />
      <div className={styles.belowNav}>
        <BreadCrumb breadCrumbTrail={newDonorPageBCT} />
        <div className={styles.headerBar}>
          <h2 className={styles.headerLeft}>ALL LISTS (DONOR)</h2>
          <div className={styles.headerRight}>
            <Search value={searchQuery} onChange={handleSearch} />
            <input
              className={styles.viewAllButton}
              type="submit"
              value="View all list"
            />
          </div>
        </div>
        <div className="row">
          <DataTable
            columns={columns}
            data={donors}
            sortColumn={sortColumn}
            onSort={handleSort}
          />

          <Pagination
            itemsCount={itemsCount}
            pageSize={defaultPageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default AllDonorsPage;
