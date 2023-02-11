import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
    const value = e.target.value;
    setFormData({
      ...formData,
      [key]: value,
    });
  }

  return (
    <div className={styles.container}>
      <h3>Add New Admin</h3>
      <form className={styles.newAdminForm}>
        <div className={styles.fieldContainer}>
          <label htmlFor="firstName">First name</label>
          <input
            onChange={handleOnChange}
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
          />
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor="lastName">Last name</label>
          <input
            onChange={handleOnChange}
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName} />
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleOnChange}
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email} />
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor="password">Enter Password </label>
          <input
            onChange={handleOnChange}
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter Super Admin password"
            value={formData.password} />
          <i onClick={handlePassword}>
            {showPassword ? (<Icon name="visibleEye" />) : (<Icon name="hiddenEye" />) }
          </i>
        </div>
        <div className={styles.buttonContainer}>
          <input type='submit' value='Back' id={styles.buttonBack} />
          <input
            type="submit"
            value="Confirm"
            id={styles.buttonConfirm} />
        </div>
      </form>
    </div>
  );
}

export default NewAdminForm;
