import React, {useEffect} from 'react';
import styles from './style.module.css';
import { v4 } from 'uuid';
import Status from '../Status';


function DataTable({ data, type }){
  const columns =
    type === 'client'
      ? ['no', 'account_status', 'first_name', 'last_name', 'email']
      : ['no', 'name', 'business name', 'date registered', 'status'];

    useEffect(()=> {
    

    },[])

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={v4()}>
            {type === 'client' ? (
              <>
                <td>no {row.id}</td>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.email}</td>
                <td>{row.account_status}</td>
              </>
            ) : (
              <>
                <td>no {row.id}</td>
                <td>{row.name}</td>
                <td>{row.business_name}</td>
                <td>{row.date_registered}</td>
                <td className={styles.status}><Status statusState={row.status}/></td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;


  
