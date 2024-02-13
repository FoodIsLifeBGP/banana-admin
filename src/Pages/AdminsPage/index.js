import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import DataTable from '../../Components/DataTable';
import Pagination from '../../Components/Pagination';
import Modal from '../../Components/Modal';
import Search from '../../Components/Search';
import Spinner from '../../Components/Spinner/Spinner';
import Button from '../../Components/Button';
import Layout from '../../Components/Layout';

// The next line will be uncommented when the back end is ready:
// import { GetAdmins, UpdateAdminStatus } from '../../Services/AdminsService';

import { formatDateToPST } from '../../util/utilities';
import styles from './style.module.scss';

function AdminsPage() {
  const defaultPageSize = 8;
  const [admins, setAdmins] = useState([]);
  const [sortColumn, setSortColumn] = useState({ sort_by: 'no', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const modalContentRef = useRef(null);

  const navigate = useNavigate();

  const mockAdmins = [
    {
      id: 1,
      account_status: 'inactive',
      created_at: '2023-10-01T01:34:45.243Z',
      email: 'zachary@olson.com',
      first_name: 'Naoma',
      last_name: 'Rogahn',
    },
    {
      id: 2,
      account_status: 'active',
      created_at: '2023-10-01T01:34:46.354Z',
      email: 'darron@adams-harvey.name',
      first_name: 'Jamal',
      last_name: 'Ziemann',
    },
    {
      id: 3,
      account_status: 'suspended',
      created_at: '2023-10-01T01:34:48.028Z',
      email: 'elisha@gusikowski.biz',
      first_name: 'Freeman',
      last_name: 'Lind',
    },
    {
      id: 4,
      account_status: 'active',
      created_at: '2023-10-01T01:34:48.620Z',
      email: 'carley.considine@turcotte.info',
      first_name: 'Ward',
      last_name: 'MacGyver',
    },
    {
      id: 5,
      account_status: 'active',
      created_at: '2023-10-01T01:34:49.217Z',
      email: 'mario@tremblay.io',
      first_name: 'Roland',
      last_name: 'Anderson',
    },
    {
      id: 6,
      account_status: 'inactive',
      created_at: '2023-10-01T01:34:49.803Z',
      email: 'page_mann@beer.name',
      first_name: 'Stacey',
      last_name: 'Yundt',
    },
    {
      id: 7,
      account_status: 'suspended',
      created_at: '2023-10-01T01:34:50.367Z',
      email: 'willie.jakubowski@krajcik.name',
      first_name: 'Cruz',
      last_name: 'Cremin',
    },
    {
      id: 8,
      account_status: 'approved',
      created_at: '2023-10-01T01:34:50.944Z',
      email: 'jetta_abshire@wisozk.co',
      first_name: 'Nicholas',
      last_name: 'Heathcote',
    },
  ];

  const getAdmins = async () => {
    setLoading(true);
    try {
      // const response = await GetAdmins();
      // setItemsCount(response.pagy.count);
      // const response = await GetAdmins(currentPage, defaultPageSize);
      // setItemsCount(response.pagy.count);
      // TODO: remove mock data
      setAdmins(mockAdmins);
      // setAdmins(response.data);
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
      // TODO: uncomment the next line when the back end is ready and remove the alert
      // await UpdateAdminStatus(admin.id, 'inactive');
      alert(
        `Deactivating ${admin.first_name} ${admin.last_name}...not really, but it will eventually do so once the back end routes are ready`,
      );
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
          <Button
            type="button"
            iconName="edit"
            className={`col btn btn-sm ${styles.editButton}`}
            onClick={() => navigate(`/admins/${admin.id}`)}
          >
            Edit
          </Button>
          <Button
            type="button"
            iconName="trash"
            className={`col btn btn-sm ${styles.deactivateButton}`}
            onClick={() => {
              setSelectedAdmin(admin);
              setModalOpen(true);
            }}
          >
            Deactivate
          </Button>
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
    <Layout>
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
    </Layout>
  );
}

export default AdminsPage;
