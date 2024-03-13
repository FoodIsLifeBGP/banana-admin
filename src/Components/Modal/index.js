/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import styles from './style.module.scss';

function Modal({
  modalOpen,
  setModalOpen,
  children,
  title,
  buttonsConfig,
}) {
  const handleOverlayClick = (e) => {
    /* close modal when user clicks outside of modal content container */
    if (e.target !== e.currentTarget) return;

    setModalOpen(false);
  };

  const defaultButtonConfig = [
    {
      text: 'Okay',
      variant: 'buttonPrimary',
      action: () => setModalOpen(false),
    },
  ];

  const finalButtonsConfig = buttonsConfig || defaultButtonConfig;

  return modalOpen ? (
    <dialog onClick={handleOverlayClick} className={styles.modal}>
      <div className={styles.modalContent}>
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
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  buttonsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      variant: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
    }),
  ),
};

Modal.defaultProps = {
  children: null,
};

export default Modal;
