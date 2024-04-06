import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../Components/Badge';
import BreadCrumb from '../../Components/BreadCrumb';

import { GetDonors } from '../../Services/DonorsService';
import DataTable from '../../Components/DataTable';

import { useGlobalStateContext } from '../../contexts/GlobalStateContext';
import { formatDateToPST } from '../../util/utilities';

import styles from './style.module.scss';

function DonorPage() {
  const count = 1000;
  const [donors, setDonors] = useState([]);

  const { showToast, showSpinner } = useGlobalStateContext();

  const getDonors = async () => {
    showSpinner(true);
    try {
      const response = await GetDonors(1, count, 'id', 'asc');
      setDonors(response.data);
    } catch (error) {
      setDonors([]);
      showToast({ message: 'Failed to fetch data', variant: 'danger' });
    } finally {
      showSpinner(false);
    }
  };

  const columns = [
    {
      sortBy: 'first_name',
      label: 'Name',
      content: (donor) => (
        <Link to={`/donors/${donor.id}`}>{`${donor.first_name} ${donor.last_name}`}</Link>
      ),
    },
    {
      sortBy: 'email',
      label: 'Email',
      content: (donor) => donor.email,
    },
    { sortBy: 'organization_name', label: 'Organization' },
    {
      sortBy: 'created_at',
      label: 'Created At',
      content: (donor) => <span>{`${formatDateToPST(donor.created_at)} PST`}</span>,
    },
    {
      sortBy: 'account_status',
      key: 'account_status',
      label: 'Status',
      content: (donor) => <Badge status={donor.account_status} />,
    },
  ];

  useEffect(() => {
    getDonors();
  }, []);

  const newDonorPageBCT = [
    { pageName: 'Admins', url: '/admins' },
    { pageName: 'Client', url: '/clients' },
    { pageName: 'Donors', url: '/donors' },
  ];

  return (
    <>
      <div className={styles.breadCrumbTrail}>
        <BreadCrumb breadCrumbTrail={newDonorPageBCT} />
      </div>
      <div className={styles.headerBar}>
        <h2 className={styles.headerLeft}>NEW DONOR APPLICATIONS</h2>
      </div>
      <div className="row w-100">
        <DataTable
          data={donors}
          columns={columns}
          className={styles.newDonorTable}
          initialState={{
            sorting: { id: 'first_name', desc: false },
            pagination: { pageIndex: 0, pageSize: 12 },
          }}
        />
      </div>
    </>
  );
}

export default DonorPage;
