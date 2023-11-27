import React, { useState, useRef } from 'react';
import Modal from '../Components/Modal';
import Button from '../Components/Button';

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    title: { control: 'text' },
  },
};

function Template(args) {
  const [modalOpen, setModalOpen] = useState(true);
  const modalContentRef = useRef(null);
  const { children, title } = args;

  return (
    <>
      {!modalOpen && (
        <Button text="Open Modal" variant="buttonPrimary" action={() => setModalOpen(true)} />
      )}
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalContentRef={modalContentRef}
        title={title}
      >
        {children}
      </Modal>
    </>
  );
}

export const Default = Template.bind({});
Default.args = {
  title: 'Application Status Change',
  children: <p>The application status has been successfully updated. </p>,
};
