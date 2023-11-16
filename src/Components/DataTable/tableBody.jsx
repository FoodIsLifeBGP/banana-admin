import React from 'react';
import UpdateDonorStatus from '../../Services/DonorStatusUpdate';

function TableBody({ data, columns }) {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return item[column.path];
  };

  const createKey = (item, column) => item.id + (column.path || column.key);

  const handleRowClick = async (item) => {
    try {
      const response = await UpdateDonorStatus(item.id, 'incomplete');
      console.log(response);
    } catch (error) {
      console.log('ERROR!!!!');
    }
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id} onClick={() => handleRowClick(item)}>
          {columns.map((column) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
export default TableBody;
