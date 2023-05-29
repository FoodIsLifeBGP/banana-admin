import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

export default function Status({ statusState }) {
  const parsedState = statusState.charAt(0).toUpperCase() + statusState.slice(1);

  return (
    <div className={`${styles.applicationStatusLabel} ${styles[statusState]}`}>
      <strong>{parsedState}</strong>
    </div>
  );
}

Status.propTypes = {
  statusState: PropTypes.string.isRequired,
};
