import React, { useState } from 'react';
import Decisions from '../Decisions';
import Badge from '../Badge/index';
import Icon from '../Icon/index';
import './style.scss';

// TODO: Remove this object once the API is connected
const business = {
  status: 'Inactive',
  businessName: 'I am a business',
  name: 'The User',
  address: '123 ABC St.',
  city: 'San Francisco',
  state: 'CA',
  zipCode: '94105',
};

function Slide() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSlideMove = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <p onClick={handleSlideMove} aria-hidden="true">User Name Placeholder</p>
      <div className={`${isOpen ? '' : 'hidden'} slide-form slide`}>
        <p className="general-title">
          General Info
          <span className="close-button" onClick={handleSlideMove} aria-hidden="true">
            <Icon name="times" />
          </span>
        </p>
        <div className="group">
          <div className="titles">
            <p>Status</p>
            <p>Business Name</p>
            <p>Accounts</p>
            <p>Business Address</p>
            <p>City</p>
            <p>State</p>
            <p>Zip Code</p>
          </div>
          <div className="information">
            <p><Badge status="inactive" /></p>
            <p>{business.businessName}</p>
            <p>{business.name}</p>
            <p>{business.address}</p>
            <p>{business.city}</p>
            <p>{business.state}</p>
            <p>{business.zipCode}</p>
          </div>
        </div>
        <Decisions />
      </div>
    </div>
  );
}

export default Slide;
