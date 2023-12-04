import React from 'react';
import PropTypes from 'prop-types';
import map from './map';

function Icon(props) {
  // TODO: we should either be passing in fixed set of predefined sizes (sm, md, lg, xl) or nothing.
  // passing in specific px values is not best practice,
  // might as well just alter with css if we need specific pixel sizes
  // also isn't there already a reactstrap component for icons?
  const { name, size, className } = props;
  const fileRef = map[name];

  const combinedClassName = className ? `fa fa-${name} ${className}` : `fa fa-${name}`;

  if (fileRef) {
    return <img src={fileRef} className={className} style={{ width: size, height: size }} alt="" />;
  }

  return <i className={combinedClassName} />;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
  size: 20,
};

export default Icon;
