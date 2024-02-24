import React from 'react';
import Badge from '../Components/Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
};

export function Presentation() {
  return (
    <>
      <Badge status="pending" />
      <Badge status="active" />
      <Badge status="inactive" />
      <Badge status="incomplete" />
      <Badge status="suspended" />
      <Badge status="closed" />
    </>
  );
}
