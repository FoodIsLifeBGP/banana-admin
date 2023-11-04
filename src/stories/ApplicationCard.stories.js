import React from 'react';
import ApplicationCard from '../Components/ApplicationCard';

export default {
  title: 'ApplicationCard',
  component: ApplicationCard,
};

export function Donor() {
  return (
    <ApplicationCard
      type="donor"
      userCount={7}
      approvedCount={6}
    />
  );
}
export function Client() {
  return (
    <ApplicationCard
      type="client"
      userCount={25}
      approvedCount={15}
    />
  );
}
