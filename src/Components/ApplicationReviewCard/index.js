import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import styles from './style.module.css';

function ApplicationReview(props) {
  const {
    type,
    status,
    name,
    businessName,
    businessStreetAddress,
    businessCity,
    businessState,
    businessZipCode,
  } = props;
  return (
    <div className={styles.container}>
      <h3>General Info</h3>
      <div className={styles.infoList}>
        <ListItem itemTitle="Status" itemValue={status} />
        <ListItem itemTitle="Name" itemValue={name} />
        {type === 'donor' && (
          <>
            <ListItem itemTitle="Business Name" itemValue={businessName} />
            <ListItem
              itemTitle="Business Address"
              itemValue={businessStreetAddress}
            />
            <ListItem itemTitle="City" itemValue={businessCity} />
            <ListItem itemTitle="State" itemValue={businessState} />
            <ListItem itemTitle="Zip Code" itemValue={businessZipCode} />
          </>
        )}
      </div>
    </div>
  );
}

ApplicationReview.propTypes = {
  type: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  businessName: PropTypes.string,
  businessStreetAddress: PropTypes.string,
  businessCity: PropTypes.string,
  businessState: PropTypes.string,
  businessZipCode: PropTypes.string,
};

ApplicationReview.defaultProps = {
  businessName: '',
  businessStreetAddress: '',
  businessCity: '',
  businessState: '',
  businessZipCode: '',
};

export default ApplicationReview;
