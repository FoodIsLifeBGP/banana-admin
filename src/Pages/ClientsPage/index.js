import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import DataTable from '../../Components/DataTable';
import Pagination from '../../Components/Pagination';
import Search from '../../Components/Search';
import Badge from '../../Components/Badge';
import styles from './style.module.scss';
import { GetClients } from '../../Services/ClientsService';
import BreadCrumb from '../../Components/BreadCrumb';
import { useGlobalStateContext } from '../../contexts/GlobalStateContext';

import { formatDateToPST } from '../../util/utilities';

function ClientsPage() {
  const defaultPageSize = 8;
  const [clients, setClients] = useState([]);
  const [sortColumn, setSortColumn] = useState({ sortBy: 'id', orderBy: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const { showToast, showSpinner } = useGlobalStateContext();

  const getClients = async () => {
    showSpinner(true);
    try {
      const { sortBy, orderBy } = sortColumn;
      const response = await GetClients(currentPage, defaultPageSize, sortBy, orderBy);
      setItemsCount(response.pagy.count);
      setClients(response.data);
    } catch (error) {
      setItemsCount(0);
      setClients([]);
      showToast({ message: 'Failed to fetch data', variant: 'danger' });
    } finally {
      showSpinner(false);
    }
  };

  const columns = [
    {
      sortBy: 'first_name',
      label: 'Name',
      content: (client) => (
        <Link to={`/clients/${client.id}`}>{`${client.first_name} ${client.last_name}`}</Link>
      ),
    },
    {
      sortBy: 'email',
      key: 'email',
      label: 'Email',
      content: (client) => client.email,
    },
    {
      sortBy: 'created_at',
      label: 'Created At',
      content: (client) => <span>{`${formatDateToPST(client.created_at)} PST`}</span>,
    },
    {
      sortBy: 'account_status',
      key: 'account_status',
      label: 'Status',
      content: (client) => <Badge status={client.account_status} />,
    },
  ];

  const handleSort = (sortBy) => {
    setSortColumn(sortBy);
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
    getClients();
  }, [currentPage, sortColumn, searchQuery]);

  /* TODO: remove and base this off URL sortBy */
  const newDonorPageBCT = [
    { pageName: 'Home', url: 'localhost:3000' },
    { pageName: 'Client', url: 'localhost:3000' },
    { pageName: 'All', url: 'localhost:3000' },
  ];

  return (
    <>
      <div className="w-100">
        <BreadCrumb breadCrumbTrail={newDonorPageBCT} />
        <div className="row mt-4 mb-4">
          <div className={styles.headerBar}>
            <div className="col-6">
              <h2>NEW CLIENT APPLICATIONS</h2>
            </div>
            <Search
              value={searchQuery}
              onChange={handleSearch}
              searchButton={{ action: () => alert('TODO: get all clients and donors'), text: 'All' }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <DataTable
          data={clients}
          columns={columns}
          onSort={handleSort}
          sortColumn={sortColumn}
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

export default ClientsPage;
