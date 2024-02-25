import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Label,
  Input,

} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { initiatePasswordReset } from 'src/Services/AdminsService';
import { useGlobalStateContext } from '../../contexts/GlobalStateContext';

import Modal from '../../Components/Modal';
import Button from '../../Components/Button';
import Icon from '../../Components/Icon';
import Spinner from '../../Components/Spinner/Spinner';
import useMediaQuery from '../../util/useMediaQuery';
import { isValidEmail } from '../../util/utilities';

import styles from './style.module.scss';

export default function LoginPage() {
  const { logIn } = useGlobalStateContext();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [passwordResetEmail, setPasswordResetEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);

  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const clearEmailAndPassword = () => {
    setEmail('');
    setPassword('');
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setPasswordResetEmail(value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const status = await logIn({ email, password });

      // TODO: should probably be abstracted into a global "error parsing & toast" helper function
      switch (status) {
      case 202: {
        clearEmailAndPassword();
        navigate('/');
        return;
      }
      case 401:
        toast.warn('Incorrect email or password');
        return;
      case 404:
        toast.error('Server not found - please try again');
        return;
      case 500:
        toast.warn('Network error - please try again');
        return;
      default:
        toast.warn(`Server replied with ${status} status code`);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  const openForgotPasswordModal = async () => {
    setModalOpen(true);
  };

  const handleSubmitForgotPassword = async (event) => {
    event.preventDefault();

    if (isValidEmail(passwordResetEmail)) {
      try {
        const { message, status } = await initiatePasswordReset(passwordResetEmail);
        console.log('status', status);
        setResponseMessage(message);
      } catch (error) {
        console.error(error);
        setResponseMessage(error.message);
      }
    } else {
      toast.error('Invalid email.');
    }
  };

  const modalButtonConfig = () => {
    const cancelButton = {
      text: 'Back',
      variant: 'buttonSecondary',
      action: () => setModalOpen(false),
    };

    if (responseMessage) return [cancelButton];

    const updateButton = {
      text: 'Submit',
      type: 'submit',
      variant: 'buttonPrimary',
      action: handleSubmitForgotPassword,
    };

    return [cancelButton, updateButton];
  };

  return (
    <div className={styles.container}>
      <Spinner loading={loading} fullscreen />
      <div className={styles.borderspace} />
      <div className={styles.mainspace}>
        <ToastContainer />
        <Container className="h-100 align-items-center d-flex justify-content-center">
          <Col sm={12} md={8}>
            <div className="d-flex mb-5">
              <Icon name="bananaIcon" className={styles.bananaIcon} />
              <div className="d-flex flex-column">
                <h1 className={styles.title}>Banana</h1>
                <h1 className={styles.title}>Portal</h1>
              </div>
            </div>
            <Col sm={12}>
              <Form>
                <InputGroup className={styles.inputrow}>
                  <InputGroupText>
                    <Icon name="user" className={styles.inputIcon} />
                  </InputGroupText>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={({ target }) => handleEmailChange(target.value)}
                  />
                </InputGroup>
                <InputGroup className={styles.inputrow}>
                  <InputGroupText>
                    <Icon name="lock" className={styles.inputIcon} />
                  </InputGroupText>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </InputGroup>
                <div className={styles.formSubmit}>
                  <Button
                    text="Login"
                    variant={isSmallScreen ? 'buttonSecondary' : 'buttonPrimary'}
                    action={(event) => handleLogin(event)}
                  />
                  <Button
                    text="Forgot password?"
                    variant="buttonPlainText"
                    action={() => openForgotPasswordModal()}
                  />
                </div>
              </Form>
            </Col>
          </Col>
        </Container>
      </div>
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        title="Send Password Reset Email"
        buttonsConfig={modalButtonConfig()}
      >
        {responseMessage ? (
          <p>{responseMessage}</p>
        ) : (
          <Form
            onSubmit={handleSubmitForgotPassword}
            className={styles.passwordResetForm}
          >
            <FormGroup floating>
              <Input
                id="email"
                type="email"
                value={passwordResetEmail}
                onChange={({ target }) => setPasswordResetEmail(target.value)}
              />
              <Label for="email">Email</Label>
            </FormGroup>
          </Form>
        )}
      </Modal>
    </div>
  );
}
