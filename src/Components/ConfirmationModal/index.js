import React, { useState } from 'react';
import styles from './style.module.scss';

function ConfirmationModal(props) {

  const [show, setShow] = useState(true);
  const { apiSuccessMessage, firstName, lastName } = props;
  let fName = 'Johnny'
  let lName = 'Appleseed'
  if (firstName && lastName) {
    fName = firstName
    lName = lastName
  }
  let successMessage = `${fName} ${lName} was added as admin.`
  if (apiSuccessMessage) {
    successMessage = apiSuccessMessage;
  }

  return (
    <div>
      {show && (
        <div className={styles.container}>
          <div className={styles.topBar}>
            CONFIRMATION
          </div>
          <div className={styles.mainBody}>
            <p>
              {successMessage}
            </p>
            <div className={styles.buttonContainer}>
              <input
                className={styles.okayButton}
                type="submit"
                value="Okay"
                onClick={() => setShow(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmationModal;
