import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from '../Pages/ErrorPage';

export default {
  title: 'ErrorPage',
  component: ErrorPage,
};

export function Presentation() {
  return (
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>
  );
}
