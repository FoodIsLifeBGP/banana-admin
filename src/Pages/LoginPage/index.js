import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button as BootstrapButton, Container, Col, Row, Form,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

import Icon from '../../Components/Icon';
import Input from '../../Components/Input/index';
import useGlobal from '../../state/index';
import Spinner from '../../Components/Spinner/Spinner';

import styles from './style.module.scss';

export default function LoginPage() {
  const [, { logIn }] = useGlobal();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const clearEmailAndPassword = () => {
    setEmail('');
    setPassword('');
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    /* NOTE: `store` is implicitly passed to an "action" */
    const statusCode = await logIn({ email, password });
    setLoading(false);

    switch (statusCode) {
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
      toast.warn(`Server replied with ${statusCode} status code`);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <Spinner loading={loading} fullscreen />
      <div className={styles.borderspace} />
      <div className={styles.mainspace}>
        <Container className="h-100 align-items-center d-flex justify-content-center">
          <Row>
            <Col lg={10} className="mx-auto">
              <Row className={styles.titlerow}>
                <Col sm={6}>
                  <Icon name="bananaIcon" size={200} />
                </Col>
                <Col sm={6}>
                  <h1 className={styles.title}>BANANA PORTAL</h1>
                </Col>
              </Row>
              <Form sm={12} className="mx-auto">
                <Input
                  id="email"
                  name="email"
                  iconName="user"
                  placeholder="Email"
                  className={styles.inputrow}
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
                <Input
                  id="password"
                  name="password"
                  iconName="lock"
                  placeholder="Password"
                  type="password"
                  className={styles.inputrow}
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
                <div className="mt-5 mx-5 row row-cols-2 formSubmit">
                  <BootstrapButton
                    className={`col ${styles.button}`}
                    onClick={(event) => handleLogin(event)}
                  >
                    Login
                  </BootstrapButton>
                  <a href="/" className="col">
                    <p>Forgot password?</p>
                  </a>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
