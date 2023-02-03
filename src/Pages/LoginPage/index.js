import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button as BootstrapButton,
  Container,
  Col,
  Row,
  Form,
} from 'reactstrap';
import Input from '../../Components/Input/index';
import Icon from '../../Components/Icon';
import styles from './style.module.scss';
import useGlobal from '../../state/index';

export default function LoginPage() {
  const [{ userIdentity, loginUrl }, { logIn, logOut, updateAlert }] = useGlobal();

  console.log('state', userIdentity);
  console.log('actions', logIn);
  console.log('actions', logOut);
  console.log('actions', updateAlert);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const clearEmailAndPassword = () => {
    setEmail('');
    setPassword('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const statusCode = await logIn(userIdentity, loginUrl, { email, password });

    switch (statusCode) {
    case 202: {
      clearEmailAndPassword();
      navigate('HomePage');
      return;
    }
    case 401: alert('Incorrect email or password'); return; /* TODO: create `Alert` component instead of using default */
    case 404: alert('Server not found - please try again'); return;
    case 500: alert('Network error - please try again'); return;
    default: alert(`Server replied with ${statusCode} status code`);
    }
  };

  return (
    <div className={styles.container}>
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
                  setValue={setEmail}
                  onChange={handleEmailChange}
                />
                <Input
                  id="password"
                  name="password"
                  iconName="lock"
                  placeholder="Password"
                  type="password"
                  className={styles.inputrow}
                  value={password}
                  setValue={setPassword}
                  onChange={handlePasswordChange}
                />
                {/* TODO: allow Input to return a Button object */}
                <div className="mt-5 mx-5 row row-cols-2 formSubmit">
                  <BootstrapButton
                    className={`col ${styles.button}`}
                    onClick={handleLogin}
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
