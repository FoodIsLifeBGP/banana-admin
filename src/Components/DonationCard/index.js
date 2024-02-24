import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Progress } from 'reactstrap';
import styles from './style.module.scss';
import Icon from '../Icon';
import { isValidNumber } from '../../util/utilities';

function DonationCard(props) {
  // eslint-disable-next-line no-unused-vars
  const { totalDonation, claimedDonation } = props;
  const fractionDonated = totalDonation !== 0
    ? Math.round((claimedDonation / totalDonation) * 100)
    : 0;

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };
  const dateOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  /* TODO: use formatDateToPST utility function */
  const date = new Date();
  const time = new Intl.DateTimeFormat('default', timeOptions).format(date);
  const fdate = new Intl.DateTimeFormat('default', dateOptions).format(date);

  return (
    <div className={styles.container}>
      <div className={styles.cardTop}>
        <Row>
          <Col className={styles.body}>
            {isValidNumber(fractionDonated) ? `${fractionDonated}%` : '0%'}
          </Col>
          <Col className={styles.alignRight}>
            <Icon name="donationStatus" className={styles.icon} />
          </Col>
        </Row>
        <Row>
          {/*
            TODO: properly override the color here once bootstrap is installed via npm
            (remove bootstrap cdns from `index.html`)
            color should be: --NAVY_BLUE : #083A9B;
          */}
          <Progress
            color="secondary"
            max={100}
            className={styles.progressBar}
            value={isValidNumber(fractionDonated) ? fractionDonated : 0}
          />
        </Row>
        <Row>
          <Col className={styles.date}>{`${time} ${fdate}`}</Col>
        </Row>
      </div>
      <div className={styles.divider} />
      <div className={styles.cardBottom}>
        <Row>
          <Col className={styles.footerLabel}>Claimed Total</Col>
          <Col className={`${styles.body} ${styles.alignRight}`}>{claimedDonation}</Col>
        </Row>
        <Row>
          <Col className={styles.footerLabel}>Active Total</Col>
          <Col className={`${styles.body} ${styles.alignRight}`}>{totalDonation}</Col>
        </Row>
      </div>
    </div>
  );
}

DonationCard.propTypes = {
  totalDonation: PropTypes.number.isRequired,
  claimedDonation: PropTypes.number.isRequired,
};

DonationCard.defaultProps = {};

export default DonationCard;
