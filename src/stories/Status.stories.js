import React from 'react';
import Status from '../Components/Status';

export default {
  title: 'Status',
  component: Status,
};

export const presentation = () => (
  <>
    <Status statusState="pending" />
    <Status statusState="active" />
    <Status statusState="inactive" />
    <Status statusState="incomplete" />
    <Status statusState="suspended" />
    <Status statusState="closed" />
  </>
);

// export const presentation = () => <Status statusState="pending"/>
// export const active = () => <Status statusState="active"/>
// export const inactive = () => <Status statusState="inactive"/>
// export const incomplete = () => <Status statusState="incomplete"/>
// export const suspended = () => <Status statusState="suspended"/>
// export const closed = () => <Status statusState="closed"/>
