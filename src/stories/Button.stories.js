import Button from '../Components/Button';
import iconMap from '../Components/Icon/map';

iconMap.NONE = null;

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['buttonPrimary', 'buttonSecondary', 'buttonDanger', 'buttonSuccess', 'buttonPlainText', 'buttonIcon'],
      control: { type: 'radio' },
    },
    text: { control: 'text' },
    onClick: { action: 'clicked' },
    iconName: {
      options: Object.keys(iconMap),
      mapping: Object.keys(iconMap),
      control: { type: 'radio' },
      defaultValue: 'NONE',
    },
  },
};

export const PrimaryButton = {
  args: {
    text: 'Primary',
    variant: 'buttonPrimary',
    iconName: 'NONE',
  },
};

export const ButtonWithIcon = {
  args: {
    text: 'Icon',
    variant: 'buttonPrimary',
    iconName: 'edit',
  },
};

export const IconOnlyButton = {
  args: {
    text: null,
    variant: 'buttonIcon',
    iconName: 'edit',
  },
};
