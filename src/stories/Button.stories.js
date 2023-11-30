import Button from '../Components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['buttonPrimary', 'buttonSecondary'],
      control: { type: 'radio' },
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
