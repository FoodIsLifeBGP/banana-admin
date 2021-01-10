import React, { useState } from 'react';
import Decisions from '../Decisions';
import Status from '../Status/index';
import Icon from '../Icon/index';
import './style.css';

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
          <span className="close-button" onClick={handleSlideMove} aria-hidden="true"><Icon name="times" size="" /></span>
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
            <p><Status statusState="inactive" /></p>
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
