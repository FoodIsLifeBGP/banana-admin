import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import { GetClient, UpdateClientStatus } from '../../Services/ClientsService';
import { GetDonor, UpdateDonorStatus } from '../../Services/DonorsService';
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

  const handleSubmit = async (event, status, userId) => {
    event.preventDefault();

    if (!userId) {
      console.error('User Id is missing');
      return;
    }

    try {
      let response;
      switch (type) {
      case 'client':
        response = await UpdateClientStatus(userId, status);
        break;
      case 'donor':
        response = await UpdateDonorStatus(userId, status);
        break;
      default:
        throw new Error('Invalid user type');
      }

      console.log('Status Updated:', response);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container style={{ margin: '4rem auto' }}>
        <Row className="justify-content-center">
          <ApplicationReview client={client} donor={donor} />
          <ApplicationStatusForm
            title="CHANGE STATUS"
            client={client}
            donor={donor}
            handleSubmit={handleSubmit}
            userId={client?.id || donor?.id}
          />
        </Row>
      </Container>
    </div>
  );
}
