import React from 'react';
import ApplicationStatusForm from '../Components/ApplicationStatusForm';

export default {
  title: 'ApplicationStatusForm',
  component: ApplicationStatusForm,
};

export function Presentation() {
  return <ApplicationStatusForm title="Change Status" handleSubmit={() => {}} />;
}
