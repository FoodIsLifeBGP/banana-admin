import React from 'react';
import BreadCrumb from '../Components/BreadCrumb';

export default {
  title: 'Components/Bread Crumb',
  component: BreadCrumb,
};

export function Presentation() {
  const sampleTrail = [
    { pageName: 'Home', url: 'localhost:3000' },
    { pageName: 'Donors', url: 'localhost:3000' },
    { pageName: 'New Applications', url: 'localhost:3000' },
  ];

  return <BreadCrumb breadCrumbTrail={sampleTrail} />;
}
