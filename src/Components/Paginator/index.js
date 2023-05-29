import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import styles from './style.module.scss';

function Paginator(props) {
  // Need to pass in number of entries and desired entries per page
  // TODO: implement pagination with a 'pagy' obj that gets sent to/from the
  // backend
  const {
    pages, currentPage, paginate, nextPage, priorPage,
  } = props;
  const pageNumbers = [];

  // Get pages
  for (let i = 1; i <= pages; i += 1) {
    pageNumbers.push(i);
  }

  return (
    <Pagination aria-label="Page navigation" className={styles.paginationStyle}>
      <PaginationItem onClick={() => priorPage(currentPage)} disabled={currentPage === 1}>
        <PaginationLink>
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
          key={number + 1}
        >
          <PaginationLink className={number === currentPage ? styles.paginationLinkStyle : ''}>
            <span className={styles.pagTabText}>
              {number}
            </span>
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem onClick={() => nextPage(currentPage)} disabled={currentPage === pages}>
        <PaginationLink>
          <span className={currentPage !== pages ? styles.pagTabText : ''}>
            &raquo;
          </span>
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
}

export default Paginator;
