import React, { useState } from 'react';
import { Table } from 'reactstrap';
import Icon from '../Icon';
import './style.module.scss';

function DataTable({
  columns, data, onSort: handleSort, sortColumn,
}) {
  const [sort, setSort] = useState(sortColumn);

  const handleSortClick = (path) => {
    const newSort = { ...sort };
    if (newSort.path === path) {
      newSort.order = newSort.order === 'asc' ? 'desc' : 'asc';
    } else {
      newSort.path = path;
      newSort.order = 'asc';
    }
    setSort(newSort);
    handleSort(newSort);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sort.path) return null;
    return sort.order === 'asc' ? <Icon name="sort-up" /> : <Icon name="sort-down" />;
  };

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return item[column.path];
  };

  const createKey = (item, column) => `${item.id}${column.path || column.key || column.sortBy}`;

  return (
    <Table striped responsive>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.path || column.key || column.sortBy}
              onClick={() => handleSortClick(column.path)}
            >
              {column.label}
              {' '}
              {renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={createKey(item, column)}>{renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DataTable;
