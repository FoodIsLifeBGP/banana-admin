import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import BANANA from '../../Image/BANANA.svg';

const classNames = require('classnames');

function ProfilePicture(props) {
  const {
    blueBorder,
    srcImage,
    customHeight,
    customWidth,
  } = props;
  const profPic = classNames({
    [styles.profPic]: true,
    [styles.blueBorder]: blueBorder,
  });
  return (
    <div className={styles.imgDiv}>
      {srcImage && (<img src={srcImage} style={{ height: customHeight, width: customWidth }} className={profPic} alt="" />)}
    </div>
  );
}

ProfilePicture.propTypes = {
  blueBorder: PropTypes.bool,
  srcImage: PropTypes.string,
  customHeight: PropTypes.number,
  customWidth: PropTypes.number,
};

ProfilePicture.defaultProps = {
  blueBorder: true,
  srcImage: BANANA,
  customHeight: 150, /* Height of container on Profile Page */
  customWidth: 150, /* Width of container on Profile Page */
};

export default ProfilePicture;
