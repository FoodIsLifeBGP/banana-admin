import React, { useState } from 'react';
import { v4 } from 'uuid';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import styles from './style.module.scss';
import Status from '../Status';

function Paginator() {
  const testData = [
    {
      name: 'Zach Gallaway',
      businessName: 'Food 4 U',
      dateRegistered: '2020/07/07',
      status: 'active',
    },
    {
      name: 'Maxwell Countryman Skewes',
      businessName: "Max's Country Meats",
      dateRegistered: '2018/06/12',
      status: 'pending',
    },
    {
      name: 'Ian Scott',
      businessName: 'Scotts Tots',
      dateRegistered: '2014/01/11',
      status: 'inactive',
    },
    {
      name: 'Jerry Goodman',
      businessName: 'Goodman Grocers',
      dateRegistered: '2017/04/12',
      status: 'incomplete',
    },
    {
      name: 'Freddie Mercury',
      businessName: 'Chocolate Voices',
      dateRegistered: '2017/03/28',
      status: 'suspended',
    },
    {
      name: 'Bill Burr',
      businessName: "BB's BBQ",
      dateRegistered: '2020/07/4',
      status: 'closed',
    },
    {
      name: 'Lebron James',
      businessName: 'Food 4 U',
      dateRegistered: '2020/07/07',
      status: 'active',
    },
    {
      name: 'Erin Potter',
      businessName: "Max's Country Meats",
      dateRegistered: '2018/06/12',
      status: 'pending',
    },
    {
      name: 'Kurt Bradshaw',
      businessName: 'Scotts Tots',
      dateRegistered: '2014/01/11',
      status: 'inactive',
    },
    {
      name: 'Justin Gatlin',
      businessName: 'Goodman Grocers',
      dateRegistered: '2017/04/12',
      status: 'incomplete',
    },
    {
      name: 'Jeff Bridges',
      businessName: 'Chocolate Voices',
      dateRegistered: '2017/03/28',
      status: 'suspended',
    },
    {
      name: 'Kiernan Omalley',
      businessName: "BB's BBQ",
      dateRegistered: '2020/07/4',
      status: 'closed',
    },
  ];

  // Get current entries
  const entriesPerPage = 4;
  const pages = Math.ceil(testData.length / entriesPerPage);
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = testData.slice(indexOfFirstEntry, indexOfLastEntry);

  // Get pages
  for (let i = 1; i <= Math.ceil(pages); i += 1) {
    pageNumbers.push(i);
  }

  // Go to specific page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to prior page
  const priorPage = (pageNumber) => setCurrentPage(pageNumber - 1);

  // Go to next page
  const nextPage = (pageNumber) => setCurrentPage(pageNumber + 1);

  return (
    <nav>
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
        {currentEntries.map((entry, index) => (
          <tr key={v4()}>
            <td>{index + 1}</td>
            <td>{entry.name}</td>
            <td>{entry.businessName}</td>
            <td>{entry.dateRegistered}</td>
            <td className={styles.status}><Status statusState={entry.status} /></td>
          </tr>
        ))}
      </table>

      <Pagination aria-label="Page navigation example" className={styles.pagination}>
        {currentPage !== 1
          && (
            <PaginationItem onClick={() => priorPage(currentPage)}>
              <PaginationLink href="#">
                <span className={styles.pagtabtext}>
                  &laquo;
                </span>
              </PaginationLink>
            </PaginationItem>
          )}
        {pageNumbers.map((number) => (
          <PaginationItem
            active={number === currentPage}
            onClick={() => paginate(number)}
            className="paginationItemStyle"
          >
            <PaginationLink href="#" className="paginationLinkStyle">
              <span className={styles.pagtabtext}>
                {number}
              </span>
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage !== pages
          && (
            <PaginationItem onClick={() => nextPage(currentPage)}>
              <PaginationLink href="#">
                <span className={styles.pagtabtext}>
                  &raquo;
                </span>
              </PaginationLink>
            </PaginationItem>
          )}
      </Pagination>
    </nav>
  );
}

export default Paginator;
