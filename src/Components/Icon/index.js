import React from 'react';
import PropTypes from 'prop-types';
import map from './map'; /* add new icons here */
import './style.module.scss';

function Icon(props) {
  const { name, className } = props;
  const fileRef = map[name];

  const combinedClassName = className ? `fa fa-${name} icon ${className}` : `fa fa-${name} icon`;

  if (fileRef) {
    return <img src={fileRef} className={combinedClassName} alt="" />;
  }

  return <i className={combinedClassName} />;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: 'icon',
};

export default Icon;
