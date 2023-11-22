import React from 'react';
import PropTypes from 'prop-types';

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

Modal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  modalContentRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  children: PropTypes.node.isRequired, // children can be any renderable React elements
  title: PropTypes.string.isRequired,
};

export default Modal;
