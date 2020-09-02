import React from 'react';
import PropTypes from 'prop-types';
import map from './map';

// Renamed to avoid namespace conflict with materialize.Icon
function AppIcon(props) {
  const { name, size } = props;
  const fileRef = map[name];
  if (fileRef) {
    return (
      <img src={fileRef} style={{ width: size, height: size }} alt="" />
    );
  }

  return (
    <div>IconNotFound</div>
  );
}

AppIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default AppIcon;
