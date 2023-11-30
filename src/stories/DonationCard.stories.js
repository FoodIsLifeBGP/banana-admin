import React from 'react';
import DonationCard from '../Components/DonationCard';

export default {
  title: 'Components/Donation Card',
  component: DonationCard,
};

export function Presentation() {
  return <DonationCard claimedDonation={29} totalDonation={50} />;
}
