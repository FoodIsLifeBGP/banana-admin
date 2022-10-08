import React, { useState } from 'react';

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

export default function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    // TODO: build login functionality
    e.preventDefault();
    fetch('https://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email, password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('token', data.jwt);
        props.handleLogin(data.user);
      });

    setEmail('');
    setPassword('');
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
                    onClick={onSubmit}
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
