import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

function ListItem(props) {
  const { itemTitle, itemValue } = props;
  return (
    <div className={styles.infoItem}>
      <p className={styles.emphasized}>{itemTitle}</p>
      <p>{itemValue}</p>
    </div>
  );
}

ListItem.propTypes = {
  itemTitle: PropTypes.string.isRequired,
  itemValue: PropTypes.string.isRequired,
};

export default ListItem;
