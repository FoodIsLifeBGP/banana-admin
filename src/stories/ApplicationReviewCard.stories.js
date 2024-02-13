import React from 'react';
import ApplicationReviewCard from '../Components/ApplicationReviewCard';

export default {
  title: 'Components/Application Review Card',
  component: ApplicationReviewCard,
  argTypes: {
    type: {
      options: ['donor', 'client'],
      control: { type: 'radio' },
    },
  },
};

export function ReviewCardStory({ type }) {
  // Explicitly define the donor and client objects
  const donor = {
    id: 1,
    account_status: 'pending',
    first_name: 'Zach',
    last_name: 'Gallaway',
    organization_name: 'Food 4 U',
    address_street: '1500 NE 24th',
    address_city: 'Seattle',
    address_state: 'WA',
    address_zip: '98000',
  };

  const client = {
    id: 2,
    account_status: 'active',
    first_name: 'Jane',
    last_name: 'Doe',
    // Add any other client-specific properties here
  };

  // Use the type to conditionally pass the donor or client object
  const props = type === 'donor' ? { donor } : { client };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ApplicationReviewCard {...props} />;
}

ReviewCardStory.args = {
  type: 'donor', // Default to 'donor', can be toggled in Storybook UI
};
