import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

import ApplicationCard from '../../Components/ApplicationCard';
import DonationCard from '../../Components/DonationCard';
import ApiService from '../../Services/ApiService';

import { useGlobalStateContext } from '../../contexts/GlobalStateContext';

import styles from './style.module.scss';

export default function HomePage() {
  const [newClients, setNewClients] = useState(0);
  // const [approvedNewClients, setApprovedNewClients] = useState(0);
  const [newDonors, setNewDonors] = useState(0);
  // const [approvedNewDonors, setApprovedNewDonors] = useState(1);
  const [claimedDonations, setClaimedDonations] = useState(0);
  const [activeDonations, setActiveDonations] = useState(0);

  const { showSpinner, showToast } = useGlobalStateContext();

  async function getHomePageData() {
    const { axiosRequest } = ApiService();

    try {
      showSpinner(true);
      const response = await axiosRequest('GET', 'admins/home');

      setNewClients(response.data.new_clients);
      setNewDonors(response.data.new_donors);
      setClaimedDonations(response.data.total_claimed_donations);
      setActiveDonations(response.data.total_active_donations);
      return response.data;
    } catch (error) {
      showToast({ message: 'Failed to get user data.', variant: 'danger' });
      return null;
    } finally {
      showSpinner(false);
    }
  }

  useEffect(() => {
    getHomePageData();
  }, []);

  return (
    <Container>
      <Row>
        <Col lg="6">
          <h3>New Applications</h3>
          <Link to="/clients" className={styles.cardLink}>
            <ApplicationCard type="client" userCount={newClients} />
          </Link>
          <Link to="/donors" className={styles.cardLink}>
            <ApplicationCard type="donor" userCount={newDonors} />
          </Link>
        </Col>
        <Col lg="6">
          <h3>Donation Status</h3>
          <DonationCard claimedDonation={claimedDonations} totalDonation={activeDonations} />
        </Col>
      </Row>
    </Container>
  );
}
