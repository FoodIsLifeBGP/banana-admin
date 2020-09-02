import React from 'react';
import {
  Col,
  Row
} from 'react-materialize';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

function Input(props) {
  // eslint-disable-next-line no-empty-pattern
  const {iconName, id, name, onChange, placeholder, type} = props;
  console.log(styles.icon);
  console.log(styles.container);
  return (
    <Row>
      <Col l={8}>
        <div className={`input-field col ${styles.container}`}>
          <i className={`${styles.icon} material-icons prefix`}>{iconName}</i>
          <input id={id} name={name} onChange={onChange} placeholder={placeholder} type={type || "text"} />
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
