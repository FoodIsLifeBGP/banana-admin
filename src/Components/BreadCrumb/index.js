import React from 'react';
import styles from './style.module.css';

function BreadCrumb(props) {
  const { breadCrumbTrail } = props;
  // breadCrumbTrail is an array with the
  // pages you want links to. EX: ['Home', 'Donors', 'New Applications'];
  const breadCrumbTrailMap = [];

  if (breadCrumbTrail) {
    for (let i = 0; i < breadCrumbTrail.length; i += 1) {
      const newPage = { index: i + 1, value: breadCrumbTrail[i] };
      breadCrumbTrailMap.push(newPage);
    }
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className={styles.breadcrumb}>
        {breadCrumbTrailMap.map((entry) => (
          <li className="breadcrumb-item" key={entry.index}><a href="#">{entry.value}</a></li>
        ))}
      </ol>
    </nav>
  );
}

export default BreadCrumb;
