import React from 'react';
import ApplicationReviewCard from '../Components/ApplicationReviewCard';

export default {
  title: 'Components/Application Review Card',
  component: ApplicationReviewCard,
};

export function Donor() {
  return (
    <ApplicationReviewCard
      type="donor"
      status="pending"
      name="Zach Gallaway"
      businessName="Food 4 U"
      businessStreetAddress="1500 NE 24th"
      businessCity="Seattle"
      businessState="WA"
      businessZipCode="98000"
    />
  );
}

export function Client() {
  return <ApplicationReviewCard type="client" status="pending" name="Zach Gallaway" />;
}
