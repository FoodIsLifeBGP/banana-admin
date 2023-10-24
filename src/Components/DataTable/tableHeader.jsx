import React from 'react';

// columns: array
// sortColumn: object
// onSort: function

function TableHeader({ columns, sortColumn, onSort }) {
  const raiseSort = (path) => {
    const currentSortColumn = { ...sortColumn };
    if (currentSortColumn.path === path) {
      currentSortColumn.order = currentSortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      currentSortColumn.path = path;
      currentSortColumn.order = 'asc';
    }
    onSort(currentSortColumn);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <i className="fa fa-sort-up" />;
    return <i className="fa fa-sort-down" />;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className="clickable"
            // key={column.path || column.key}
            key={column.path}
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
            {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
