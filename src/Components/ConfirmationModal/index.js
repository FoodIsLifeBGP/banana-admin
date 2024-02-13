import React, { useState, useRef } from 'react';
import Modal from '../Modal';
import styles from './style.module.scss';

function ConfirmationModal({ apiSuccessMessage, firstName, lastName }) {
  const [show, setShow] = useState(true);
  const modalContentRef = useRef(null);

  const fName = firstName || 'Johnny';
  const lName = lastName || 'Appleseed';
  let successMessage = `${fName} ${lName} was added as admin.`;

  if (apiSuccessMessage) {
    successMessage = apiSuccessMessage;
  }

  return (
    <Modal
      title="CONFIRMATION"
      modalOpen={show}
      setModalOpen={setShow}
      toggle={() => setShow(!show)}
      className={styles.container}
      modalContentRef={modalContentRef}
    >
      <p>{successMessage}</p>
    </Modal>
  );
}

export default ConfirmationModal;
