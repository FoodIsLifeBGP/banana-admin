import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import Status from '../Status';
import { v4 } from 'uuid';

const testData = [
  {
    name: "Zach Gallaway",
    businessName: "Food 4 U",
    dateRegistered: "2020/07/07",
    status: "active"
  },
  {
    name: "Maxwell Countryman Skewes",
    businessName: "Max's Country Meats",
    dateRegistered: "2018/06/12",
    status: "pending"
  },
  {
    name: "Ian Scott",
    businessName: "Scotts Tots",
    dateRegistered: "2014/01/11",
    status: "inactive"
  },
  {
    name: "Jerry Goodman",
    businessName: "Goodman Grocers",
    dateRegistered: "2017/04/12",
    status: "incomplete"
  },
  {
    name: "Freddie Mercury",
    businessName: "Chocolate Voices",
    dateRegistered: "2017/03/28",
    status: "suspended"
  },
  {
    name: "Bill Burr",
    businessName: "BB's BBQ",
    dateRegistered: "2020/07/4",
    status: "closed"
  },
]

function UserList (props) {
  //const { data } = props;

  return (
      <table>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Business Name</th>
          <th>Date Registered</th>
          <th>Status</th>
        </tr>

        {/* Replace testData.map with line below for production
        {data.map((entry, index) => {  */}
        {testData.map((entry, index) => {
          return(
            <tr key={v4()}>
              <td>{index + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.businessName}</td>
              <td>{entry.dateRegistered}</td>
              <td className={styles.status}><Status statusState={entry.status} /></td>
            </tr>
          )
        })}

      </table>
  
  );
}

UserList.propTypes = {
  // data: PropTypes.array.isRequired,
};

export default UserList;
