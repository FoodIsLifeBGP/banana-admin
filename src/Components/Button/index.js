import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

function Button(props) {
  const { text, style, action } = props;
  return (
    <button type="button" onClick={action} className={styles.buttonContainer} style={style}>
      {text}
    </button>
  );
}
Button.propTypes = {
  text: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  style: PropTypes.object,
};
export default Button;
