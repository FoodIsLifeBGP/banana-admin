import React from 'react';
import { Pagination as ReactstrapPagination, PaginationItem, PaginationLink } from 'reactstrap';
import './style.module.scss';

function Pagination({
  itemsCount, pageSize, currentPage, onPageChange,
}) {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <ReactstrapPagination>
      {pages.map((page) => (
        <PaginationItem key={page} active={page === currentPage}>
          <PaginationLink onClick={() => onPageChange(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}
    </ReactstrapPagination>
  );
}

export default Pagination;
