import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Button from '../Button';
import Icon from '../Icon';
import Spinner from '../Spinner/Spinner';

import { GetAdmin, CreateAdmin, UpdateAdmin } from '../../Services/AdminsService';

import styles from './style.module.css';

function NewAdminForm() {
  const initialFormData = {
    id: undefined,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  const { id } = useParams();
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

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

  const getAdminById = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const response = await GetAdmin(id);
      if (response && response.admin) {
        setFormData({
          ...initialFormData,
          firstName: response.admin.first_name,
          lastName: response.admin.last_name,
          email: response.admin.email,
          password: '',
        });
      } else {
        toast.error(`Admin data not found: ${id}`);
      }
    } catch (error) {
      toast.error(`Failed to get admin with Id ${id}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdminById();
  }, [id]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await UpdateAdmin(id, formData);
        toast.success('Admin updated successfully');
        navigate('/admins');
      } else {
        await CreateAdmin(formData.firstName, formData.lastName, formData.email, formData.password);
        toast.success('Admin created successfully');
        navigate('/admins');
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.error || 'Operation failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" onSubmit={onSubmit}>
      <h3>
        {id ? 'Modify ' : 'Add New '}
        Admin
      </h3>
      <form className={styles.newAdminForm}>
        <label htmlFor="firstName" className={styles.fieldContainer}>
          <div className={styles.labelName}>First Name</div>
          <input
            id="firstName"
            onChange={handleOnChange}
            type="text"
            name="firstName"
            placeholder="First name"
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
            placeholder="Last name"
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
            placeholder="Email"
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
            placeholder="New admin password"
            value={formData.password}
          />
          <radio onClick={handlePassword} onKeyDown={() => {}}>
            {showPassword ? <Icon name="visibleEye" /> : <Icon name="hiddenEye" />}
          </radio>
        </label>
        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            variant="buttonSecondary"
            text="Back"
            action={() => navigate('/admins')}
          />
          <Button type="submit" variant="buttonPrimary" text="Confirm" action={onSubmit} />
        </div>
      </form>
      <Spinner loading={loading} />
      <ToastContainer />
    </div>
  );
}

export default NewAdminForm;
