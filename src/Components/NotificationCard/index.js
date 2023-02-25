import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import ProfilePicture from '../ProfilePicture';
import BANANA from '../../Image/BANANA.svg';

function NotificationCard(props) {
  const { srcImage } = props;
  return (
    <Container className="container container-fluid">
      <Row className="notification-container">
        <Col className="profile-container" xs="2">
          <ProfilePicture srcImage={srcImage} customHeight={80} customWidth={80} />
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

NotificationCard.propTypes = {
  srcImage: PropTypes.string,
};

NotificationCard.defaultProps = {
  srcImage: BANANA,
};

export default NotificationCard;
