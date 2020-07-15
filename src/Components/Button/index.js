import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

function Button(props) {
  const { text, style } = props;

  return (
    <div className={styles.buttonContainer} style={style}>
      {text}
    </div>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  style: PropTypes.object,
};

export default Button;
