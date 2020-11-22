import React from 'react';
import { Link } from '@react-navigation/native';
import PropTypes from 'prop-types';
import styles from './style.module.css';

const Breadcrumbs = (props) => {

  const makeCrumbs = () => {
    return (props.map = ((crumb) => {
      const { label, path } = crumb;
      return (
        <Link key={label} to={`/${path}`}>
          {label}
        </Link>
      );
    }));
  };


  return (
    <div className={styles.Breadcrumbs}>
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
