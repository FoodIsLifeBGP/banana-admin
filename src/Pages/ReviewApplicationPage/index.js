import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import { GetClient } from '../../Services/ClientsService';
import { GetDonor } from '../../Services/DonorsService';
import ApplicationReview from '../../Components/ApplicationReviewCard';
import ApplicationStatusForm from '../../Components/ApplicationStatusForm';
import Navbar from '../../Components/Navbar';

export default function ReviewApplicationPage(props) {
  const { type } = props;
  const [client, setClient] = useState({});
  const [donor, setDonor] = useState({});
  const params = useParams();

  const init = async () => {
    let result;
    switch (type) {
    case 'client':
      result = await GetClient(params.id);
      setClient(result);
      break;
    case 'donor':
      result = await GetDonor(params.id);
      setDonor(result);
      break;

    default:
      break;
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <Navbar />
      <Container style={{ margin: '4rem auto' }}>
        <Row className="justify-content-center">
          <ApplicationReview client={client} donor={donor} />
          <ApplicationStatusForm title="CHANGE STATUS" />
        </Row>
      </Container>
    </div>
  );
}
