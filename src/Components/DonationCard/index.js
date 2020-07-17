import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

function DonationCard(props) {
  // eslint-disable-next-line no-unused-vars
  const { totalDonation, claimedDonation } = props;
  return (
    <div className={styles.container}>Donation Card</div>
  );
}

DonationCard.propTypes = {
  totalDonation: PropTypes.number.isRequired,
  claimedDonation: PropTypes.number.isRequired,
};

DonationCard.defaultProps = {
};

export default DonationCard;
