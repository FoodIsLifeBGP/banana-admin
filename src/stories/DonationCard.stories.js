import React from 'react';
import DonationCard from '../Components/DonationCard';

export default {
  title: 'DonationCard',
  component: DonationCard,
};

export const presentation = () => <DonationCard claimedDonation={29} totalDonation={50} />;
