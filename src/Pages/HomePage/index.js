import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'reactstrap';
import Navbar from '../../Components/Navbar';
import ApplicationCard from '../../Components/ApplicationCard';
import DonationCard from '../../Components/DonationCard';
import ApiService from '../../Services/ApiService';

export default function HomePage() {
  const [newClients, setNewClients] = useState(0);
  // const [approvedNewClients, setApprovedNewClients] = useState(0);
  const [newDonors, setNewDonors] = useState(0);
  // const [approvedNewDonors, setApprovedNewDonors] = useState(1);
  const [claimedDonations, setClaimedDonations] = useState(0);
  const [activeDonations, setActiveDonations] = useState(0);

  async function getHomePageData() {
    const { axiosRequest } = ApiService();

    try {
      const response = await axiosRequest('GET', 'admins/home');

      setNewClients(response.data.new_clients);
      setNewDonors(response.data.new_donors);
      setClaimedDonations(response.data.total_claimed_donations);
      setActiveDonations(response.data.total_active_donations);
      return response.data;
    } catch (error) {
      const e = error.toString().toLowerCase().split(' status code ');
      return e.length > 1 ? parseInt(e.slice(-1), 10) : 418;
    }
  }

  useEffect(() => {
    getHomePageData();
  }, []);

  return (
    <div>
      <Navbar />
      <Container style={{ margin: '4rem auto' }}>
        <Row>
          <Col lg="6">
            <h3>New Applications</h3>
            <ApplicationCard type="client" userCount={newClients} />
            <ApplicationCard type="donor" userCount={newDonors} />
          </Col>
          <Col lg="6">
            <h3>Donation Status</h3>
            <DonationCard claimedDonation={claimedDonations} totalDonation={activeDonations} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
