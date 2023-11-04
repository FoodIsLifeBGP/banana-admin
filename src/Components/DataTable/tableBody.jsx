import React from 'react';

function TableBody({ data, columns }) {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return item[column.path];
  };

  const createKey = (item, column) => item.id + (column.path || column.key);

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          {columns.map((column) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
export default TableBody;
