import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from '../Pages/ErrorPage';

export default {
  title: 'Pages/Error Page',
  component: ErrorPage,
};

export function Presentation() {
  return (
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>
  );
}
