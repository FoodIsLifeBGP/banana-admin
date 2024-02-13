import React from 'react';
import Icon from '../Components/Icon';
import icons from '../Components/Icon/map';

export default {
  title: 'Components/Icon',
  component: Icon,
};

// Template for displaying each icon
function IconTemplate({ name }) {
  return (
    <div
      style={{
        margin: '.875rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 'calc(20% - 1rem)',
        minWidth: '60px',
      }}
    >
      <Icon name={name} />
      <p>{name}</p>
    </div>
  );
}

// Story for a single icon example
export function SingleIconExample() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Icon name="upsetWoman" />
    </div>
  );
}
SingleIconExample.storyName = 'Single Icon';

SingleIconExample.parameters = {
  docs: {
    description: {
      story: 'Example of how to use the Icon component for a single icon.',
    },
    source: {
      code: '<Icon name="upsetWoman" />',
    },
  },
};

// Dynamically create a story for each icon
export function AllIcons() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '.5rem',
      }}
    >
      {Object.keys(icons).map((iconName) => (
        <IconTemplate key={iconName} name={iconName} />
      ))}
    </div>
  );
}
