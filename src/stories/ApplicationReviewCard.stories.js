import React from "react";
import ApplicationReviewCard from "../Components/ApplicationReviewCard";

export default {
  title: "ApplicationReviewCard",
  component: ApplicationReviewCard,
};

export const donor = () => (
  <ApplicationReviewCard
    type='donor'
    status='pending'
    name='Zach Gallaway'
    businessName='Food 4 U'
    businessStreetAddress='1500 NE 24th'
    businessCity='Seattle'
    businessState='WA'
    businessZipCode='98000'
  />
);
