import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import DonorPage from '../Pages/DonorPage';

const mockDonors = [
  {
    id: 12,
    email: 'donor11@donor11.com',
    first_name: 'Grady',
    last_name: 'Little',
    organization_name: 'Whole Foods Market',
  },
  {
    id: 8,
    email: 'donor8@donor8.com',
    first_name: 'Issa',
    last_name: 'Rae',
    organization_name: 'XYZ Grocery',
  },
  {
    id: 2,
    email: 'approve@me.com',
    first_name: 'Bob',
    last_name: 'Binkler',
    organization_name: 'Unapproved',
  },
  {
    id: 11,
    email: 'josephtrettevik@gmail.com',
    first_name: 'Joseph',
    last_name: 'McFood',
    organization_name: 'Foods 4 U',
  },
  {
    id: 4,
    email: 'donor4@donor4.com',
    first_name: 'Gigi',
    last_name: 'Goode',
    organization_name: 'Good Food Restaurant',
  },
  {
    id: 6,
    email: 'donor6@donor6.com',
    first_name: 'Chad',
    last_name: 'Charles',
    organization_name: "Chad's Deli",
  },
  {
    id: 13,
    email: 'belinda.gadri@donor.com',
    first_name: 'Belinda',
    last_name: 'Gadri',
    organization_name: 'Belinda’s Cakes, LLC',
  },
  {
    id: 5,
    email: 'donor5@donor5.com',
    first_name: 'Serenity',
    last_name: 'Now',
    organization_name: 'A Coffeeshop',
  },
  {
    id: 10,
    email: 'donor10@donor10.com',
    first_name: 'Sasha',
    last_name: 'Fierce',
    organization_name: 'Macco Groceries',
  },
  {
    id: 1,
    email: 'donor@donor.com',
    first_name: 'Joseph',
    last_name: 'McFood',
    organization_name: 'Foods 4 U',
  },
  {
    id: 3,
    email: 'donor3@donor3.com',
    first_name: 'Rachel',
    last_name: 'Maneshevitz',
    organization_name: 'ABC Grocery',
  },
  {
    id: 7,
    email: 'donor7@donor7.com',
    first_name: 'Joanna',
    last_name: 'Soto',
    organization_name: 'Fancy Foods',
  },
  {
    id: 14,
    email: 'Brendan.smith904@gmail.com',
    first_name: 'Brendan',
    last_name: 'Smith',
    organization_name: 'Brendan’s Biscuits',
  },
  {
    id: 15,
    email: 'Brendan.smith905@gmail.com',
    first_name: 'Brendan',
    last_name: 'Smith',
    organization_name: 'Brendan’s Local Meats',
  },
  {
    id: 9,
    email: 'donor9@donor9.com',
    first_name: 'Greta',
    last_name: 'Thunberg',
    organization_name: 'Dangerousway',
  },
];

function MockDonorsServiceWrapper({ children }) {
  const mockGetDonors = () => Promise.resolve({
    data: mockDonors,
    total: mockDonors.length,
  });

  return React.cloneElement(children, { getDonors: mockGetDonors });
}

export default {
  title: 'Pages/Donor Page',
  component: DonorPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <MockDonorsServiceWrapper>
          <Story />
        </MockDonorsServiceWrapper>
      </MemoryRouter>
    ),
  ],
};

export function Presentation() {
  return <DonorPage />;
}
