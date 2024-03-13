import React from 'react';
import PropTypes from 'prop-types';
import { Button as BootstrapButton } from 'reactstrap';
import styles from './style.module.scss';
import Icon from '../Icon';
import iconMap from '../Icon/map';

/**
 * Custom Bootstrap Button Component
 *
 * Props:
 * - `text` (string|object): The content to be displayed on the button. Required.
 * - `style` (object): Custom style properties to apply to the button. Default is an empty object.
 * - `action` (function): The function to call when the button is clicked. Required.
 * - `variant` (string): Defines the button's appearance style. Options include:
 *   - `buttonPrimary`: Primary button styling.
 *   - `buttonSecondary`: Secondary button styling.
 *   - `buttonDanger`: Danger or warning button styling.
 *   - `buttonSuccess`: Success button styling.
 *   - `buttonPlainText`: Plain text button styling without background.
 *   - `buttonIcon`: Button styling specifically for buttons containing only an icon.
 *   Default is `buttonSecondary`.
 * - `buttonType` (string): The native HTML type attribute for the button (`button`, `submit`, etc.)
 * - `iconName` (string): Name of the icon to display from the `iconMap`. This is optional.
 *
 * Additional props (`...rest`) are spread onto the underlying BootstrapButton component.
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
  ]),
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
  text: '',
};

export default Button;
