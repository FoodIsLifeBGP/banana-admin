import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

const classNames = require('classnames');

function ProfilePicture(props) {
  const { blueBorder, srcImage } = props;
  const profPic = classNames({
    [styles.profPic]: true,
    [styles.blueBorder]: blueBorder,
  });
  return (
    <div className={styles.imgDiv}>
      {srcImage !== '#' && (<img src={srcImage} className={profPic} alt="" />)}
    </div>
  );
}

ProfilePicture.propTypes = {
  blueBorder: PropTypes.bool,
  srcImage: PropTypes.string,
};

ProfilePicture.defaultProps = {
  blueBorder: true,
  srcImage: '#',
};

export default ProfilePicture;
