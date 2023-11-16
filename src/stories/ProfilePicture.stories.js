import React from 'react';
import ProfilePicture from '../Components/ProfilePicture';

export default {
  title: 'Components/Profile Picture',
  component: ProfilePicture,
};

const imgSrc = 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80';
export function Presentation() {
  return <ProfilePicture srcImage={imgSrc} />;
}
