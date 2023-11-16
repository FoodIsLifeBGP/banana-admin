import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../Components/BreadCrumb';
import Navbar from '../../Components/Navbar';
import Search from '../../Components/Search';
import styles from './style.module.css';
import { GetDonors } from '../../Services/DonorsService';
import { DataTable } from '../../Components/DataTable';
import Status from '../../Components/Status';
import Paginator from '../../Components/Paginator';

function AllDonorsPage() {
  const defaultPageSize = 7;
  const [donors, setDonors] = useState([]);
  const [sortColumn, setSortColumn] = useState({ sort_by: 'no', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(7);
  const [searchQuery, setSearchQuery] = useState('');

  const convertDateTime = (createdDate) => {
    const date = new Date(createdDate);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDay()).toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const getDonors = async () => {
    try {
      const response = await GetDonors(currentPage, defaultPageSize);
      // console.log(response.pagy.count);
      // setItemsCount(response.pagy.count);
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
    {
      path: 'created_at',
      label: 'Created At',
      content: (d) => `${convertDateTime(d.created_at)}`,
    },
    {
      key: 'account_status',
      label: 'Status',
      content: (d) => {
        switch (d.account_status) {
        case 'active':
          // return <span className="badge badge-success">{d.account_status}</span>;
          return <Status statusState="active" />;
        case 'approved':
          // return <span className="badge badge-success">{d.account_status}</span>;
          return <Status statusState="active" />;
        case 'rejected':
          // return <span className="badge badge-danger">{d.account_status}</span>;
          return d.account_status;
        case 'processing':
          // return <span className="badge badge-warning">{d.account_status}</span>;
          return <Status statusState="pending" />;
        case 'inactive':
          // return <span className="badge badge-warning">{d.account_status}</span>;
          return <Status statusState="inactive" />;
        case 'incomplete':
          // return <span className="badge badge-warning">{d.account_status}</span>;
          return <Status statusState="incomplete" />;
        default:
          // return <span className="badge">{d.account_status}</span>;
          return d.account_status;
        }
      },
    },
  ];

  const handleSort = (sortcolumn) => {
    setSortColumn(sortcolumn);
    setCurrentPage(1);
  };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

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

          {/* <Pagination
            itemsCount={itemsCount}
            pageSize={defaultPageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          /> */}
          <Paginator pages={Math.ceil(itemsCount / defaultPageSize)} currentPage={1} />
        </div>
      </div>
    </div>
  );
}

export default AllDonorsPage;
