import React, { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import styles from './style.module.scss';

function Paginator(props) {
  // Need to pass in number of entries and desired entries per page
  const { entries, entriesPerPage } = props;
  const pages = Math.ceil(entries / entriesPerPage);
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);

  // Below 3 lines can be reused on the page component
  // const indexOfLastEntry = currentPage * entriesPerPage;
  // const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  // const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

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
    <Pagination aria-label="Page navigation example" className={styles.paginationStyle}>
      {currentPage !== 1
        && (
          <PaginationItem onClick={() => priorPage(currentPage)}>
            <PaginationLink href="#">
              <span className={styles.pagTabText}>
                &laquo;
              </span>
            </PaginationLink>
          </PaginationItem>
        )}
      {pageNumbers.map((number) => (
        <PaginationItem
          onClick={() => paginate(number)}
          className={number === currentPage ? 'activeSquare paginationItemStyle' : 'paginationItemStyle'}
          active={number === currentPage}
        >
          <PaginationLink href="#" className={number === currentPage ? styles.paginationLinkStyle : ''}>
            <span className={styles.pagTabText}>
              {number}
            </span>
          </PaginationLink>
        </PaginationItem>
      ))}
      {currentPage !== pages
        && (
          <PaginationItem onClick={() => nextPage(currentPage)}>
            <PaginationLink href="#">
              <span className={styles.pagTabText}>
                &raquo;
              </span>
            </PaginationLink>
          </PaginationItem>
        )}
    </Pagination>
  );
}

export default Paginator;
