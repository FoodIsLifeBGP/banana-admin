import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import DataTable from '../../Components/DataTable';
import Pagination from '../../Components/Pagination';
import Modal from '../../Components/Modal';
import Search from '../../Components/Search';
import Button from '../../Components/Button';
import { useGlobalStateContext } from '../../contexts/GlobalStateContext';

import { getAdminIndex, updateAdminStatus } from '../../Services/AdminsService';

import { formatDateToPST } from '../../util/utilities';
import styles from './style.module.scss';

function AdminsPage() {
  const defaultPageSize = 8;
  const [admins, setAdmins] = useState([]);
  const [sortColumn, setSortColumn] = useState({ sortBy: 'id', orderBy: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const navigate = useNavigate();
  const { showToast, showSpinner } = useGlobalStateContext();

  const getAdmins = async () => {
    try {
      showSpinner(true);
      const { sortBy, orderBy } = sortColumn;
      const response = await getAdminIndex(currentPage, defaultPageSize, sortBy, orderBy);
      setItemsCount(response.pagy.count);
      setAdmins(response.data);
    } catch (error) {
      setItemsCount(0);
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
      sortBy: 'name',
      label: 'Name',
      content: (admin) => (
        <Link to={`/admins/${admin.id}`}>{`${admin.first_name} ${admin.last_name}`}</Link>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      content: (client) => client.email,
    },
    {
      sortBy: 'created_at',
      label: 'Created At',
      content: (admin) => <span>{`${formatDateToPST(admin.created_at)} PST`}</span>,
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
    getAdmins();
  }, [currentPage, sortColumn, searchQuery]);

  return (
    <>
      <div className={`${styles.adminsPage}`}>
        <div className="row mt-4 mb-4 d-flex">
          <h2 className={`${styles.header} col-8 text-start`}>All Admins</h2>
          <div className="col">
            <Search value={searchQuery} onChange={handleSearch} />
          </div>
        </div>
        <div className="row">
          <DataTable columns={columns} data={admins} sortColumn={sortColumn} onSort={handleSort} />
          <Pagination
            itemsCount={itemsCount}
            pageSize={defaultPageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
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
