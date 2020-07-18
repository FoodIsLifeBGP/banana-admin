import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

function ApplicationCard(props) {
  const { type } = props;
  switch (type) {
    case 'donor': {
      return (
        <div className={styles.container}>Donor application card</div>
      );
    }
    case 'client': {
      return (
        <div className={styles.container}>Client application card</div>
      );
    }
    default: {
      throw new Error('wrong type in application card!');
    }
  }
}

ApplicationCard.propTypes = {
  type: PropTypes.string,
};

ApplicationCard.defaultProps = {
  type: 'donor',
};

export default ApplicationCard;
