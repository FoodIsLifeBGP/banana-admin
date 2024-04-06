import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

import Button from '../Button';
import Icon from '../Icon';
import Pagination from '../../Components/Pagination';
import Search from '../../Components/Search';

import styles from './style.module.scss';

const sortTypeCallbacks = {
  string: (a, b) => a.localeCompare(b),
  number: (a, b) => a - b,
  boolean: (a, b) => (a === b ? 0 : a ? 1 : -1),
};

function DataTable({ columns, data, initialState, buttonText, buttonRoute }) {
  const [sorting, setSorting] = useState(initialState.sorting);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [tableData, setTableData] = useState([]);

  const navigate = useNavigate();

  const handleSortClick = (id) => {
    const newSort = { ...sorting };
    if (newSort.id === id) {
      newSort.desc = !newSort.desc;
    } else {
      newSort.id = id;
      newSort.desc = false;
    }
    setSorting(newSort);
  };

  const renderSortIcon = (column) => {
    if (column.sortBy !== sorting.id) return null;
    return !sorting.desc ? <Icon name="sort-up" /> : <Icon name="sort-down" />;
  };

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return item[column.sortBy];
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    // prettier-ignore
    const result = data.filter(
      (data) =>
        `${data.first_name} ${data.last_name}`.toLowerCase().includes(query.toLowerCase()) ||
        `${data.email}`.toLowerCase().includes(query.toLowerCase()) ||
        `${data.account_status}`.toLowerCase().includes(query.toLowerCase()),
    );
    setTableData(result);
  };

  const createKey = (item, column) => `${item.id}${column.sortBy || column.key || column.sortBy}`;

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <>
      <div className="row mb-3 align-items-center">
        <div className="col">
          <Search value={searchQuery} onChange={handleSearch} />
        </div>
        {buttonText && buttonRoute && (
          <Button variant="buttonPrimary" text={buttonText} action={() => navigate(buttonRoute)} />
        )}
      </div>
      <Table striped responsive>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.path || column.key || column.sortBy}
                onClick={() => handleSortClick(column.sortBy)}
              >
                {column.label} {renderSortIcon(column)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData
            .sort((a, b) => {
              const sortFunction = sortTypeCallbacks[typeof a[sorting.id]];
              let sortResult = sortFunction(a[sorting.id], b[sorting.id]);
              if (sorting.desc) {
                sortResult *= -1;
              }
              return sortResult;
              // sorting.desc ? b[sorting.id] - a[sorting.id] : a[sorting.id] - b[sorting.id]
            })
            .slice(
              (currentPage - 1) * initialState.pagination.pageSize,
              currentPage * initialState.pagination.pageSize,
            )
            .map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td key={createKey(item, column)}>{renderCell(item, column)}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
      <Pagination
        itemsCount={tableData.length}
        pageSize={initialState.pagination.pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default DataTable;
