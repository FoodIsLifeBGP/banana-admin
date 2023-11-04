import React from 'react';
import { DataTable, Pagination } from '../Components/DataTable';

export default {
  title: 'DataTable',
  component: DataTable,
};

export function Presentation() {
  const currentPage = 1;
  const pageSize = 4;
  const sortColumn = { path: 'firstName', order: 'asc' };
  const columns = [
    { path: 'firstName', label: 'FirstName' },
    { path: 'lastName', label: 'LastName' },
    {
      key: 'detail',
      label: 'Detail',
      content: (user) => <a href="test">{`${user.firstName} ${user.lastName}`}</a>,
    },
  ];
  const allUsers = [
    { id: '1', firstName: 'John', lastName: 'Doe' },
    { id: '2', firstName: 'Jane', lastName: 'Smith' },
    { id: '3', firstName: 'Michael', lastName: 'Johnson' },
    { id: '4', firstName: 'Emily', lastName: 'Davis' },
    { id: '5', firstName: 'William', lastName: 'Brown' },
    { id: '6', firstName: 'Olivia', lastName: 'Garcia' },
    { id: '7', firstName: 'James', lastName: 'Martinez' },
    { id: '8', firstName: 'Sophia', lastName: 'Anderson' },
    { id: '9', firstName: 'Benjamin', lastName: 'Wilson' },
    { id: '10', firstName: 'Isabella', lastName: 'Taylor' },
  ];

  const handleSort = () => {

  };
  const handlePageChange = () => {

  };

  return (
    <>
      <DataTable
        columns={columns}
        data={allUsers}
        sortColumn={sortColumn}
        onSort={handleSort}
      />
      <Pagination
        itemsCount={10}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
