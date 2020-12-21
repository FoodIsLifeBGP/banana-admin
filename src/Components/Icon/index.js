import React from 'react';
import PropTypes from 'prop-types';
import map from './map';

function Icon(props) {
  const { name, size } = props;
  const fileRef = map[name];
  if (fileRef) {
    return (
      <img src={fileRef} style={{ width: size, height: size }} alt="" />
    );
  }

  return (
    <i className={`fa fa-${name}`} style={{ fontSize: `${size} + px` }} />
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default Icon;
