import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";

function ApplicationReview(props) {
  // eslint-disable-next-line no-unused-vars
  const { type } = props;
  return <div className={styles.container}>{type}</div>;
}

ApplicationReview.propTypes = {
  type: PropTypes.string.isRequired,
};

ApplicationReview.defaultProps = {};

export default ApplicationReview;
