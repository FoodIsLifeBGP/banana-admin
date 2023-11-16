import React from 'react';
import ApplicationCard from '../Components/ApplicationCard';

export default {
  component: ApplicationCard,
  title: 'Components/Application Card',
  argTypes: {
    type: {
      options: ['donor', 'client'],
      control: { type: 'radio' },
    },
    userCount: {
      control: { type: 'number' },
      defaultValue: 10,
    },
  },
};

export function ApplicationCardStory(args) {
  const { type, userCount } = args;
  return <ApplicationCard type={type} userCount={userCount} approvedCount={8} />;
}

ApplicationCardStory.args = {
  type: 'donor',
  userCount: 10,
};
