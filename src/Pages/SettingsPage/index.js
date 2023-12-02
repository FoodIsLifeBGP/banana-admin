import React, { useEffect, useState, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import {
  Col, Form, FormGroup, Label, Input,
} from 'reactstrap';
import useGlobal from '../../state';
import Navbar from '../../Components/Navbar';
import Button from '../../Components/Button';
import styles from './style.module.scss';
import ApiService from '../../Services/ApiService';
import Modal from '../../Components/Modal';
import fallbackPic from '../../Image/banana.png';
import Icon from '../../Components/Icon';

const formatDate = (date) => {
  if (date) {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return '';
};

const formatAdminData = (admin) => ({
  firstName: admin.first_name,
  lastName: admin.last_name,
  avatarUrl: admin.avatar_url,
  createdAt: formatDate(admin.created_at), // TODO: update backend to send this
  role: admin.user_type,
  email: admin.email,
});

export default function SettingsPage() {
  const [store, { logOut }] = useGlobal();
  const { axiosRequest, axiosFormRequest } = ApiService();
  const navigate = useNavigate();
  const [admin, setAdminData] = useState({});
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProfilePic, setEditingProfilePic] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const modalContentRef = useRef(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const currentUser = JSON.parse(userStr);
        const response = await axiosRequest('GET', `admins/${currentUser.id}`);

        if (response?.data?.admin) {
          setAdminData(formatAdminData(response.data.admin));
          console.log(response.data.admin);
        }
      }
    };
    fetchAdmin();
  }, []);

  const handleLogout = async () => {
    await logOut(store);
    navigate('/login');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileSelected(true);
    } else {
      setFileSelected(false);
    }
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
          <div className={styles.profilePicWrapper}>
            <img
              alt="profile pic"
              className={styles.profilePic}
              src={admin.avatarUrl ? `${store.API_BASE_URL}${admin.avatarUrl}` : fallbackPic}
            />
          </div>
          <form className={styles.profilePicForm} onSubmit={handleProfilePicFormSubmit}>
            {!editingProfilePic && (
              <Button
                text="Edit"
                className={styles.profilePicButton}
                action={() => setEditingProfilePic(true)}
              />
            )}
            {editingProfilePic && (
              <>
                <input type="file" id="fileUpload" onChange={handleFileChange} />
                <label htmlFor="fileUpload" className={styles.customFileUpload}>
                  Choose File
                </label>
                {fileSelected && <button className={styles.profilePicButton} type="submit">Upload</button>}
              </>
            )}
          </form>
          <div className={styles.infoContainer}>
            <p className={styles.infoItem}>
              Member Since:
              {' '}
              {admin.createdAt ? formatDate(admin.createdAt) : 'N/A'}
            </p>
            <p className={styles.infoItem}>
              Member Authorization:
              {' '}
              <span className="adminInfo">{admin.role || 'N/A'}</span>
            </p>
            <div className={styles.emailContainer}>
              <span>Email Address:</span>
              {' '}
              <span className="adminInfo">{admin.email || 'N/A'}</span>
            </div>
            <div className={styles.passwordContainer}>
              <span>Password:</span>
              <span className="adminInfo">{'*'.repeat(8)}</span>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button
              text="Update"
              style={{ width: '20%' }}
              action={() => setEditModalOpen(true)}
            />
            <Button
              text="Logout"
              style={{ width: '20%' }}
              action={handleLogout}
            />
          </div>
        </div>
      </div>
      <Modal
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        modalContentRef={modalContentRef}
        title="Edit Profile"
        buttonsConfig={[
          {
            text: 'Update',
            type: 'submit',
            variant: 'buttonPrimary',
            action: handleUserInfoFormSubmit,
          },
          {
            text: 'Cancel',
            variant: 'buttonSecondary',
            action: () => setEditModalOpen(false),
          },
        ]}
      >
        <Form onSubmit={handleUserInfoFormSubmit}>
          <FormGroup row>
            <Label for="firstName" sm={2}>First:</Label>
            <Col sm={10}>
              <Input
                id="firstName"
                type="text"
                value={admin.firstName || ''}
                onChange={(e) => setAdminData({ ...admin, firstName: e.target.value })}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="lastName" sm={2}>Last:</Label>
            <Col sm={10}>
              <Input
                id="lastName"
                type="text"
                value={admin.lastName || ''}
                onChange={(e) => setAdminData({ ...admin, lastName: e.target.value })}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="email" sm={2}>Email:</Label>
            <Col sm={10}>
              <Input
                id="email"
                type="email"
                value={admin.email || ''}
                onChange={(e) => setAdminData({ ...admin, email: e.target.value })}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="password" sm={2}>Password:</Label>
            <Col sm={10}>
              <Input
                id="password"
                value={password}
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="buttonIcon"
                className={styles.togglePassword}
                action={() => setShowPassword(!showPassword)}
                text={showPassword ? (<Icon name="visibleEye" />) : (<Icon name="hiddenEye" />)}
              />
            </Col>
          </FormGroup>
        </Form>
      </Modal>
    </div>
  );
}
