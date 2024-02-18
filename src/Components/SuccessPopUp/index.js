import React, { useState } from 'react';
import Button from '../Button';
import styles from './style.module.scss';

function SuccessPopUp({ apiSuccessMessage }) {
  const [show, setShow] = useState(true);
  let successMessage = 'The application status has been successfully updated.';

  if (apiSuccessMessage) {
    successMessage = apiSuccessMessage;
  }

  const handleUndo = () => {
    /* TODO: implement the Undo functionality here */
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
