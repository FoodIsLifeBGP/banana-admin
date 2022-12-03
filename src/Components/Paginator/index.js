import React, { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import styles from './style.module.scss';

function Paginator(props) {
  // Need to pass in number of entries and desired entries per page
  // TODO: implement pagination with a 'pagy' obj that gets sent to/from the
  // backend
  const { entries, entriesPerPage } = props;
  const pages = Math.ceil(entries / entriesPerPage);
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);

  // Get pages
  for (let i = 1; i <= pages; i += 1) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const priorPage = (pageNumber) => {
    if (pageNumber !== 1) {
      setCurrentPage(pageNumber - 1);
    }
  };

  const nextPage = (pageNumber) => {
    if (pageNumber !== pages) {
      setCurrentPage(pageNumber + 1);
    }
  };

  return (
    <Pagination aria-label="Page navigation" className={styles.paginationStyle}>
      <PaginationItem onClick={() => priorPage(currentPage)} disabled={currentPage === 1}>
        <PaginationLink href="#">
          <span className={currentPage !== 1 ? styles.pagTabText : ''}>
            &laquo;
          </span>
        </PaginationLink>
      </PaginationItem>
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
      <PaginationItem onClick={() => nextPage(currentPage)} disabled={currentPage === pages}>
        <PaginationLink href="#">
          <span className={currentPage !== pages ? styles.pagTabText : ''}>
            &raquo;
          </span>
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
}

export default Paginator;
