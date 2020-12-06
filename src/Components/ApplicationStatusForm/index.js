import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";

function ApplicationStatusForm({ handleSubmit }) {
  return (
    <div className={styles.container}>
      <h3>Decisions</h3>
      <form className={styles.applicationStatusForm} onSubmit={handleSubmit}>
        <select className={styles.dropdown} value=''>
          <option value=''>Please Select...</option>
          <option value='pending'>Pending</option>
          <option value='active'>Active</option>
        </select>
        <input
          className={styles.buttonContainer}
          type='submit'
          value='Confirm'
        />
      </form>
    </div>
  );
}

ApplicationStatusForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

ApplicationStatusForm.defaultProps = {};

export default ApplicationStatusForm;
