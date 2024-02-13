import React, { useState } from 'react';
import Button from '../Button';
import styles from './style.module.css';

function ErrorPopUp(props) {
  const [show, setShow] = useState(true);
  let errorMessage = 'Something went wrong while processing the application status update. Please try again.';
  const { apiErrorMessage } = props;
  if (apiErrorMessage) {
    errorMessage = apiErrorMessage;
  }

  return (
    <div>
      {show && (
        <div className={styles.container}>
          <div className={styles.topBar}>
            ERROR OCCURRED
          </div>
          <div className={styles.mainBody}>
            <p>{errorMessage}</p>
            <div className={styles.buttonContainer}>
              <Button
                text="Okay"
                variant="buttonPrimary"
                action={() => setShow(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ErrorPopUp;
