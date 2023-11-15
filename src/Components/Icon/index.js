import React from 'react';
import PropTypes from 'prop-types';
import map from './map';

function Icon(props) {
  const { name, size, className } = props;
  const fileRef = map[name];

  const combinedClassName = className ? `fa fa-${name} ${className}` : `fa fa-${name}`;

  if (fileRef) {
    return <img src={fileRef} className={className} style={{ width: size, height: size }} alt="" />;
  }

  return <i className={combinedClassName} style={{ fontSize: `${size} + px` }} />;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '', // Default to an empty string if not provided
};

export default Icon;
