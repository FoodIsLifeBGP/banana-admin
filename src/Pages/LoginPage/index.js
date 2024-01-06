import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Col,
  Row,
  Form,
  InputGroup,
  InputGroupText,
  Input as BootstrapInput,

} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import Button from '../../Components/Button';
import Icon from '../../Components/Icon';
import styles from './style.module.scss';
import useGlobal from '../../state/index';
import Spinner from '../../Components/Spinner/Spinner';

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
    case 401: toast.warn('Incorrect email or password'); return;
    case 404: toast.error('Server not found - please try again'); return;
    case 500: toast.warn('Network error - please try again'); return;
    default: toast.warn(`Server replied with ${statusCode} status code`);
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
                  <Icon name="bananaIcon" size="lg" />
                </Col>
                <Col sm={6}>
                  <h1 className={styles.title}>BANANA PORTAL</h1>
                </Col>
              </Row>
              <Form sm={12} className="mx-auto">
                <InputGroup className={styles.inputrow}>
                  <InputGroupText>
                    <Icon name="user" size="sm" className={styles.icon} />
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
                    <Icon name="lock" size="sm" className={styles.icon} />
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
                <div className="mt-5 mx-5 row row-cols-2 formSubmit">
                  <Button
                    text="Login"
                    className={`col ${styles.button}`}
                    onClick={(event) => handleLogin(event)}
                  />
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
