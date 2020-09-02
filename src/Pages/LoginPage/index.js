import React, {useState} from 'react';
import {
  Col,
  Row
} from 'react-materialize';
import Input from '../../Components/Input';
import Icon from '../../Components/Icon';
import styles from './style.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.borderspace} />
      <div className={styles.mainspace}>
        <Row>
          <Col l={8} push="l2">
            <Row>
              <Col s={6}>
                <Icon name="bananaIcon" size={200} />
              </Col>
              <Col s={6}>
                <h1 className={styles.title}>BANANA PORTAL</h1>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}