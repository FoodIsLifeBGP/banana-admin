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
  const [newClients, setNewClients] = useState(0);
  // const [approvedNewClients, setApprovedNewClients] = useState(0);
  const [newDonors, setNewDonors] = useState(0);
  // const [approvedNewDonors, setApprovedNewDonors] = useState(1);
  const [claimedDonations, setClaimedDonations] = useState(0);
  const [activeDonations, setActiveDonations] = useState(0);

  // const countApprovedObjects = (arr) => {
  //   let count = 0;
  //   for (let i = 0; i < arr.length; i += 1) {
  //     if (arr[i].account_status === 'approved') {
  //       count += 1;
  //     }
  //   }

  //   return count;
  // };

  // async function getNewClients() {
  //   const { axiosRequest } = ApiService();

  //   try {
  //     const response = await axiosRequest(
  //       'GET',
  //       'get_new_clients',
  //     );

  //     setNewClients(response.data);
  //     const approvedClientCount = countApprovedObjects(response.data);
  //     setApprovedNewClients(approvedClientCount);
  //     return null;
  //   } catch (error) {
  //     const e = error.toString().toLowerCase.split(' status code ');
  //     return e.length > 1
  //       ? parseInt(e.slice(-1), 10)
  //       : 418;
  //   }
  // }

  // async function getNewDonors() {
  //   const { axiosRequest } = ApiService();

  //   try {
  //     const response = await axiosRequest(
  //       'GET',
  //       'get_new_donors',
  //     );

  //     setNewDonors(response.data);
  //     const approvedDonorCount = countApprovedObjects(response.data);
  //     setApprovedNewDonors(approvedDonorCount);
  //     return null;
  //   } catch (error) {
  //     const e = error.toString().toLowerCase.split(' status code ');
  //     return e.length > 1
  //       ? parseInt(e.slice(-1), 10)
  //       : 418;
  //   }
  // }

  // async function getActiveDonations() {
  //   const { axiosRequest } = ApiService();

  //   try {
  //     const response = await axiosRequest(
  //       'GET',
  //       'donations/get_active_donations',
  //     );

  //     setActiveDonations(response.data);
  //     return null;
  //   } catch (error) {
  //     const e = error.toString().toLowerCase.split(' status code ');
  //     return e.length > 1
  //       ? parseInt(e.slice(-1), 10)
  //       : 418;
  //   }
  // }
  async function getHomePageData() {
    const { axiosRequest } = ApiService();

    try {
      const response = await axiosRequest(
        'GET',
        'admins/home',
      );

      setNewClients(response.data.new_clients);
      setNewDonors(response.data.new_donors);
      setClaimedDonations(response.data.total_claimed_donations);
      setActiveDonations(response.data.total_active_donations);
      return response.data;
    } catch (error) {
      const e = error.toString().toLowerCase.split(' status code ');
      return e.length > 1
        ? parseInt(e.slice(-1), 10)
        : 418;
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
          <Col md="6">
            <h3>New Applications</h3>
            <ApplicationCard type="client" userCount={newClients} />
            <ApplicationCard type="donor" userCount={newDonors} />
          </Col>
          <Col md="6">
            <h3>Donation Status</h3>
            <DonationCard
              claimedDonation={claimedDonations}
              totalDonation={activeDonations}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
