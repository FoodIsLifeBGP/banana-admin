import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import Input from '../Input';
import styles from './style.module.css';
import Icon from '../Icon';

function NewAdminForm() {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const [showPassword, setShowPassword] = useState(false);

  function handlePassword() {
    setShowPassword(!showPassword);
  }

  function handleOnChange(e) {
    const key = e.target.name;
    const { value } = e.target;
    setFormData({
      ...formData,
      [key]: value,
    });
  }

  return (
    <div >
      <h3>Add New Admin</h3>
      <form>
        <div className={styles.fieldContainer}>
          <label htmlFor="firstName">
            <div>First name</div>
            <Input
              iconName=''
              id="firstName"
              onChange={handleOnChange}
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
            />
          </label>
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor="lastName">
            <div>Last name</div>
            <Input
              iconName=''
              id="lastName"
              onChange={handleOnChange}
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
            />
          </label>
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor="email">
            <div>Email</div>
            <Input
              iconName=''
              id="email"
              onChange={handleOnChange}
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
            />
          </label>
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor="password">
            <div>Enter Password</div>
            <Input
              iconName=''
              id="password"
              onChange={handleOnChange}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter Super Admin password"
              value={formData.password}
            />
          </label>
          <radio onClick={handlePassword} onKeyDown={() => {}}>
            {showPassword ? (<Icon name="visibleEye" />) : (<Icon name="hiddenEye" />) }
          </radio>
        </div>
        <div className={styles.buttonContainer}>
          <input type="submit" value="Back" id={styles.buttonBack} />
          <input
            type="submit"
            value="Confirm"
            id={styles.buttonConfirm}
          />
        </div>
      </form>
    </div>
  );
}

export default NewAdminForm;
