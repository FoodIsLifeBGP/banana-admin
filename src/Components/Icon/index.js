import React from 'react';
import PropTypes from 'prop-types';
import map from './map';

function Icon({ name }) {
  const fileRef = map[name];

  return fileRef ? (
    <img src={fileRef} alt={fileRef} />
  ) : (
    <i className={`fa fa-${name}`} />
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,

};

export default Icon;
