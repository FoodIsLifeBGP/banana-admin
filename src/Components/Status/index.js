import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

function Status(props) {
  const { statusState } = props;

  let statusText = '';
  let statusClassName = '';

  switch (statusState) {
  case 'pending':
    statusText = 'Pending';
    statusClassName = styles.pendingDiv;
    break;
  case 'active':
    statusText = 'Active';
    statusClassName = styles.activeDiv;
    break;
  case 'inactive':
    statusText = 'Inactive';
    statusClassName = styles.inactiveDiv;
    break;
  case 'incomplete':
    statusText = 'Incomplete';
    statusClassName = styles.incompleteDiv;
    break;
  case 'suspended':
    statusText = 'Suspended';
    statusClassName = styles.suspendedDiv;
    break;
  case 'closed':
    statusText = 'Closed';
    statusClassName = styles.closedDiv;
    break;
  default:
    statusText = 'Unknown';
  }

  return (
    <div className={statusClassName} aria-label={`Status: ${statusText}`}>
      <p className={styles.text}>
        <strong className={statusState === 'active' || statusState === 'closed' ? styles.whiteText : ''}>
          {statusText}
        </strong>
      </p>
    </div>
  );
}

Status.propTypes = {
  statusState: PropTypes.string.isRequired,
};

export default Status;
