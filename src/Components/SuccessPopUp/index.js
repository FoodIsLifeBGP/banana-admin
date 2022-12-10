import React, { useState } from 'react';
import styles from './style.module.css';

function SuccessPopUp() {
  const [show, setShow] = useState(true);
  const disapear = () => setShow(false);
  // TODO: Create route for "Undo" button
  // Error message is the only prop

  return (
    <div>
      {show && (
        <div className={styles.container}>
          <div className={styles.topBar}>
            APPLICATION STATUS CHANGE
          </div>
          <div className={styles.mainBody}>
            <p>
              The application status has been successfully updated.
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
                onClick={() => disapear()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SuccessPopUp;
