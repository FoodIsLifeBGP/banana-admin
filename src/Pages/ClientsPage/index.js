import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import DataTable from '../../Components/DataTable';
import Pagination from '../../Components/Pagination';
import Search from '../../Components/Search';
import Spinner from '../../Components/Spinner/Spinner';
import Badge from '../../Components/Badge';
import styles from './style.module.scss';
import { GetClients } from '../../Services/ClientsService';
import BreadCrumb from '../../Components/BreadCrumb';

import { formatDateToPST } from '../../util/utilities';

function ClientsPage() {
  const defaultPageSize = 8;
  const [clients, setClients] = useState([]);
  const [sortColumn, setSortColumn] = useState({ path: 'id', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const getClients = async () => {
    setLoading(true);
    try {
      const { path, order } = sortColumn;
      const response = await GetClients(currentPage, defaultPageSize, path, order);
      setItemsCount(response.pagy.count);
      setClients(response.data);
    } catch (error) {
      setItemsCount(0);
      setClients([]);
      toast.error('Failed to fetch data');
    }
    setLoading(false);
  };

  const columns = [
    {
      path: 'first_name',
      label: 'Name',
      content: (client) => (
        <Link to={`/clients/${client.id}`}>{`${client.first_name} ${client.last_name}`}</Link>
      ),
    },
    {
      path: 'email',
      key: 'email',
      label: 'Email',
      content: (client) => client.email,
    },
    {
      path: 'created_at',
      label: 'Created At',
      content: (client) => <span>{`${formatDateToPST(client.created_at)} PST`}</span>,
    },
    {
      path: 'account_status',
      key: 'account_status',
      label: 'Status',
      content: (client) => <Badge status={client.account_status} />,
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
    getClients();
  }, [currentPage, sortColumn, searchQuery]);

  /* TODO: remove and base this off URL path */
  const newDonorPageBCT = [
    { pageName: 'Home', url: 'localhost:3000' },
    { pageName: 'Client', url: 'localhost:3000' },
    { pageName: 'All', url: 'localhost:3000' },
  ];

  return (
    <div className="container">
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
      <div className="row">
        <DataTable columns={columns} data={clients} sortColumn={sortColumn} onSort={handleSort} />

        <Spinner loading={loading} />

        <Pagination
          itemsCount={itemsCount}
          pageSize={defaultPageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ClientsPage;
