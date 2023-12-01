import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import styles from './style.module.css';
import Icon from '../Icon';
import { GetAdmin, CreateAdmin } from '../../Services/AdminsService';
import Spinner from '../Spinner/Spinner';
import Layout from '../Layout';

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
    setLoading(true);
    try {
      const response = await GetAdmin(id);
      setFormData(response.admin);
    } catch (error) {
      toast.error(`Failed to get admin with Id ${id}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) getAdminById();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (id) {
      toast.error('update API not implemented yet');
      return;
    }

    setLoading(true);
    const fm = formData;
    try {
      await CreateAdmin(fm.firstName, fm.lastName, fm.email, fm.password);
      toast.success('Operation done successfully');
    } catch (error) {
      const err = error?.response?.data;
      if (err.error) toast.error(err.error);

      if (err?.errors) {
        err?.errors.forEach((e) => {
          toast.error(e);
        });
      }
    }
    setLoading(false);
  };

  return (
    <Layout>
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
              {showPassword ? (
                <Icon name="visibleEye" />
              ) : (
                <Icon name="hiddenEye" />
              )}
            </radio>
          </label>
          <div className={styles.buttonContainer}>
            <Link to="/admins" id={styles.buttonBack}>Back</Link>
            <input type="submit" value="Confirm" id={styles.buttonConfirm} />
          </div>
        </form>
        <Spinner loading={loading} />
        <ToastContainer />
      </div>
    </Layout>
  );
}

export default NewAdminForm;
