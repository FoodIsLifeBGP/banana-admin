import React from 'react';
import {
  Card, CardBody, Col, Container, Row,
} from 'reactstrap';
import Navbar from '../../Components/Navbar';
import styles from './style.module.scss';

import Icon from '../../Components/Icon';

function NotificationPage() {
  // data to populate notifications
  const notifications = [
    {
      profilePic: 'https://i.pravatar.cc/80',
      adminName: 'Admin 1',
      applicantName: 'Johnny ',
      status: 'DENIED - INCOMPLETE',
      adminAction: 'reviewed',
      date: {
        hour: '11',
        minute: '30',
        period: 'AM',
        month: '8',
        day: '19',
        year: '2023',
      },
    },
    {
      profilePic: '',
      adminName: 'Admin 1',
      applicantName: 'Johnny ',
      adminAction: 'changed',
      status: 'DENIED - SUSPENDED',
      date: {
        hour: '11',
        minute: '30',
        period: 'AM',
        month: '8',
        day: '19',
        year: '2023',
      },
    },
    {
      profilePic: '',
      adminName: 'Admin 1',
      applicantName: 'Johnny ',
      adminAction: 'reviewed',
      status: 'CLOSED',
      date: {
        hour: '11',
        minute: '30',
        period: 'AM',
        month: '8',
        day: '19',
        year: '2023',
      },
    },
    {
      profilePic: '',
      adminName: 'Admin 1',
      applicantName: 'Johnny ',
      adminAction: 'changed',
      status: 'APPROVED',
      date: {
        hour: '11',
        minute: '30',
        period: 'AM',
        month: '8',
        day: '19',
        year: '2023',
      },
    },
    {
      profilePic: '',
      adminName: 'Admin 1',
      applicantName: 'Johnny ',
      adminAction: 'reviewed',
      status: 'INACTIVE',
      date: {
        hour: '11',
        minute: '30',
        period: 'AM',
        month: '8',
        day: '19',
        year: '2023',
      },
    },
  ];

  return (
    <div>
      <Navbar />
      <Container>
        <Row style={{ margin: '1rem' }}>
          <h1 className={styles.header}>Notifications</h1>
        </Row>
        {notifications.map((notification, index) => (
          <Card
            // eslint-disable-next-line react/no-array-index-key
            key={`${notification.applicantName}-${index}`}
            className={styles.card}
          >
            <CardBody style={{ paddingBottom: '1rem' }}>
              <Row>
                <Col xs="auto">
                  {notification.profilePic ? (
                    <img
                      src={`${notification.profilePic}`}
                      alt="profile pic"
                      className={styles.iconPic}
                    />
                  ) : (
                    <Icon name="avatar" size={80} />
                  )}
                </Col>
                <Col className={styles.notificationText}>
                  <div className={styles.navyText}>
                    {`${notification.adminName} ${notification.adminAction} ${notification.applicantName} application as\u00A0`}
                    <span style={{ fontWeight: 'bolder' }}>{`${notification.status}`}</span>
                    .
                  </div>
                  <div className={styles.dateTime}>
                    {' '}
                    {notification.date.hour}
                    :
                    {notification.date.minute}
                    {' '}
                    {notification.date.period}
                    {' '}
                    {notification.date.month}
                    /
                    {notification.date.day}
                    /
                    {notification.date.year}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        ))}
        {/* TODO: add paginator logic */}
      </Container>
    </div>
  );
}

export default NotificationPage;
