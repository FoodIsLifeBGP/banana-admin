import React from 'react';
import {
  Col,
  Row,
  InputGroup,
  Input as BootstrapInput,
} from 'reactstrap';
import PropTypes from 'prop-types';
import Icon from '../Icon/index';
import styles from './style.module.scss';

// This should be placed inside a reactstrap Container component

function Input(props) {
  // Icon names at this point are those found at https://materializecss.com/icons.html
  const {
    className, iconName, id, name, onChange, placeholder, type,
  } = props;

  const renderIcon = () => {
    if (iconName && iconName !== '') {
      return (
        <Icon name={iconName} size={20} className={styles.icon} />
      );
    }
    return null;
  };

  const inputClass = (iconName && iconName !== '') ? styles.pictured : styles.unpictured;
  return (
    <Row className={className}>
      <Col>
        <InputGroup className={styles.container}>
          {renderIcon()}
          <BootstrapInput className={inputClass} id={id} name={name} onChange={onChange} placeholder={placeholder} type={type || 'text'} />
        </InputGroup>
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
  type: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  iconName: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
