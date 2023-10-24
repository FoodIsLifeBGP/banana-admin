import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import './style.css';

function Table({
  columns, sortColumn, onSort, data,
}) {
  return (
    <table className="col-12">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
}

export default Table;
