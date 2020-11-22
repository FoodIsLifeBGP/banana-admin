import React from 'react';
import Breadcrumbs from '../Components/Breadcrumbs';

const crumbsConfig = [
  {
    label: 'Home',
    path: 'home',
  },
  {
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    path: '/contact',
    label: 'Contact',
  },
  {
    path: '/about',
    label: 'About',
  },
  {
    path: '/blog',
    label: 'Blog',
  },
];
export default {
  label: 'Breadcrumbs',
  component: Breadcrumbs,
};


export const presentation = () => <Breadcrumbs crumbs={crumbsConfig} />;
