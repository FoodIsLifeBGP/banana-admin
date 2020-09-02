import React from 'react';
import Input from '../Components/Input';
import M from 'materialize-css';

export default {
  title: 'Input',
  component: Input,
};

export const presentation = () => {
  M.AutoInit();
  return (
    <div>
      <Input iconName={"person"} placeholder={"With Person Icon"} />
      <Input iconName={null} placeholder={"With No Icon"} />
    </div>
  );
}