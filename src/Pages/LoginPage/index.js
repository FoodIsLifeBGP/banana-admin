import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
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

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    // TODO: build login functionality
  };

  return (
    <div className={styles.container}>
      <div className={styles.borderspace} />
      <div className={styles.mainspace}>
        <Container>
          <Row>
            <Col lg={8} push="l2">
              <Row className={styles.titlerow}>
                <Col sm={6}>
                  <Icon name="bananaIcon" size={200} />
                </Col>
                <Col sm={6}>
                  <h1 className={styles.title}>BANANA PORTAL</h1>
                </Col>
              </Row>
              <Form onSubmit={onSubmit}>
                <Input
                  id="email"
                  name="email"
                  iconName="user"
                  placeholder="Email"
                  onChange={setEmail}
                  className={styles.inputrow}
                />
                <Input
                  id="password"
                  name="password"
                  iconName="lock"
                  placeholder="Password"
                  type="password"
                  onChange={setPassword}
                  className={styles.inputrow}
                />
                {/* TODO: allow Input to return a Button object */}
                <BootstrapButton onClick={onSubmit}>Submit</BootstrapButton>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
