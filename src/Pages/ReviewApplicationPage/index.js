import React from 'react';
import { Container, Row } from 'reactstrap';
import ApplicationReview from '../../Components/ApplicationReviewCard';
import ApplicationStatusForm from '../../Components/ApplicationStatusForm';
import Navbar from '../../Components/Navbar';

export default function ReviewApplicationPage() {
  return (
    <div>
      <Navbar />
      <Container style={{ margin: '4rem auto' }}>
        <Row className="justify-content-center">
          <ApplicationReview />
          <ApplicationStatusForm title="CHANGE STATUS" />
        </Row>
      </Container>
    </div>
  );
}
