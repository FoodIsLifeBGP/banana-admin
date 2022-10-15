import React from 'react';
import { Welcome } from '@storybook/react/demo';

export default {
  title: 'Welcome',
  component: Welcome,
};

export function ToStorybook() {
  return (
    <div>
      {
        `
    Welcome to the storybook of banana-admin, it's the UI component library, you could view the effect
    and code example of all existing UI component.
    `
      }
    </div>
  );
}

ToStorybook.story = {
  name: 'to Storybook',
};
