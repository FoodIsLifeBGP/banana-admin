import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

function Button({
  text, style, action, variant,
}) {
  const buttonClass = `${styles.buttonContainer} ${
    variant === 'buttonPrimary' ? styles.buttonPrimary : styles.buttonSecondary
  }`;

  return (
    <button type="button" onClick={action} className={buttonClass} style={style}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  style: PropTypes.object,
  action: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Button;
