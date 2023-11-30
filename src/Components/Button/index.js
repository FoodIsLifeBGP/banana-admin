import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

function Button({
  text, style, action, variant, buttonType = 'button',
}) {
  const buttonClass = `${styles.buttonContainer} ${styles[variant] || styles.buttonDefault}`;

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={buttonType} onClick={action} className={buttonClass} style={style}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  style: PropTypes.object,
  action: PropTypes.func.isRequired,
  variant: PropTypes.oneOfType([
    'buttonPrimary',
    'buttonSecondary',
    'buttonDanger',
    'buttonSuccess',
  ]).isRequired,
};

export default Button;
