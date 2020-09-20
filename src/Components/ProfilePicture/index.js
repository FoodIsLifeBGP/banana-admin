import React, { useState } from 'react';
import styles from './style.module.css';

var classNames = require('classnames');

function ProfilePicture(props) {
    const { blueBorder, srcImage } = props
    const profPic = classNames({
        [styles.profPic] : true,
        [styles.blueBorder]: blueBorder,
    });
    return (
        <div className={styles.imgDiv}>
            <img src={srcImage} className={profPic}></img>
        </div>
    );
}

export default ProfilePicture;