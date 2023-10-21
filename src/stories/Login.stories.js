import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage/index';

export default {
  title: 'Login Page',
  component: LoginPage,
};

export function Default(args) {
  const { username, password, onLogin } = args;
  return (
    <MemoryRouter>
      <LoginPage username={username} password={password} onLogin={onLogin} />
    </MemoryRouter>
  );
}
