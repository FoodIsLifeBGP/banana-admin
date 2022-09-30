import React from 'react';
import { Navbar } from 'reactstrap';
import styles from './style.module.css';

function Pagination() {
  const pages = 4;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(pages); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.container}>
      <Navbar />
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="!#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" href="!#" aria-label="Previous">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
