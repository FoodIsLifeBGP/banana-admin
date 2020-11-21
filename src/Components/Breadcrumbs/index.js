import React from 'react';
import { Link } from '@react-navigation/native';
import PropTypes from 'prop-types';
import styles from './style.module.css';

const Breadcrumbs = (props) => {

  const makeCrumbs = (crumbs) => {
    if (crumbs.length) {
      return crumbs.map = (crumb => {
        return (
          <Link key={i} to={`/${crumb.path}`}>
            {crumbs.title}
          </Link>
          </>
          );
        })
      }
    };
    
return (
  <div className={styles.Breadcrumbs} aria-label="breadcrumb">
    <Link to="/" className={styles.Breadcrumb}>
      Home
        </Link>

    {makeCrumbs}
  </div>
);
};

Breadcrumbs.propTypes = {
  crumbs: PropTypes.shape({
    path: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
};

export default Breadcrumbs;
