import React, { useState } from 'react';
import Button from '../Button';
import styles from './style.module.css';

function SuccessPopUp(props) {
  const [show, setShow] = useState(true);
  let successMessage = 'The application status has been successfully updated.';
  const { apiSuccessMessage } = props;

  if (apiSuccessMessage) {
    successMessage = apiSuccessMessage;
  }

  const handleUndo = () => {
    // Implement the Undo functionality here
    console.log('Undo action triggered');
  };

  return (
    <div>
      {show && (
        <div className={styles.container}>
          <div className={styles.topBar}>Application Status Change</div>
          <div className={styles.mainBody}>
            <p>{successMessage}</p>
            <div className={styles.buttonContainer}>
              <Button
                text="Okay"
                variant="buttonPrimary"
                action={() => setShow(false)}
              />
              <Button
                text="Undo"
                variant="buttonSecondary"
                action={handleUndo}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SuccessPopUp;
