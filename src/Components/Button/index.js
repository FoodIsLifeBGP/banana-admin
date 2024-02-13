import React from 'react';
import PropTypes from 'prop-types';
import { Button as BootstrapButton } from 'reactstrap';
import styles from './style.module.scss';
import Icon from '../Icon';
import iconMap from '../Icon/map';

/**
 * Custom bootstrap button component with optional icon support.
 */
function Button({
  text, style, action, variant, buttonType = 'button', iconName, ...rest
}) {
  const buttonClass = `${styles[variant] || styles.buttonDefault}`;

  return (
    <BootstrapButton
      type={buttonType}
      onClick={action}
      className={buttonClass}
      style={style}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {iconName && <Icon name={iconName} />}
      {text}
    </BootstrapButton>
  );
}

Button.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  style: PropTypes.object,
  action: PropTypes.func.isRequired,
  variant: PropTypes.oneOf([
    'buttonPrimary',
    'buttonSecondary',
    'buttonDanger',
    'buttonSuccess',
    'buttonPlainText',
    'buttonIcon',
  ]),
  iconName: PropTypes.oneOf(Object.keys(iconMap)),
};

Button.defaultProps = {
  style: {},
  variant: 'buttonSecondary',
  iconName: null,
};

export default Button;
