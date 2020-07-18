import React from 'react';
import ApplicationCard from '../Components/ApplicationCard';

export default {
  title: 'ApplicationCard',
  component: ApplicationCard,
};

export const donor = () => <ApplicationCard type="donor" />;
export const client = () => <ApplicationCard type="client" />;
