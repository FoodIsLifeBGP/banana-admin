import React, { useState } from 'react';
// import PropTypes from 'prop-types';
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
    <div className={styles.container}>
      <h3>Add New Admin</h3>
      <form className={styles.newAdminForm}>
        <label htmlFor="firstName" className={styles.fieldContainer}>
          <div className={styles.labelName}>
            First Name
          </div>
          <input
            id="firstName"
            onChange={handleOnChange}
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
          />
        </label>
        <label htmlFor="lastName" className={styles.fieldContainer}>
          <div className={styles.labelName}>Last name</div>
          <input
            id="lastName"
            onChange={handleOnChange}
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
          />
        </label>
        <label htmlFor="email" className={styles.fieldContainer}>
          <div className={styles.labelName}>Email</div>
          <input
            id="email"
            onChange={handleOnChange}
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
          />
        </label>
        <label htmlFor="password" className={styles.fieldContainer}>
          <div className={styles.labelName}>Enter Password</div>
          <input
            id="password"
            onChange={handleOnChange}
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter Super Admin password"
            value={formData.password}
          />
          <radio onClick={handlePassword} onKeyDown={() => {}}>
            {showPassword ? (<Icon name="visibleEye" />) : (<Icon name="hiddenEye" />) }
          </radio>
        </label>
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
