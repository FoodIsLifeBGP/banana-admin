import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container, Col, Form, InputGroup, InputGroupText, Input,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

import Button from '../Button';
import Icon from '../Icon';
import Spinner from '../Spinner/Spinner';

import { GetAdmin, CreateAdmin, UpdateAdmin } from '../../Services/AdminsService';

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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const navigate = useNavigate();

  function handleOnChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
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

    getAdminById();
  }, [id]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await UpdateAdmin(id, formData);
        toast.success('Admin updated successfully');
        // navigate('/admins');
      } else {
        await CreateAdmin(formData);
        toast.success('Admin created successfully');
        // navigate('/admins');
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.error || 'Operation failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <Spinner loading={loading} />
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
