import React from "react";
import styles from "./style.module.css";

function ApplicationStatusForm() {
  return (
    <div className={styles.container}>
      <h3>Decisions</h3>
      <form className={styles.applicationStatusForm}>
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

export default ApplicationStatusForm;
