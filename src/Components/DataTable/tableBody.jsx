import React from 'react';
import UpdateDonorStatus from '../../Services/DonorStatusUpdate';
import UpdateClientStatus from '../../Services/ClientSatusUpdate';

function TableBody({ data, columns }) {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return item[column.path];
  };

  const createKey = (item, column) => item.id + (column.path || column.key);

  // TODO: Erase below. This is just to show the api call functionality.
  const handleRowClick = async (item) => {
    try {
      if (item.pickup_instructions) {
        const response = await UpdateDonorStatus(item.id, 'active');
        console.log(item);
        console.log(response);
      } else {
        const response = await UpdateClientStatus(item.id, 'incomplete');
        console.log(item);
        console.log(response);
      }
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
