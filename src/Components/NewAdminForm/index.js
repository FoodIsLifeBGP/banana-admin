import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container, Col, Form, InputGroup, InputGroupText, Input,
} from 'reactstrap';
import { useGlobalStateContext } from '../../contexts/GlobalStateContext';

import Button from '../Button';
import Icon from '../Icon';

import { getAdmin, createAdmin, updateAdmin } from '../../Services/AdminsService';

import styles from './style.module.scss';

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
  const [showPassword, setShowPassword] = useState(false);
  const { showToast, showSpinner } = useGlobalStateContext();

  // const navigate = useNavigate();

  function handleOnChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    const getAdminById = async () => {
      if (!id) return;
      showSpinner(true);
      try {
        const response = await getAdmin(id);
        if (response && response.admin) {
          setFormData({
            ...initialFormData,
            firstName: response.admin.first_name,
            lastName: response.admin.last_name,
            email: response.admin.email,
            password: '',
          });
        } else {
          showToast({ message: `Admin data not found: ${id}`, variant: 'warning' });
        }
      } catch (error) {
        showToast({ message: `Failed to get admin with Id ${id}`, variant: 'danger' });
      } finally {
        showSpinner(false);
      }
    };

    getAdminById();
  }, [id]);

  const onSubmit = async (event) => {
    event.preventDefault();
    showSpinner(true);
    try {
      if (id) {
        await updateAdmin(id, formData);
        showToast({ message: 'Admin updated successfully', variant: 'success' });
        // navigate('/admins');
      } else {
        await createAdmin(formData);
        showToast({ message: 'Admin updated successfully', variant: 'success' });
        // navigate('/admins');
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.error || 'Operation failed';
      showToast({ message: errorMessage, variant: 'danger' });
    } finally {
      showSpinner(false);
    }
  };

  return (
    <div className={styles.container}>
      <Container className="h-100 align-items-center d-flex justify-content-center">
        <Col sm={12}>
          <h3>
            {id ? 'Modify ' : 'Add New '}
            {' '}
            Admin
          </h3>
          <Form onSubmit={onSubmit}>
            <InputGroup className={styles.inputrow}>
              <Input
                id="firstName"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => handleOnChange(e)}
              />
            </InputGroup>

            <InputGroup className={styles.inputrow}>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => handleOnChange(e)}
              />
            </InputGroup>

            <InputGroup className={styles.inputrow}>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleOnChange(e)}
              />
            </InputGroup>

            <InputGroup className={styles.inputrow}>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleOnChange(e)}
              />
              <InputGroupText onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Icon name="hiddenEye" /> : <Icon name="visibleEye" />}
              </InputGroupText>
            </InputGroup>

            <div className={styles.formSubmit}>
              <Button
                text="Back"
                variant="buttonSecondary"
                action={() => alert('implement me!')} /* TODO: implement */
              />
              <Button
                text="Confirm"
                variant="buttonPrimary"
                action={onSubmit}
              />
            </div>
          </Form>
        </Col>
      </Container>
    </div>
  );
}

export default NewAdminForm;
