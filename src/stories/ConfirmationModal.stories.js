import React from 'react';
import ConfirmationModal from '../Components/ConfirmationModal';

export default {
  title: 'Components/Confirmation Modal',
  component: ConfirmationModal,
};

export function Presentation() {
  return (
    <div style={{
      height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <ConfirmationModal />
    </div>
  );
}
