import React from 'react';
import { Breadcrumb as StrapBreadcrumb, BreadcrumbItem } from 'reactstrap';
import styles from './style.module.scss';

function BreadCrumb(props) {
  // breadCrumbTrail is an array of dictionaries with the
  // pages and their respective links.
  // EX.
  // const breadCrumbTrail = [
  //   { pageName: 'Home', url: 'localhost:3000' },
  //   { pageName: 'Donors', url: 'localhost:3000' },
  //   { pageName: 'New Applications', url: 'localhost:3000' },
  // ];
  const { breadCrumbTrail } = props;
  const breadCrumbTrailMap = [];

  if (breadCrumbTrail) {
    for (let i = 0; i < breadCrumbTrail.length; i += 1) {
      const newPage = { index: i + 1, value: breadCrumbTrail[i] };
      breadCrumbTrailMap.push(newPage);
    }
  }
  return (
    <StrapBreadcrumb cssModule={styles}>
      {breadCrumbTrailMap.map((page) => (
        <BreadcrumbItem key={page.index}>
          <a className={styles.linkStyle} href={page.value.url}>
            {page.value.pageName}
          </a>
        </BreadcrumbItem>
      ))}
    </StrapBreadcrumb>
  );
}

export default BreadCrumb;
