import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Input/style.module.css';

function Navbar(props) {
  // eslint-disable-next-line no-unused-vars
  const { showMenu, showNotification } = props;
  return (
    <div className={styles.container}>Navbar</div>
  );
}

Navbar.propTypes = {
  showNotification: PropTypes.bool,
  showMenu: PropTypes.bool,
};

Navbar.defaultProps = {
  showNotification: true,
  showMenu: true,
};

export default Navbar;
