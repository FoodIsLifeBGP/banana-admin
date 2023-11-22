import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { DataTable, Pagination } from '../../Components/DataTable';
import Navbar from '../../Components/Navbar';
import Search from '../../Components/Search';
import Spinner from '../../Components/Spinner/Spinner';

import { GetClients } from '../../Services/ClientsService';

import formatDateToPST from '../../util/utilities';

function ClientsPage() {
  const defaultPageSize = 8;
  const [clients, setClients] = useState([]);
  const [sortColumn, setSortColumn] = useState({ sort_by: 'no', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const getClients = async () => {
    setLoading(true);
    try {
      const response = await GetClients(currentPage, defaultPageSize);
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
      path: 'name',
      label: 'Name',
      content: (client) => (
        <Link to={`/clients/${client.id}`}>{`${client.first_name} ${client.last_name}`}</Link>
      ),
    },
    {
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
      key: 'account_status',
      label: 'Status',
      content: (client) => {
        switch (client.account_status) {
        case 'active':
          return <span className="badge badge-success">{client.account_status}</span>;
        case 'suspended':
          return <span className="badge badge-danger">{client.account_status}</span>;
        case 'processing':
          return <span className="badge badge-warning">{client.account_status}</span>;
        default:
          return <span className="badge">{client.account_status}</span>;
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
    getClients();
  }, [currentPage, sortColumn, searchQuery]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row mt-4 mb-4">
          <div className="col-6">
            <h2>New Applications (Client)</h2>
          </div>
          <div className="col-3">
            <Search value={searchQuery} onChange={handleSearch} />
          </div>
          <div className="col-3 float-end">
            <button type="button" className="btn btn-primary btn-lg ">
              All Applications
            </button>
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
    </div>
  );
}

export default ClientsPage;
