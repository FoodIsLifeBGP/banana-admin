import React from 'react';
import { Container } from 'reactstrap';
import Input from '../Components/Input';

export default {
  title: 'Components/Input',
  component: Input,
};

export function Presentation() {
  return (
    <Container>
      <Input iconName="user" placeholder="With Icon" />
      <Input placeholder="Without Icon" />
    </Container>
  );
}
