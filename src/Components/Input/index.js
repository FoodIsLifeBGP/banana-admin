import React from 'react';
import {
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText
} from '@coreui/react';
import {CIcon} from '@coreui/icons-react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

function Input(props) {
  // eslint-disable-next-line no-empty-pattern
  const {iconName, id, name, placeholder, type} = props;
  return (
    <div className={styles.container}>
      <CInputGroup>
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon name={iconName} />
          </CInputGroupText>
        </CInputGroupPrepend>
        <CInput
          type={type || "text"}
          id={id}
          name={name}
          placeholder={placeholder}
        ></CInput>
      </CInputGroup>
    </div>
  );
}

Input.propTypes = {
  iconName: PropTypes.string,
  placeholder: PropTypes.string
};

Input.defaultProps = {
};

export default Input;
