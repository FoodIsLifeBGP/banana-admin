import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row } from 'reactstrap';

import ApplicationReview from '../../Components/ApplicationReviewCard';
import ApplicationStatusForm from '../../Components/ApplicationStatusForm';
import Navbar from '../../Components/Navbar';
import Modal from '../../Components/Modal';

import { GetClient, UpdateClientStatus } from '../../Services/ClientsService';
import { GetDonor, UpdateDonorStatus } from '../../Services/DonorsService';

export default function ReviewApplicationPage(props) {
  const { type } = props;
  const [client, setClient] = useState({});
  const [donor, setDonor] = useState({});
  const [applicationStatusChange, setApplicationStatusChange] = useState(undefined);
  const [responseError, setResponseError] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(false);

  const params = useParams();
  const modalContentRef = useRef(null);

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
  }, [applicationStatusChange]);

  const handleSubmit = async (event, status, userId) => {
    event.preventDefault();

    try {
      let response;
      switch (type) {
      case 'client':
        response = await UpdateClientStatus(userId, status);
        setModalOpen(true);
        break;
      case 'donor':
        response = await UpdateDonorStatus(userId, status);
        setModalOpen(true);
        break;
      default:
        throw new Error('Invalid user type');
      }
      setApplicationStatusChange(response.message);
    } catch (error) {
      setResponseError(error.message);
      setModalOpen(true);
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
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalContentRef={modalContentRef}
        title={applicationStatusChange ? 'Application Status Change' : 'Error Occurred'}
      >
        {applicationStatusChange ? (
          <p>{applicationStatusChange}</p>
        ) : (
          <p>
            {responseError
              || 'Something went wrong while processing the application status update. Please try again.'}
          </p>
        )}
      </Modal>
    </div>
  );
}
