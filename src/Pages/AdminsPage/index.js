import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { DataTable, Pagination } from '../../Components/DataTable';
import Icon from '../../Components/Icon';
import Modal from '../../Components/Modal';
import Search from '../../Components/Search';
import Spinner from '../../Components/Spinner/Spinner';

// The next line will be uncommented when the back end is ready:
import { GetAdmins, UpdateAdminStatus } from '../../Services/AdminsService';

import formatDateToPST from '../../util/utilities';

import styles from './style.module.scss';

function AdminsPage() {
  const defaultPageSize = 8;
  const [admins, setAdmins] = useState([]);
  const [sortColumn, setSortColumn] = useState({ path: 'id', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const modalContentRef = useRef(null);

  const navigate = useNavigate();

  const getAdmins = async () => {
    setLoading(true);
    try {
      const { path, order } = sortColumn;
      const response = await GetAdmins(currentPage, defaultPageSize, path, order);
      setItemsCount(response.pagy.count);
      setAdmins(response.data);
    } catch (error) {
      setItemsCount(0);
      setAdmins([]);
      toast.error('Failed to fetch data');
    }
    setLoading(false);
  };

  const deactivateAdmin = async (admin) => {
    setLoading(true);
    try {
      await UpdateAdminStatus(admin.id, 'inactive');
      setLoading(false);
    } catch (error) {
      toast.error('Failed to deactivate admin');
    }
  };

  const columns = [
    {
      path: 'name',
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
      path: 'created_at',
      label: 'Created At',
      content: (admin) => <span>{`${formatDateToPST(admin.created_at)} PST`}</span>,
    },
    {
      key: 'account_status',
      label: 'Actions',
      content: (admin) => (
        <div className="row space-between gap-3">
          <button
            type="button"
            className={`col btn btn-sm ${styles.editButton}`}
            onClick={() => navigate(`/admins/${admin.id}`)}
          >
            <Icon name="edit" size={24} className="me-2" />
            Edit
          </button>
          <button
            type="button"
            className={`col btn btn-sm ${styles.deactivateButton}`}
            onClick={() => {
              setSelectedAdmin(admin);
              setModalOpen(true);
            }}
          >
            <Icon name="trash" size={22} className="me-2" />
            Deactivate
          </button>
        </div>
      ),
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
    getAdmins();
  }, [currentPage, sortColumn, searchQuery]);

  return (
    <>
      <div className={`${styles.adminsPage}`}>
        <div className="row mt-4 mb-4 d-flex">
          <h1 className="col-8 text-start">All Admins</h1>
          <div className="col">
            <Search value={searchQuery} onChange={handleSearch} />
          </div>
        </div>
        <div className="row">
          <DataTable columns={columns} data={admins} sortColumn={sortColumn} onSort={handleSort} />

          <Spinner loading={loading} />

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
        modalContentRef={modalContentRef}
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
