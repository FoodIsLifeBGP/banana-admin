import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import BreadCrumb from '../../Components/BreadCrumb';
import DataTable from '../../Components/DataTable';
import Modal from '../../Components/Modal';
import Button from '../../Components/Button';

import { useGlobalStateContext } from '../../contexts/GlobalStateContext';
import { getAdminIndex, updateAdminStatus } from '../../Services/AdminsService';
import { formatDateToPST } from '../../util/utilities';

import styles from './style.module.scss';

function AdminsPage() {
  const count = 1000;
  const [admins, setAdmins] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const navigate = useNavigate();
  const { showToast, showSpinner } = useGlobalStateContext();

  const getAdmins = async () => {
    showSpinner(true);
    try {
      const response = await getAdminIndex(1, count, 'id', 'asc');
      setAdmins(response.data);
    } catch (error) {
      setAdmins([]);
      showToast({ message: 'Failed to fetch data', variant: 'danger' });
    } finally {
      showSpinner(false);
    }
  };

  const deactivateAdmin = async (admin) => {
    showSpinner(true);
    try {
      await updateAdminStatus(admin.id, 'inactive');
    } catch (error) {
      showToast({ message: 'Failed to deactivate admin', variant: 'danger' });
    } finally {
      showSpinner(false);
    }
  };

  const columns = [
    {
      sortBy: 'first_name',
      label: 'Name',
      content: (admin) => (
        <Link to={`/admins/${admin.id}`}>{`${admin.first_name} ${admin.last_name}`}</Link>
      ),
    },
    {
      sortBy: 'email',
      key: 'email',
      label: 'Email',
      content: (admin) => admin.email,
    },
    {
      sortBy: 'created_at',
      label: 'Created At',
      content: (admin) => <span>{`${formatDateToPST(admin.created_at)} PST`}</span>,
    },
    {
      sortBy: 'status',
      label: 'Status',
      content: (admin) => admin.account_status,
    },
    {
      sortBy: 'user_type',
      label: 'User Type',
      content: (admin) => (admin.user_type === 'admin' ? 'Admin' : 'Super Admin'),
    },
    {
      key: 'account_status',
      label: 'Actions',
      content: (admin) => (
        <div className="d-flex">
          <Button
            type="button"
            iconName="edit"
            className={`col btn btn-sm ${styles.editButton}`}
            action={() => navigate(`/admins/${admin.id}`)}
          />
          <Button
            type="button"
            iconName="trash"
            className={`col btn btn-sm ${styles.deactivateButton} mx-1`}
            action={() => {
              setSelectedAdmin(admin);
              setModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAdmins();
  }, []);

  const newDonorPageBCT = [
    { pageName: 'Admins', url: '/admins' },
    { pageName: 'Client', url: '/clients' },
    { pageName: 'Donors', url: '/donors' },
  ];

  return (
    <>
      <div className={`${styles.adminsPage}`}>
        <div className={styles.breadCrumbTrail}>
          <BreadCrumb breadCrumbTrail={newDonorPageBCT} />
        </div>
        <div className="row mt-4 mb-4 d-flex">
          <h2 className={`${styles.header} col-8 text-start`}>All Admins</h2>
        </div>
        <div className="row">
          <DataTable
            data={admins}
            columns={columns}
            initialState={{
              sorting: { id: 'first_name', desc: false },
              pagination: { pageIndex: 0, pageSize: 12 },
            }}
            buttonText={'Add Admin'}
            buttonRoute={'/admins/create'}
          />
        </div>
      </div>
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        title="DEACTIVATE ADMIN?"
        buttonsConfig={[
          {
            text: 'Back',
            variant: 'buttonSecondary',
            action: () => setModalOpen(false), // Closes the modal
          },
          {
            text: 'Confirm',
            variant: 'buttonDanger',
            action: () => {
              // Define what happens when 'Confirm' is clicked.
              // For example, deactivate the admin and close the modal:
              deactivateAdmin(selectedAdmin); // This function needs to be hooked to the back end.
              setModalOpen(false);
            },
          },
        ]}
      >
        {selectedAdmin && (
          <p>{`Are you sure you want to deactivate ${selectedAdmin.first_name} ${selectedAdmin.last_name}'s access?`}</p>
        )}
      </Modal>
    </>
  );
}

export default AdminsPage;
