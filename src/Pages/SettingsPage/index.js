import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobal from '../../state';
import Navbar from '../../Components/Navbar';
// import ProfilePicture from '../../Components/ProfilePicture';
import Button from '../../Components/Button';
import styles from './style.module.css';
import ApiService from '../../Services/ApiService';

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
  const [store, { logOut }] = useGlobal();

  const { axiosRequest, axiosFormRequest } = ApiService();
  const navigate = useNavigate();

  /* TODO:
   possibly fix:
  `Warning: Can't perform a React state update on an unmounted component.` (occurs on login)
  */

  /* TODO: needs a lot of cleanup, got profile image and upload basics working */

  const handleLogout = async () => {
    await logOut(store);
    navigate('/login');
  };

  const [avatarUrl, setAvatarUrl] = useState('');

  const getAdmin = async () => {
    console.log('get admin fired');
    const userStr = localStorage.getItem('user');

    if (userStr) {
      const user1 = JSON.parse(userStr);

      const response = await axiosRequest(
        'GET',
        `admins/${user1.id}`,
      );
      console.log('response.data.admin.avatar_url', response.data.admin);
      setAvatarUrl(response.data.admin.avatar_url);
    }
  };

  useEffect(() => {
    getAdmin();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('admin[avatar]', e.target[0].files[0]);

    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user1 = JSON.parse(userStr);

      const response = await axiosFormRequest(
        'POST',
        `admins/${user1.id}/update`,
        formData,
      );

      // console.log('response', response);
      setAvatarUrl(response.data.admin.avatar_url);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.background}>
        <div className={styles.content}>
          <h2 className={styles.nameHeader}>{`${userStub.firstName} ${userStub.lastName}`.toUpperCase()}</h2>
          {/* <ProfilePicture blueBorder srcImage={avatarUrl} /> */}
          <img style={{ width: '100px', height: '100px' }} src={`http://localhost:3000${avatarUrl}`} alt="" />
          {/* TODO - this form needs a lot more work lol */}
          <form onSubmit={handleSubmit}>
            <input type="file" />
            <input type="submit" />
          </form>
          <a className={styles.editLink} href="/">Edit</a>
          <div className={styles.infoContainer}>
            <p className={styles.infoItem}>
              Member since :
              {userStub.signInDate.toLocaleDateString(
                undefined,
                { minimumIntegerDigits: 2, useGrouping: false },
              )}
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
              <Button text="Logout" style={{ width: '100px', height: '50px', fontWeight: 'bold' }} action={handleLogout} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
