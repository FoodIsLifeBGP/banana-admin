import React from 'react';
import ApplicationStatusForm from '../Components/ApplicationStatusForm';

export default {
  title: 'Components/Application Status Form',
  component: ApplicationStatusForm,
};

export function Presentation() {
  return <ApplicationStatusForm title="Change Status" handleSubmit={() => {}} />;
}
