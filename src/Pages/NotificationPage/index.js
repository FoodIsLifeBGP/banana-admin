import React from 'react';
import {
  Card, CardBody, Col, Container, Row,
} from 'reactstrap';
import Navbar from '../../Components/Navbar';
import styles from './style.module.scss';

// import Icon from '../../Components/Icon';

function NotificationPage() {
  // const ladyWidth = 400;
  // const bananaWidth = 60;

  // data to populate notifications
  const notifications = [
    {
      profilePic: 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png',
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
          <h1 className={styles.body}>Notifications</h1>
        </Row>
        {notifications.map((notification, index) => (
          <Card
          // eslint-disable-next-line react/no-array-index-key
            key={`${notification.applicantName}-${index}`}
            style={{ margin: '1rem', backgroundColor: '#F4F5F6' }}
          >
            <CardBody style={{ paddingBottom: '1rem' }}>
              <Row>
                <Col xs="auto">
                  <img src={`${notification.profilePic}`} alt="profile pic" className={styles.iconPic} />
                </Col>
                <Col style={{ flexDirection: 'column' }}>
                  <div className={styles.navyText}>
                    {`${notification.adminName} ${notification.adminAction} ${notification.applicantName} application as &nsbp`}
                    <span style={{ fontWeight: 'bolder' }}>
                      {` ${notification.status}`}
                    </span>
                    .
                  </div>
                  <div style={{ color: '#C4C4C4' }}>
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
      </Container>
    </div>
  );
}

export default NotificationPage;
