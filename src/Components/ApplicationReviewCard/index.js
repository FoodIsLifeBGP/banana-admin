import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import styles from './style.module.css';

function ApplicationReview(props) {
  const { client, donor } = props;

  return (
    <div className={styles.container}>
      <h3>General Info</h3>
      <div className={styles.infoList}>
        {client.id && (
          <>
            <ListItem itemTitle="Status" itemValue={client.account_status} />
            <ListItem itemTitle="Name" itemValue={`${client.first_name} ${client.last_name}`} />
          </>
        )}
        {donor.id && (
          <>
            <ListItem itemTitle="Status" itemValue={donor.account_status} />
            <ListItem itemTitle="Name" itemValue={`${donor.first_name} ${donor.last_name}`} />
            <ListItem itemTitle="Business Name" itemValue={donor.organization_name} />
            <ListItem
              itemTitle="Business Address"
              itemValue={donor.address_street}
            />
            <ListItem itemTitle="City" itemValue={donor.address_city} />
            <ListItem itemTitle="State" itemValue={donor.address_state} />
            <ListItem itemTitle="Zip Code" itemValue={donor.address_zip} />
          </>
        )}
      </div>
    </div>
  );
}

ApplicationReview.propTypes = {
  donor: PropTypes.object,
  client: PropTypes.object,
};

ApplicationReview.defaultProps = {
  donor: {},
  client: {},
};

export default ApplicationReview;
