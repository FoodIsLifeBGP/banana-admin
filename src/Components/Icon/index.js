import React from 'react';
import PropTypes from 'prop-types';
import map from './map';

/* NOTE: Icon names can be found here https://materializecss.com/icons.html */
function Icon(props) {
  const { name, size, className } = props;
  const fileRef = map[name];

  // Map size props to CSS classes
  const sizeClass = {
    sm: 'icon-sm',
    md: 'icon-md',
    lg: 'icon-lg',
    xl: 'icon-xl',
  }[size];

  const combinedClassName = className ? `fa fa-${name} ${className} ${sizeClass}` : `fa fa-${name} ${sizeClass}`;

  if (fileRef) {
    return <img src={fileRef} className={`${className} ${sizeClass}`} alt="" />;
  }

  return <i className={combinedClassName} />;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
  size: 'md',
};

export default Icon;
