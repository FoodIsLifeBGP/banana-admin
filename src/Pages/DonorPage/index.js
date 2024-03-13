import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../Components/Badge';
import BreadCrumb from '../../Components/BreadCrumb';
import Search from '../../Components/Search';

import { GetDonors } from '../../Services/DonorsService';
import DataTable from '../../Components/DataTable';
import Pagination from '../../Components/Pagination';

import { formatDateToPST } from '../../util/utilities';
import { useGlobalStateContext } from '../../contexts/GlobalStateContext';

import styles from './style.module.scss';

function DonorPage() {
  const defaultPageSize = 8;
  const [donors, setDonors] = useState([]);
  const [sortColumn, setSortColumn] = useState({ sortBy: 'id', orderBy: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { showSpinner } = useGlobalStateContext();

  const getDonors = async () => {
    try {
      showSpinner(true);
      const { sortBy, orderBy } = sortColumn;
      const response = await GetDonors(currentPage, defaultPageSize, sortBy, orderBy);
      setDonors(response.data);
      setItemsCount(response.pagy.count);
    } catch (error) {
      setItemsCount(0);
      setDonors([]);
    } finally {
      showSpinner(false);
    }
  };

  const columns = [
    {
      sortBy: 'first_name',
      label: 'Name',
      content: (d) => <Link to={`/donors/${d.id}`}>{`${d.first_name} ${d.last_name}`}</Link>,
    },
    {
      sortBy: 'email',
      label: 'Email',
      content: (d) => d.email,
    },
    { sortBy: 'organization_name', label: 'Organization' },
    {
      sortBy: 'created_at',
      label: 'Created At',
      content: (d) => <span>{`${formatDateToPST(d.created_at)} PST`}</span>,
    },
    {
      sortBy: 'account_status',
      key: 'account_status',
      label: 'Status',
      content: (d) => <Badge status={d.account_status} />,
    },
  ];

  const handleSort = (column) => {
    setSortColumn(column);
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

  /* TODO: remove and base this off URL sortBy */
  const newDonorPageBCT = [
    { pageName: 'Home', url: 'localhost:3000' },
    { pageName: 'Donor', url: 'localhost:3000' },
    { pageName: 'All', url: 'localhost:3000' },
  ];

  return (
    <>
      <div className={styles.breadCrumbTrail}>
        <BreadCrumb breadCrumbTrail={newDonorPageBCT} />
      </div>
      <div className={styles.headerBar}>
        <h2 className={styles.headerLeft}>NEW DONOR APPLICATIONS</h2>
        <Search
          value={searchQuery}
          onChange={handleSearch}
          searchButton={{ action: () => alert('TODO: get all clients and donors'), text: 'All' }}
        />
      </div>
      <div className="row">
        <DataTable
          columns={columns}
          data={donors}
          sortColumn={sortColumn}
          onSort={handleSort}
          className={styles.newDonorTable}
        />
        <Pagination
          itemsCount={itemsCount}
          pageSize={defaultPageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default DonorPage;
