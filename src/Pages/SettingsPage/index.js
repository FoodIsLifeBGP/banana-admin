import React, { useEffect, useState, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import useGlobal from '../../state';
import Navbar from '../../Components/Navbar';
import Button from '../../Components/Button';
import styles from './style.module.css';
import ApiService from '../../Services/ApiService';
import Modal from '../../Components/Modal';

const formatAdminData = (admin) => ({
  firstName: admin.first_name,
  lastName: admin.last_name,
  avatarUrl: admin.avatar_url,
  createdAt: new Date(admin.created_at), // TODO: upate backend to send this
  role: admin.user_type,
  email: admin.email,
});

const formatDate = (date) => {
  if (date) {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return new Date();
};

export default function SettingsPage() {
  const [store, { logOut }] = useGlobal();
  const { axiosRequest, axiosFormRequest } = ApiService();
  const navigate = useNavigate();
  const [admin, setAdminData] = useState({});
  const [password, setPassword] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProfilePic, setEditingProfilePic] = useState(false);
  const modalContentRef = useRef(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const currentUser = JSON.parse(userStr);
        const response = await axiosRequest('GET', `admins/${currentUser.id}`);

        if (response?.data?.admin) {
          setAdminData(formatAdminData(response.data.admin));
        }
      }
    };
    fetchAdmin();
  }, []);

  const handleLogout = async () => {
    await logOut(store);
    navigate('/login');
  };

  const handleProfilePicFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('admin[avatar]', e.target[0].files[0]);

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await axiosFormRequest(
      'POST',
      `admins/${currentUser.id}/update`,
      formData,
    );
    if (response?.data?.admin) {
      setAdminData(formatAdminData(response.data.admin));
      setEditingProfilePic(false);
    } else {
      console.error('Error updating profile pic', JSON.stringify(response));
    }
  };

  const handleUserInfoFormSubmit = async (e) => {
    e.preventDefault();
    // TODO: implement
  };

  return (
    <div>
      <Navbar />
      <div className={styles.background}>
        <div className={styles.content}>
          <h2 className={styles.nameHeader}>
            {`${admin.firstName || ''} ${admin.lastName || ''}`.toUpperCase()}
          </h2>
          <div className={styles.profilePic}>
            <img
              style={{ width: '2rem', height: '2rem' }}
              src={admin.avatarUrl ? `${store.API_BASE_URL}${admin.avatarUrl}` : ''}
              alt="profile pic"
            />
          </div>
          <form className={styles.profilePicForm} onSubmit={handleProfilePicFormSubmit}>
            {editingProfilePic && <input type="file" />}
            {editingProfilePic ? (
              <button type="submit">Upload</button>
            ) : (
              <Button
                text="Edit"
                action={() => setEditingProfilePic(true)}
              />
            )}
          </form>
          <div className={styles.infoContainer}>
            <p className={styles.infoItem}>
              Member since:
              {admin.createdAt ? formatDate(admin.createdAt) : ''}
            </p>
            <p className={styles.infoItem}>
              Member Authorization:
              {admin.role || ''}
            </p>
            <div className={styles.emailContainer}>
              <span>Email Address:</span>
              <span>{admin.email || ''}</span>
            </div>
            <div className={styles.passwordContainer}>
              <span>Password:</span>
              <span>{'*'.repeat(8)}</span>
              <Button text="Update" action={() => setEditModalOpen(true)} />
            </div>
          </div>
          <Button
            text="Logout"
            style={{ width: '100px', height: '50px', fontWeight: 'bold' }}
            action={handleLogout}
          />
        </div>
      </div>
      <Modal
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        modalContentRef={modalContentRef}
        title="Edit Profile"
      >
        <form className={styles.userInfoForm} onSubmit={handleUserInfoFormSubmit}>
          <div className={styles.infoItem}>
            <label>
              Member since:
              <input
                type="text"
                value={admin.createdAt ? formatDate(admin.createdAt) : ''}
                onChange={(e) => setAdminData({ ...admin, createdAt: e.target.value })}
                disabled // Disable if you don't want this to be editable
              />
            </label>
          </div>
          <div className={styles.infoItem}>
            <label>
              Member Authorization:
              <input
                type="text"
                value={admin.role || ''}
                onChange={(e) => setAdminData({ ...admin, role: e.target.value })}
              />
            </label>
          </div>
          <div className={styles.emailContainer}>
            <label>
              Email Address:
              <input
                type="email"
                value={admin.email || ''}
                onChange={(e) => setAdminData({ ...admin, email: e.target.value })}
              />
            </label>
          </div>
          <div className={styles.passwordContainer}>
            <label>
              Password:
              <input
                type="password"
                value={password} // You need to manage this state
                onChange={(e) => setPassword(e.target.value)} // And the corresponding state setter
              />
            </label>
          </div>
          <button type="submit">Save</button>
        </form>

      </Modal>
    </div>
  );
}
