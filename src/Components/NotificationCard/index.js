import React from 'react';
import { Container, Row, Col } from 'reactstrap';
// import PropTypes from 'prop-types';
import styles from './style.module.css';
import ProfilePicture from '../ProfilePicture';

function NotificationCard() {
  return (
    <Container className="container container-fluid">
      <Row className="notification-container">
        <Col className="profile-container" xs="2">
          <ProfilePicture srcImage="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
        </Col>
        <Col className="d-flex flex-column justify-content-center" xs="10">
          <Row className={styles.notification}>
            Admin 1 reviewed Zach Gallaways application as APPROVED.
          </Row>
          <Row className={styles.date}>
            11:30 am.July 5, 2020
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default NotificationCard;
