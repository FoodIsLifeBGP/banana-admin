import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

function Status(props) {
  const { status } = props;

  if (status = "active") {
    return (
      <p className="status-active"><strong>Active</strong></p>
    )
  }

  if (status = "inactive") {
    return (
      <p className="status-inactive"><strong>Inactive</strong></p>
    )
  }

  if (status = "incomplete") {
    return (
      <p className="status-incomplete"><strong>Incomplete</strong></p>
    )
  }

  if (status = "suspended") {
    return (
      <p className="status-suspended"><strong>Suspended</strong></p>
    )
  }

  if (status = "closed") {
    return (
      <p className="status-closed"><strong>Closed</strong></p>
    )
  }
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
};


export default Status;