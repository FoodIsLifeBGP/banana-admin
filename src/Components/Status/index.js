import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

function Status(props) {
  const { statusState } = props;

  if (statusState === 'pending') {
    return (
      <div className={styles.pendingDiv}>
        <p className={styles.text}><strong>Pending</strong></p>
      </div>
    );
  }

  if (statusState === 'active') {
    return (
      <div className={styles.activeDiv}>
        <p className={styles.text}><strong className={styles.whiteText}>Active</strong></p>
      </div>
    );
  }

  if (statusState === 'inactive') {
    return (
      <div className={styles.inactiveDiv}>
        <p className={styles.text}><strong className={styles.navyBlueText}>Inactive</strong></p>
      </div>
    );
  }

  if (statusState === 'incomplete') {
    return (
      <div className={styles.incompleteDiv}>
        <p className={styles.text}><strong>Incomplete</strong></p>
      </div>
    );
  }

  if (statusState === 'suspended') {
    return (
      <div className={styles.suspendedDiv}>
        <p className={styles.text}><strong>Suspended</strong></p>
      </div>
    );
  }

  if (statusState === 'closed') {
    return (
      <div className={styles.closedDiv}>
        <p className={styles.text}><strong className={styles.whiteText}>Closed</strong></p>
      </div>
    );
  }
}

Status.propTypes = {
  statusState: PropTypes.string.isRequired,
};

export default Status;
