import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

function Button({
  text, style, action, variant, buttonType = 'button',
}) {
  const buttonClass = `${styles[variant] || styles.buttonDefault}`;

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={buttonType} onClick={action} className={buttonClass} style={style}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  style: PropTypes.object,
  action: PropTypes.func,
  variant: PropTypes.oneOf([
    'buttonPrimary',
    'buttonSecondary',
    'buttonDanger',
    'buttonSuccess',
    'buttonPlainText',
    'buttonIcon',
  ]),
};

Button.defaultProps = {
  style: {},
  variant: 'buttonSecondary',
  action: () => {},
};

export default Button;
