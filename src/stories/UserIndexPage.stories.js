import React from 'react';
import UserIndexPage from '../Pages/UsersPage';

export default {
  title: 'UserIndexPage',
  component: UserIndexPage,
};

export const presentation = () => <UserIndexPage userVariant="all" />;
