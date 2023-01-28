import React from 'react';
import styles from './style.module.css';

function BreadCrumb(props) {
  const { breadCrumbTrail } = props;
  // breadCrumbTrail is an array of dictionaries with the
  // pages and their respective links links to.
  // EX.
  // const breadCrumbTrail = [
  //   { pageName: 'Honky Tonk', url: 'localhost:3000' },
  //   { pageName: 'Donors', url: 'localhost:3000' },
  //   { pageName: 'New Applications', url: 'localhost:3000' },
  // ];

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
          <li
            className="breadcrumb-item"
            key={entry.index}
          >
            <a href={entry.value.url}>
              {entry.value.pageName}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default BreadCrumb;
