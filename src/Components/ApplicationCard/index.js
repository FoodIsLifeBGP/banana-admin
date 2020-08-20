import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import Icon from '../Icon';

function ApplicationCard(props) {
  const { type, userCount, approvedCount, onClick } = props;
  const fractionApproved = approvedCount / (userCount || 1);
  let newUserLabel = '';
  let iconName = '';
  switch (type) {
    case 'donor': {
      newUserLabel = 'New Donors';
      iconName = 'donorPlusIcon';
      break;
    }
    case 'client': {
      newUserLabel = 'New Clients';
      iconName = 'clientPlusIcon';
      break;
    }
    default: {
      throw new Error('wrong type in application card!');
    }
  }
  return (
    <div className={styles.container} type={type}>
      <div className={styles.icon} onClick={onClick}>
        <Icon name={iconName} size={70}></Icon>
      </div>
      <div className={styles.body}>
        {userCount.toLocaleString(undefined, { minimumIntegerDigits: 2, useGrouping: false })}
      </div>
      <div className={styles.footer}>
        <div className={styles.footerlabel}>{newUserLabel}</div>
        <progress className={styles.progressbar} max={1} value={fractionApproved}></progress>
      </div>
    </div>
  );
}

ApplicationCard.propTypes = {
  type: PropTypes.string,
  userCount: PropTypes.number,
  approvedCount: PropTypes.number,
  onClick: PropTypes.func,
};

ApplicationCard.defaultProps = {
  type: 'donor',
  userCount: 0,
  approvedCount: 0,
  onClick: () => {}
};

export default ApplicationCard;
