import React from 'react';

import Button from '../Button';

import styles from './style.module.scss';

function Modal(props) {
  const {
    modalOpen, setModalOpen, modalContentRef, children, title,
  } = props;

  return modalOpen ? (
    <dialog className={styles.modal}>
      <div className={styles.modalContent} ref={modalContentRef}>
        <div className={styles.modalHeader}>
          {title && <p className={styles.modalTitle}>{title}</p>}
        </div>
        <div className={styles.modalBody}>
          {children}
          <Button variant="buttonPrimary" text="Okay" action={() => setModalOpen(false)} />
        </div>
      </div>
    </dialog>
  ) : null;
}

export default Modal;
