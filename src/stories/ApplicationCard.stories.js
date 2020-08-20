import React from 'react';
import ApplicationCard from '../Components/ApplicationCard';

export default {
  title: 'ApplicationCard',
  component: ApplicationCard,
};

export const donor = () => (
  <ApplicationCard
    type="donor"
    userCount={7}
    approvedCount={6}
  />
);
export const client = () => (
  <ApplicationCard
    type="client"
    userCount={25}
    approvedCount={15}
  />
);
