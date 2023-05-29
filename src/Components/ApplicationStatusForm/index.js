import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

function ApplicationStatusForm({ title, handleSubmit }) {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <form className={styles.applicationStatusForm} onSubmit={handleSubmit}>
        <select className={styles.dropdown} value="">
          <option value="">Please Select...</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
          <option value="incomplete">Incomplete</option>
          <option value="closed">Closed</option>
        </select>
        <input
          className={styles.buttonContainer}
          type="submit"
          value="Confirm"
        />
      </form>
    </div>
  );
}

ApplicationStatusForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

ApplicationStatusForm.defaultProps = {};

export default ApplicationStatusForm;
