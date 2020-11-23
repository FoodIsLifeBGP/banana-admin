import React from 'react';
import {Container} from 'reactstrap';
import Input from '../Components/Input';

export default {
  title: 'Input',
  component: Input,
};

export const presentation = () => {
  return (
    <Container>
      <Input iconName="user" placeholder="With Icon"/>
      <Input placeholder="Without Icon"/>
    </Container>
  )}
