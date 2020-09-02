import React from 'react';
import Input from '../Components/Input';
import M from 'materialize-css';

export default {
  title: 'Input',
  component: Input,
};

export const presentation = () => {
  M.AutoInit();
  return <Input iconName={"person"} placeholder={"Username"} />;
}