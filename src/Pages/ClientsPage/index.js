import React, { useEffect, useState } from 'react';
import { DataTable, Pagination } from '../../Components/DataTable';
import Navbar from '../../Components/Navbar';
import SearchBox from '../../Components/SearchBox';

const mockData = [
  {
    no: 1,
    name: 'John',
    dateSubmitted: '2023-10-22',
    status: 'pending',
  },
  {
    no: 2,
    name: 'Jane',
    dateSubmitted: '2023-10-21',
    status: 'approved',
  },
  {
    no: 3,
    name: 'Bob',
    dateSubmitted: '2023-10-20',
    status: 'rejected',
  },
  {
    no: 4,
    name: 'Alice',
    dateSubmitted: '2023-10-19',
    status: 'pending',
  },
  {
    no: 5,
    name: 'David',
    dateSubmitted: '2023-10-18',
    status: 'approved',
  },
  {
    no: 6,
    name: 'Sarah',
    dateSubmitted: '2023-10-17',
    status: 'rejected',
  },
  {
    no: 7,
    name: 'Tom',
    dateSubmitted: '2023-10-16',
    status: 'pending',
  },
  {
    no: 8,
    name: 'Emily',
    dateSubmitted: '2023-10-15',
    status: 'approved',
  },
  {
    no: 9,
    name: 'Mike',
    dateSubmitted: '2023-10-14',
    status: 'rejected',
  },
  {
    no: 10,
    name: 'Olivia',
    dateSubmitted: '2023-10-13',
    status: 'pending',
  },
];

function ClientsPage() {
  const defaultPageSize = 5;
  const [clients, setClients] = useState([]);
  const [sortColumn, setSortColumn] = useState({ path: 'no', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Todo: call the api
  const getClients = async () => {
    const startEntry = (currentPage - 1) * defaultPageSize;
    let endEntry = 0; // arbitrary
    if (currentPage * defaultPageSize <= mockData.length) {
      endEntry = currentPage * defaultPageSize;
    } else {
      endEntry = mockData.length;
      endEntry = mockData.length;
    }

    let data = mockData.sort((a, b) => {
      if (sortColumn.order === 'asc') {
        return a[sortColumn.path] > b[sortColumn.path] ? 1 : -1;
      }
      return a[sortColumn.path] < b[sortColumn.path] ? 1 : -1;
    });

    if (searchQuery) {
      data = data.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setItemsCount(data.length);
    return data.slice(startEntry, endEntry);
  };

  const columns = [
    { path: 'no', label: 'No' },
    { path: 'name', label: 'Name' },
    { path: 'dateSubmitted', label: 'Date Submitted' },
    {
      key: 'status',
      label: 'Status',
      content: (client) => {
        switch (client.status) {
        case 'approved':
          return <span className="badge badge-success">{client.status}</span>;
        case 'rejected':
          return <span className="badge badge-danger">{client.status}</span>;
        case 'pending':
          return <span className="badge badge-warning">{client.status}</span>;
        default:
          return <span>{client.status}</span>;
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

  useEffect(async () => {
    setClients(await getClients());
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
            <SearchBox value={searchQuery} onChange={handleSearch} />
          </div>
          <div className="col-3 float-end">
            <button type="button" className="btn btn-primary btn-lg ">
              All Applications
            </button>
          </div>
        </div>
        <div className="row">
          <DataTable
            columns={columns}
            data={clients}
            sortColumn={sortColumn}
            onSort={handleSort}
          />

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
