import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import styles from './style.module.css';
import Icon from '../Icon';

function DonationCard(props) {
  // eslint-disable-next-line no-unused-vars
  const { totalDonation, claimedDonation } = props;
  const fractionDonated = Math.round((claimedDonation / totalDonation) * 100);

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };
  const dateOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  const date = new Date();
  const time = new Intl.DateTimeFormat('default', timeOptions).format(date);
  const fdate = new Intl.DateTimeFormat('default', dateOptions).format(date);

  return (
    <div className={styles.container}>
      <div className={styles.cardTop}>
        <Row>
          <Col className={styles.body}>{`${fractionDonated}%`}</Col>
          <Col className={styles.alignRight}>
            <Icon name="donationStatus" size={85} />
          </Col>
        </Row>
        <Row>
          <progress className={styles.progressBar} max={1} value={fractionDonated} />
        </Row>
        <Row>
          <Col className={styles.date}>{`${time} ${fdate}`}</Col>
        </Row>
      </div>
      <div className={styles.divider} />
      <div className={styles.cardBottom}>
        <Row>
          <Col className={styles.footerLabel}>Claimed Total</Col>
          <Col className={`${styles.body} ${styles.alignRight}`}>
            {claimedDonation}
          </Col>
        </Row>
        <Row>
          <Col className={styles.footerLabel}>Active Total</Col>
          <Col className={`${styles.body} ${styles.alignRight}`}>
            {totalDonation}
          </Col>
        </Row>
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
