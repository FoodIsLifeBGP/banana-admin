import React from 'react';
import Navbar from '../../Components/Navbar';
import ProfilePicture from '../../Components/ProfilePicture';
import Button from '../../Components/Button';
import styles from './style.module.css';

const userStub = {
  firstName: 'John',
  lastName: 'Doe',
  profPic: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80',
  signInDate: new Date('04-02-2020'),
  role: 'Admin',
  email: 'hunter2@gmail.com',
  // Not sure how we want to handle outputting asterisks for the length of the password.
  // Should we send the encrypted password from the backend of just the length of the password
  // Not a great idea to use the plain text password
  // Should we ever return any information about the password to the front-end at all
};

export default function SettingsPage() {
  return (
    <div>
      <Navbar />
      <div className={styles.background}>
        <div className={styles.content}>
          <h2 className={styles.nameHeader}>{`${userStub.firstName} ${userStub.lastName}`.toUpperCase()}</h2>
          <ProfilePicture blueBorder srcImage={userStub.profPic} />
          {/* TODO - The link below needs to be added */}
          <a className={styles.editLink} href="/">Edit</a>
          <div className={styles.infoContainer}>
            <p className={styles.infoItem}>
              Member since :
              {userStub.signInDate.toLocaleDateString(undefined,
                { minimumIntegerDigits: 2, useGrouping: false })}
            </p>
            <p className={styles.infoItem}>
              Member Authorization :
              {userStub.role}
            </p>
            <div className={styles.borderBox} />
            <div className={styles.emailContainer}>
              <div>Email Address: </div>
              <div>{userStub.email}</div>
              <br />
            </div>
            <div className={styles.passwordContainer}>
              <div>Password:</div>
              <div>{'*'.repeat(8)}</div>
              {/* TODO - The link below needs to be added */}
              <a className={styles.editPassword} href="/">Update</a>
            </div>
            <div className={styles.buttonContainer}>
              <Button text="Logout" style={{ width: '100px', height: '50px', fontWeight: 'bold' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
