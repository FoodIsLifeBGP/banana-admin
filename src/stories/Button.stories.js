import Button from '../Components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select', options: ['buttonPrimary', 'buttonSecondary'] },
    },
    text: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export const Primary = {
  args: {
    text: 'Primary Button',
    variant: 'buttonPrimary',
  },
};

export const Secondary = {
  args: {
    text: 'Secondary Button',
    variant: 'buttonSecondary',
  },
};
