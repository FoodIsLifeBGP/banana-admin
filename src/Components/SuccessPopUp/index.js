import React, { useState } from 'react';
import styles from './style.module.css';

function SuccessPopUp(props) {
  const [show, setShow] = useState(true);
  let successMessage = 'The application status has been successfully updated.';
  const { apiSuccessMessage } = props;
  if (apiSuccessMessage) {
    successMessage = apiSuccessMessage;
  }
  // TODO: Create route for "Undo" button
  // Success message is the only prop

  return (
    <div>
      {show && (
        <div className={styles.container}>
          <div className={styles.topBar}>
            APPLICATION STATUS CHANGE
          </div>
          <div className={styles.mainBody}>
            <p>
              {successMessage}
            </p>
            <div className={styles.buttonContainer}>
              <input
                className={styles.undoButton}
                type="submit"
                value="Undo"
              />
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

export default SuccessPopUp;
