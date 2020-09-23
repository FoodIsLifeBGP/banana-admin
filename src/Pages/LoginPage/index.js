import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {
  Container,
  Col,
  Row
} from 'reactstrap';
import Input from '../../Components/Input';
import Icon from '../../Components/Icon';
import styles from './style.module.scss';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          donor: {
            email: email, 
            password: password}
          })
    }
    fetch(`${process.env.BASE_URL}/admin_auth`, body)
    .then(res => {
      if(res.ok) {
        res.json()
        .then(json => { localStorage.setItem("userInfo", JSON.stringify(json)); })
        .then(() => <Redirect to="/" />)
      } else {
        res.json()
        .then(json => {alert(json.message)})
      }
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.borderspace} />
      <div className={styles.mainspace}>
        <Container>
          <Row>
            <Col lg={8} push="l2">
              <Row>
                <Col sm={6}>
                  <Icon name="bananaIcon" size={200} />
                </Col>
                <Col sm={6}>
                  <h1 className={styles.title}>BANANA PORTAL</h1>
                </Col>
              </Row>
              <form onSubmit={onSubmit}>
                <Input
                  id="email"
                  name="email"
                  iconName="user"
                  placeholder="Email"
                  onChange={setEmail}
                />
                <Input
                  id="password"
                  name="password"
                  iconName="lock"
                  placeholder="Password"
                  type="password"
                  onChange={setPassword}
                />
                {/* TODO: allow Input to return a Button object */}
                <input type="submit" value="Submit" />
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}