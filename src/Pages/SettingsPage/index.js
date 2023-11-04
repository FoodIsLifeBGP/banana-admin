import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobal from '../../state';
import Navbar from '../../Components/Navbar';
// import ProfilePicture from '../../Components/ProfilePicture';
import Button from '../../Components/Button';
import styles from './style.module.css';
import ApiService from '../../Services/ApiService';

const formatAdminData = (admin) => ({
  firstName: admin.first_name,
  lastName: admin.last_name,
  avatarUrl: admin.avatar_url,
  createdAt: new Date(admin.created_at),
  role: admin.user_type,
  email: admin.email,
});

const formatDate = (date) => {
  if (date) {
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return new Date();
};

export default function SettingsPage() {
  const [store, { logOut }] = useGlobal();
  const { axiosRequest, axiosFormRequest } = ApiService();
  const navigate = useNavigate();
  const [admin, setAdminData] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('admin[avatar]', e.target[0].files[0]);

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await axiosFormRequest('PATCH', `admins/${currentUser.id}/update`, formData);
    if (response?.data?.admin) {
      setAdminData(formatAdminData(response.data.admin));
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.background}>
        <div className={styles.content}>
          <h2 className={styles.nameHeader}>{`${admin.firstName || ''} ${admin.lastName || ''}`.toUpperCase()}</h2>
          <img style={{ width: '2rem', height: '2rem' }} src={admin.avatarUrl ? `${store.API_BASE_URL}${admin.avatarUrl}` : ''} alt="Profile" />
          <form onSubmit={handleSubmit}>
            <input type="file" />
            <button type="submit">Upload</button>
          </form>
          <a className={styles.editLink} href="/">Edit</a>
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
              <a className={styles.editPassword} href="/">Update</a>
            </div>
            <Button text="Logout" style={{ width: '100px', height: '50px', fontWeight: 'bold' }} action={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
}
