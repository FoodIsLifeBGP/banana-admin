import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Badge from '../../Components/Badge';
import BreadCrumb from '../../Components/BreadCrumb';
import DataTable from '../../Components/DataTable';
import { GetClients } from '../../Services/ClientsService';

import styles from './style.module.scss';

import { useGlobalStateContext } from '../../contexts/GlobalStateContext';
import { formatDateToPST } from '../../util/utilities';

function ClientsPage() {
  const count = 1000;
  const [clients, setClients] = useState([]);

  const { showToast, showSpinner } = useGlobalStateContext();

  const getClients = async () => {
    showSpinner(true);
    try {
      const response = await GetClients(1, count, 'id', 'asc');
      setClients(response.data);
    } catch (error) {
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

  useEffect(() => {
    getClients();
  }, []);

  const newDonorPageBCT = [
    { pageName: 'Admins', url: '/admins' },
    { pageName: 'Client', url: '/clients' },
    { pageName: 'Donors', url: '/donors' },
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
          </div>
        </div>
      </div>
      <div className="row w-100">
        <DataTable
          data={clients}
          columns={columns}
          initialState={{
            sorting: { id: 'first_name', desc: false },
            pagination: { pageIndex: 0, pageSize: 12 },
          }}
        />
      </div>
    </>
  );
}

export default ClientsPage;
