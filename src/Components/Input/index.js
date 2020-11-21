import React from 'react';
import {
  Col,
  Row,
  InputGroup,
  InputGroupAddon,
  Input as BootstrapInput
} from 'reactstrap';
import Icon from '../Icon/index.js'
import PropTypes from 'prop-types';
import styles from './style.module.scss';


// This should be placed inside a reactstrap Container component

function Input(props) {
  // Icon names at this point are those found at https://materializecss.com/icons.html
  const {className, iconName, id, name, onChange, placeholder, type} = props;
  console.log(styles.icon);
  console.log(styles.container);

  const renderIcon = () => {
    if(iconName && iconName !== "") {
      return (
      <InputGroupAddon addonType="prepend" className={styles.icon}>
        <Icon name={iconName} size={20}/>
      </InputGroupAddon>
      )
    } else {
      return null;
    }
  }

  const inputClass = (iconName && iconName !== "") ? styles.pictured : styles.unpictured;
  return (
    <Row className={className}>
      <Col>
        <InputGroup className={styles.container}>
          {renderIcon()}
          <BootstrapInput className={inputClass} id={id} name={name} onChange={onChange} placeholder={placeholder} type={type || "text"} />
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
  type: PropTypes.string
};

Input.defaultProps = {
};

export default Input;
