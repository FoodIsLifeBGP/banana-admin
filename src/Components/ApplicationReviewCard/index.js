import React from "react";
import PropTypes from "prop-types";
import ListItem from "./ListItem";
import styles from "./style.module.css";

function ApplicationReview(props) {
  // eslint-disable-next-line no-unused-vars
  const {
    type,
    status,
    name,
    businessName,
    businessStreetAddress,
    businessCity,
    businessState,
    businessZipCode,
  } = props;
  return (
    <div className={styles.container}>
      <h3>General Info</h3>
      <div className={styles.infoList}>
        <ListItem itemTitle='Status' itemValue={status} />
        <ListItem itemTitle='Name' itemValue={name} />
        <ListItem itemTitle='Business Name' itemValue={businessName} />
        <ListItem
          itemTitle='Business Address'
          itemValue={businessStreetAddress}
        />
        <ListItem itemTitle='City' itemValue={businessCity} />
        <ListItem itemTitle='State' itemValue={businessState} />
        <ListItem itemTitle='Zip Code' itemValue={businessZipCode} />
      </div>
    </div>
  );
}

ApplicationReview.propTypes = {
  type: PropTypes.string.isRequired,
};

ApplicationReview.defaultProps = {};

export default ApplicationReview;
