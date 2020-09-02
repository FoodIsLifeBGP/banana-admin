import React from 'react';
import {
  Col,
  Row
} from 'react-materialize';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

function Input(props) {
  // Icon names at this point are those found at https://materializecss.com/icons.html
  const {iconName, id, name, onChange, placeholder, type} = props;
  console.log(styles.icon);
  console.log(styles.container);

  const renderIcon = () => {
    if(iconName && iconName !== "") {
      return <i className={`${styles.icon} material-icons prefix`}>{iconName}</i>
    } else {
      return null;
    }
  }

  const inputClass = (iconName && iconName !== "") ? styles.pictured : styles.unpictured
  return (
    <Row>
      <Col l={6}>
        <div className={`input-field ${styles.container}`}>
          {renderIcon()}
          <input className={inputClass} id={id} name={name} onChange={onChange} placeholder={placeholder} type={type || "text"} />
        </div>
      </Col>
    </Row>
  );
}

Input.propTypes = {
  iconName: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string
};

Input.defaultProps = {
};

export default Input;
