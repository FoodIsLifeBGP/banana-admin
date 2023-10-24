import React from 'react';
import Status from '../Components/Status';

export default {
  title: 'Status',
  component: Status,
};

export function Presentation() {
  return (
    <>
      <Status statusState="pending" />
      <Status statusState="active" />
      <Status statusState="inactive" />
      <Status statusState="incomplete" />
      <Status statusState="suspended" />
      <Status statusState="closed" />
    </>
  );
}
