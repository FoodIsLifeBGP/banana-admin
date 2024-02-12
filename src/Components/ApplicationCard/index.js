import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';
import Icon from '../Icon';

function ApplicationCard(props) {
  const { type, userCount } = props;
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
      <div className={styles.icon}>
        <Icon className={styles.icon} name={iconName} />
      </div>
      <div className={styles.body}>
        {userCount.toLocaleString(undefined, { minimumIntegerDigits: 2, useGrouping: false })}
      </div>
    </div>
  );
}

ApplicationCard.propTypes = {
  type: PropTypes.string,
  userCount: PropTypes.number,
};

ApplicationCard.defaultProps = {
  type: 'donor',
  userCount: 0,
};

export default ApplicationCard;
