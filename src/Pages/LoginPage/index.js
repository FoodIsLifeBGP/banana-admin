import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Col,
  Form,
  InputGroup,
  InputGroupText,
  Input as BootstrapInput,

} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useGlobalStateContext } from '../../contexts/GlobalStateContext';

import Button from '../../Components/Button';
import Icon from '../../Components/Icon';
import Spinner from '../../Components/Spinner/Spinner';
import useMediaQuery from '../../util/useMediaQuery';

import styles from './style.module.scss';

export default function LoginPage() {
  const { logIn } = useGlobalStateContext();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const clearEmailAndPassword = () => {
    setEmail('');
    setPassword('');
  };

  const handleForgotPassword = async () => {
    // TODO: implement once backend is ready
    console.log('lost PW');
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
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <Spinner loading={loading} fullscreen />
      <div className={styles.borderspace} />
      <div className={styles.mainspace}>
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
                  <BootstrapInput
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                  />
                </InputGroup>
                <InputGroup className={styles.inputrow}>
                  <InputGroupText>
                    <Icon name="lock" className={styles.inputIcon} />
                  </InputGroupText>
                  <BootstrapInput
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
                    action={(event) => handleForgotPassword(event)}
                  />
                </div>
              </Form>
            </Col>
          </Col>
        </Container>
      </div>
    </div>
  );
}
