import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BreadCrumb from '../../Components/BreadCrumb';
import Layout from '../../Components/Layout';
import Search from '../../Components/Search';
import Spinner from '../../Components/Spinner/Spinner';

import { GetDonors } from '../../Services/DonorsService';
import { DataTable, Pagination } from '../../Components/DataTable';

import formatDateToPST from '../../util/utilities';

import styles from './style.module.css';

function DonorPage() {
  const defaultPageSize = 8;
  const [donors, setDonors] = useState([]);
  const [sortColumn, setSortColumn] = useState({ path: 'id', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const getDonors = async () => {
    setLoading(true);
    try {
      const { path, order } = sortColumn;
      const response = await GetDonors(currentPage, defaultPageSize, path, order);
      setDonors(response.data);
      setItemsCount(response.pagy.count);
    } catch (error) {
      setItemsCount(0);
      setDonors([]);
    }
    setLoading(false);
  };

  const columns = [
    {
      path: 'first_name',
      label: 'Name',
      content: (d) => <Link to={`/donors/${d.id}`}>{`${d.first_name} ${d.last_name}`}</Link>,
    },
    {
      path: 'email',
      label: 'Email',
      content: (d) => d.email,
    },
    { path: 'organization_name', label: 'Organization' },
    {
      path: 'created_at',
      label: 'Created At',
      content: (d) => <span>{`${formatDateToPST(d.created_at)} PST`}</span>,
    },
    {
      path: 'account_status',
      key: 'account_status',
      label: 'Status',
      content: (d) => {
        switch (d.account_status) {
        case 'approved':
          return <span className="badge badge-success text-success">{d.account_status}</span>;
        case 'rejected':
          return <span className="badge badge-danger text-danger">{d.account_status}</span>;
        case 'pending':
          return <span className="badge badge-warning text-warning">{d.account_status}</span>;
        default:
          return <span className="badge text-dark">{d.account_status}</span>;
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
    <Layout>
      <div className="container">
        <div className={styles.belowNav}>
          <BreadCrumb breadCrumbTrail={newDonorPageBCT} />
          <div className={styles.headerBar}>
            <h2 className={styles.headerLeft}>NEW APPLICATIONS (DONOR)</h2>
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
            <Spinner loading={loading} />
            <Pagination
              itemsCount={itemsCount}
              pageSize={defaultPageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DonorPage;
