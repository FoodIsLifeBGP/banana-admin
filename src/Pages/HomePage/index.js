import React, { useEffect, useState } from 'react';
import {
  Container,
  Col,
  Row,
} from 'reactstrap';
import Navbar from '../../Components/Navbar';
import ApplicationCard from '../../Components/ApplicationCard';
import DonationCard from '../../Components/DonationCard';
import ApiService from '../../Services/ApiService';

export default function HomePage() {
  const [newClients, setNewClients] = useState([]);
  const [approvedNewClients, setApprovedNewClients] = useState(0);
  const [newDonors, setNewDonors] = useState([]);
  const [approvedNewDonors, setApprovedNewDonors] = useState(1);
  const [activeDonations, setActiveDonations] = useState({});

  const countApprovedObjects = (arr) => {
    let count = 0;
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].account_status === 'approved') {
        count += 1;
      }
    }

    return count;
  };

  async function getNewClients() {
    const { axiosRequest } = ApiService();

    try {
      const response = await axiosRequest(
        'GET',
        'get_new_clients',
      );

      setNewClients(response.data);
      const approvedClientCount = countApprovedObjects(response.data);
      setApprovedNewClients(approvedClientCount);
      return null;
    } catch (error) {
      const e = error.toString().toLowerCase.split(' status code ');
      return e.length > 1
        ? parseInt(e.slice(-1), 10)
        : 418;
    }
  }

  async function getNewDonors() {
    const { axiosRequest } = ApiService();

    try {
      const response = await axiosRequest(
        'GET',
        'get_new_donors',
      );

      setNewDonors(response.data);
      const approvedDonorCount = countApprovedObjects(response.data);
      setApprovedNewDonors(approvedDonorCount);
      return null;
    } catch (error) {
      const e = error.toString().toLowerCase.split(' status code ');
      return e.length > 1
        ? parseInt(e.slice(-1), 10)
        : 418;
    }
  }

  async function getActiveDonations() {
    const { axiosRequest } = ApiService();

    try {
      const response = await axiosRequest(
        'GET',
        'donations/get_active_donations',
      );

      setActiveDonations(response.data);
      return null;
    } catch (error) {
      const e = error.toString().toLowerCase.split(' status code ');
      return e.length > 1
        ? parseInt(e.slice(-1), 10)
        : 418;
    }
  }

  useEffect(() => {
    getNewClients();
    getNewDonors();
    getActiveDonations();
  }, []);

  return (
    <div>
      <Navbar />
      <Container style={{ margin: '4rem auto' }}>
        <Row>
          <Col md="6">
            <h3>New Applications</h3>
            <ApplicationCard type="client" userCount={newClients.length} approvedCount={approvedNewClients} />
            <ApplicationCard type="donor" userCount={newDonors.length} approvedCount={approvedNewDonors} />
          </Col>
          <Col md="6">
            <h3>Donation Status</h3>
            <DonationCard
              claimedDonation={activeDonations.claimedtotal}
              totalDonation={activeDonations.activetotal}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
