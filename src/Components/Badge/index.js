import React from 'react';
import PropTypes from 'prop-types';
import { Badge as ReactStrapBadge } from 'reactstrap';

function Badge({
  text, status,
}) {
  // NOTE Badge Types: Primary Secondary Success Danger Warning Info Light Dark
  // Status Types: approved, active, rejected, suspended, inactive, closed, pending

  const badgeColor = () => {
    switch (status) {
    case 'approved':
      return 'success';
    case 'active':
      return 'primary';
    case 'rejected':
      return 'danger';
    case 'suspended':
      return 'danger';
    case 'inactive':
      return 'dark';
    case 'closed':
      return 'dark';
    case 'pending':
      return 'warning';
    case 'processing':
      return 'warning';
    case 'incomplete':
      return 'warning';
    default:
      return 'info';
    }
  };

  return (
    <ReactStrapBadge color={badgeColor()}>
      {text}
    </ReactStrapBadge>
  );
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  status: PropTypes.oneOf([
    'approved',
    'rejected',
    'pending',
    'active',
    'suspended',
    'inactive',
    'closed',
    'processing',
    'incomplete',
  ]),
};

Badge.defaultProps = {
  status: 'pending',
};

export default Badge;
