import React from 'react';
import {
  Container,
  Col,
  Row,
} from 'reactstrap';
import Navbar from '../../Components/Navbar';
import ApplicationCard from '../../Components/ApplicationCard';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.HomePage}>
      <Navbar />
      <Container>
        <Row>
          <Col className="applications">
            <h3>New Applications</h3>
            <ApplicationCard type="client" userCount={25} approvedCount={15} />
            <ApplicationCard type="donor" userCount={7} approvedCount={5} />
          </Col>
          <Col className="donation">
            <h3>Donation Status</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
