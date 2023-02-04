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
  const [, { logIn }] = useGlobal();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clearEmailAndPassword = () => {
    setEmail('');
    setPassword('');
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    /* NOTE: `store` is implicitly passed to an "action" */
    const statusCode = await logIn({ email, password });

    switch (statusCode) {
    case 202: {
      clearEmailAndPassword();
      navigate('/home');
      return;
    }
    /* TODO: create `Alert` component instead of using default JS `alert()` */
    // eslint-disable-next-line no-alert
    case 401: alert('Incorrect email or password'); return;
    // eslint-disable-next-line no-alert
    case 404: alert('Server not found - please try again'); return;
    // eslint-disable-next-line no-alert
    case 500: alert('Network error - please try again'); return;
    // eslint-disable-next-line no-alert
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
