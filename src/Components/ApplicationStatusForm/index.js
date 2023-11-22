import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

function ApplicationStatusForm({
  title, handleSubmit, donor, client, userId,
}) {
  // State to store the selected account status
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    // Check if donor or client props are available and set the account status
    if (donor && donor.account_status) {
      setSelectedStatus(donor.account_status);
    } else if (client && client.account_status) {
      setSelectedStatus(client.account_status);
    }
  }, [donor, client]); // Dependencies for useEffect

  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <form
        className={styles.applicationStatusForm}
        onSubmit={(e) => handleSubmit(e, selectedStatus, userId)}
      >
        <select
          className={styles.dropdown}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Please Select...</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
          <option value="incomplete">Incomplete</option>
          <option value="closed">Closed</option>
        </select>
        <input className={styles.buttonContainer} type="submit" value="Confirm" />
      </form>
    </div>
  );
}

ApplicationStatusForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  donor: PropTypes.object, // Add PropTypes for donor
  client: PropTypes.object, // Add PropTypes for client
};

ApplicationStatusForm.defaultProps = {
  donor: null, // Default prop for donor
  client: null, // Default prop for client
};

export default ApplicationStatusForm;
