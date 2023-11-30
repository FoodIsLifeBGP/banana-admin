import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ClientsPage from '../Pages/ClientsPage';

const mockClients = [
  {
    account_status: 'inactive',
    created_at: '2023-10-01T01:34:45.243Z',
    email: 'zachary@olson.com',
    first_name: 'Naoma',
    last_name: 'Rogahn',
  },
  {
    account_status: 'active',
    created_at: '2023-10-01T01:34:46.354Z',
    email: 'darron@adams-harvey.name',
    first_name: 'Jamal',
    last_name: 'Ziemann',
  },
  {
    account_status: 'suspended',
    created_at: '2023-10-01T01:34:48.028Z',
    email: 'elisha@gusikowski.biz',
    first_name: 'Freeman',
    last_name: 'Lind',
  },
  {
    account_status: 'active',
    created_at: '2023-10-01T01:34:48.620Z',
    email: 'carley.considine@turcotte.info',
    first_name: 'Ward',
    last_name: 'MacGyve,r',
  },
  {
    account_status: 'active',
    created_at: '2023-10-01T01:34:49.217Z',
    email: 'mario@tremblay.io',
    first_name: 'Roland',
    last_name: 'Anderson',
  },
  {
    account_status: 'inactive',
    created_at: '2023-10-01T01:34:49.803Z',
    email: 'page_mann@beer.name',
    first_name: 'Stacey',
    last_name: 'Yundt',
  },
  {
    account_status: 'suspended',
    created_at: '2023-10-01T01:34:50.367Z',
    email: 'willie.jakubowski@krajcik.name',
    first_name: 'Cruz',
    last_name: 'Cremin',
  },
  {
    account_status: 'approved',
    created_at: '2023-10-01T01:34:50.944Z',
    email: 'jetta_abshire@wisozk.co',
    first_name: 'Nicholas',
    last_name: 'Heathcote',
  },
];

function MockClientsServiceWrapper({ children }) {
  const mockGetClients = () => Promise.resolve({
    data: mockClients,
    total: mockClients.length,
  });

  return React.cloneElement(children, { getClients: mockGetClients });
}

export default {
  title: 'Pages/Clients Page',
  component: ClientsPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <MockClientsServiceWrapper>
          <Story />
        </MockClientsServiceWrapper>
      </MemoryRouter>
    ),
  ],
};

export function Presentation() {
  return <ClientsPage />;
}
