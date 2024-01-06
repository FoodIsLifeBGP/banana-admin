import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import styles from './style.module.scss';

function Modal(props) {
  const {
    modalOpen,
    setModalOpen,
    modalContentRef,
    children,
    title,
    buttonsConfig,
  } = props;

  const defaultButtonConfig = [
    {
      text: 'Okay',
      variant: 'buttonPrimary',
      action: () => setModalOpen(false),
    },
  ];

  const finalButtonsConfig = buttonsConfig || defaultButtonConfig;

  return modalOpen ? (
    <dialog className={styles.modal}>
      <div className={styles.modalContent} ref={modalContentRef}>
        <div className={styles.modalHeader}>
          {title && <p className={styles.modalTitle}>{title}</p>}
        </div>
        <div className={styles.modalBody}>
          {children}
          <div className={styles.modalButtons}>
            {finalButtonsConfig.map((button) => (
              <Button
                key={button.text}
                text={button.text}
                variant={button.variant}
                action={button.action}
              />
            ))}
          </div>
        </div>
      </div>
    </dialog>
  ) : null;
}

Modal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  modalContentRef: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  buttonsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      variant: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
    }),
  ).isRequired,
};

export default Modal;
