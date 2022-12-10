import React, { useState } from 'react';
import styles from './style.module.css';

function ErrorPopUp(props) {
  const [show, setShow] = useState(true);
  const [errorMessage, setErrorMessage] = useState('Something went wrong while processing the application status update. Please try again.');
  const disapear = () => setShow(false);
  const { apiErrorMessage } = props;

  if (apiErrorMessage) setErrorMessage(apiErrorMessage);

  return (
    <div>
      {show && (
        <div className={styles.container}>
          <div className={styles.topBar}>
            ERROR OCCURRED
          </div>
          <div className={styles.mainBody}>
            <p>
              {errorMessage}
            </p>
            <div className={styles.buttonContainer}>
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

export default ErrorPopUp;
