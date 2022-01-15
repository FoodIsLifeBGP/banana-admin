import React from 'react';
import {
  Container,
  Col,
  Row,
} from 'reactstrap';
import Navbar from '../../Components/Navbar';
import ApplicationCard from '../../Components/ApplicationCard';
import DonationCard from '../../Components/DonationCard';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Container style={{ marginTop: '120px' }}>
        <Row>
          <Col md="6">
            <h3>New Applications</h3>
            <ApplicationCard type="client" userCount={25} approvedCount={15} />
            <ApplicationCard type="donor" userCount={7} approvedCount={5} />
          </Col>
          <Col md="6">
            <h3>Donation Status</h3>
            <DonationCard claimedDonation={29} totalDonation={50} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
