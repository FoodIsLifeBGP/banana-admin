import React from 'react';
import PropTypes from 'prop-types';
import Badge from '../Badge';
import styles from './style.module.scss';

function ApplicationReview(props) {
  const { client, donor } = props;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>General Info</h3>
      <div className={styles.infoList}>
        {client && client.id && (
          <>
            <div className={styles.infoItem}>
              <p className={styles.emphasized}>Status</p>
              <Badge status={client.account_status} />
            </div>
            <div className={styles.infoItem}>
              <p className={styles.emphasized}>Name</p>
              <span className={styles.description}>{`${client.first_name} ${client.last_name}`}</span>
            </div>
          </>
        )}
        {donor && donor.id && (
          <>
            <div className={styles.infoItem}>
              <p className={styles.emphasized}>Status</p>
              <Badge status={donor.account_status} />
            </div>
            <div className={styles.infoItem}>
              <p className={styles.emphasized}>Name</p>
              <span className={styles.description}>{`${donor.first_name} ${donor.last_name}`}</span>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.emphasized}>Business Name</p>
              <span className={styles.description}>{donor.organization_name}</span>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.emphasized}>Business Address</p>
              <span className={styles.description}>{donor.address_street}</span>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.emphasized}>City</p>
              <span className={styles.description}>{donor.address_city}</span>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.emphasized}>State</p>
              <span className={styles.description}>{donor.address_state}</span>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.emphasized}>Zip Code</p>
              <span className={styles.description}>{donor.address_zip}</span>
            </div>
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
