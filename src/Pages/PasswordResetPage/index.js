import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
} from 'reactstrap';
import { useGlobalStateContext } from '../../contexts/GlobalStateContext';
import Button from '../../Components/Button';
import { passwordReset } from '../../Services/AdminsService';

import Icon from '../../Components/Icon';
import Spinner from '../../Components/Spinner/Spinner';

import styles from './style.module.scss';

export default function PasswordResetPage() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showFirstPassword, setShowFirstPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);
  const [passwordToggleActivated, setPasswordToggleActivated] = useState(false);

  const { showToast } = useGlobalStateContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      showToast({ message: "Passwords don't match.", variant: 'warning' });
      setLoading(false);
      return;
    }

    try {
      const response = await passwordReset(token, newPassword);
      setLoading(true);
      if (response.status >= 200 && response.status <= 299) {
        showToast({ message: 'Password reset successful.', variant: 'success' });
        setLoading(false);

        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (error) {
      showToast({ message: 'Password reset failed.', variant: 'danger' });
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (showPassword) => {
    if (showPassword) {
      return <Icon name="visibleEye" className={styles.passwordIcon} />;
    }
    return <Icon name="hiddenEye" className={styles.passwordIcon} />;
  };

  return (
    <div className={styles.container}>
      <Spinner loading={loading} fullscreen />
      <Container className="h-100 align-items-center d-flex justify-content-center">
        <Col sm={12} md={8}>
          <Form onSubmit={handleSubmit}>
            <h2 className={styles.title}>Reset Your Password</h2>
            <FormGroup>
              <InputGroup className={styles.inputGroup}>
                <InputGroupText
                  onClick={
                    passwordToggleActivated
                      ? () => setShowFirstPassword(!showFirstPassword)
                      : null
                  }
                >
                  {passwordToggleActivated ? togglePasswordVisibility(showFirstPassword) : <Icon name="lock" className={styles.passwordIcon} />}
                </InputGroupText>
                <Input
                  type={showFirstPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={({ target }) => setNewPassword(target.value)}
                  onFocus={() => setPasswordToggleActivated(true)}
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className={styles.inputGroup}>
                <InputGroupText
                  onClick={
                    passwordToggleActivated
                      ? () => setShowSecondPassword(!showSecondPassword)
                      : null
                  }
                >
                  {passwordToggleActivated ? togglePasswordVisibility(showSecondPassword) : <Icon name="lock" className={styles.passwordIcon} />}
                </InputGroupText>
                <Input
                  type={showSecondPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={({ target }) => setConfirmPassword(target.value)}
                  onFocus={() => setPasswordToggleActivated(true)}
                  required
                />
              </InputGroup>
            </FormGroup>
            <div className={styles.formSubmit}>
              <Button
                text="Cancel"
                variant="buttonDanger"
                action={() => navigate('/login')}
              />
              <Button
                text="Submit"
                type="submit"
                variant="buttonPrimary"
                action={(event) => handleSubmit(event)}
              />
            </div>
          </Form>
        </Col>
      </Container>
    </div>
  );
}
