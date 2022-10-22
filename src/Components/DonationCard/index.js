import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import Icon from '../Icon';

const months = ['January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'];

function getDate() {
  const rawDate = new Date(Date.now());
  const year = rawDate.getFullYear();
  const date = rawDate.getDate();
  const month = months[rawDate.getMonth()];
  const hour = rawDate.getHours();
  const formattedHour = hour > 12 ? hour - 12 : hour;
  const minutes = rawDate.getMinutes();
  const formattedMinutes = (minutes < 10 ? '0' : '') + minutes;
  const dayPart = hour < 12 ? 'a.m.' : 'p.m.';
  return `${formattedHour}:${formattedMinutes} ${dayPart} ${month} ${date}, ${year}`;
}

function DonationCard(props) {
  // eslint-disable-next-line no-unused-vars
  const { totalDonation, claimedDonation } = props;
  const fractionClaimed = claimedDonation / totalDonation;
  const percentClaimed = Math.trunc(fractionClaimed * 100);
  const formattedDate = getDate();

  const iconName = 'veggies';
  return (
    <div className={styles.container}>
      <div className={styles.imgwrapper}><Icon name={iconName} size={100} /></div>
      <div className={styles.details}>
        <div className={styles.title}>Claimed Donations</div>
        <div className={styles.rowwrapper}>
          <div className={styles.percentdisplay}>
            {percentClaimed}
            %
          </div>
          <div className={styles.fractiondisplay}>
            <span className={styles.claimedamount}>
              {claimedDonation}
              /
            </span>
            {totalDonation}
          </div>
        </div>
        <div className={styles.progressbarrow}>
          <progress className={styles.progressbar} max={1} value={fractionClaimed} />
        </div>
        <div className={styles.datedisplay}>{formattedDate}</div>
      </div>
    </div>
  );
}

DonationCard.propTypes = {
  totalDonation: PropTypes.number.isRequired,
  claimedDonation: PropTypes.number.isRequired,
};

DonationCard.defaultProps = {
};

export default DonationCard;
