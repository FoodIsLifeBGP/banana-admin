import React, { useEffect, useState, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import {
  Form, FormGroup, Label, Input, Container,
} from 'reactstrap';
import useGlobal from '../../state';
import Navbar from '../../Components/Navbar';
import Button from '../../Components/Button';
import styles from './style.module.scss';
import ApiService from '../../Services/ApiService';
import Modal from '../../Components/Modal';
import fallbackPic from '../../Image/banana.png';
import Spinner from '../../Components/Spinner/Spinner';

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
  createdAt: formatDate(admin.created_at),
  role: admin.user_type,
  email: admin.email,
});

const formatAdminUpdateData = (admin) => ({
  firstName: admin.first_name,
  lastName: admin.last_name,
  email: admin.email,
});

export default function SettingsPage() {
  const [store, { logOut }] = useGlobal();
  const { axiosRequest, axiosFormRequest } = ApiService();
  const navigate = useNavigate();
  const [admin, setAdminData] = useState({});
  const [adminUpdate, setAdminUpdate] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProfilePic, setEditingProfilePic] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const modalContentRef = useRef(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          setLoading(true);
          const currentUser = JSON.parse(userStr);
          const response = await axiosRequest('GET', `admins/${currentUser.id}`);

          if (response?.data?.admin) {
            setAdminData(formatAdminData(response.data.admin));
            setAdminUpdate(formatAdminUpdateData(response.data.admin));
          } else if (response?.data?.errors) {
            console.error('Error updating profile pic', JSON.stringify(response?.data?.errors));
          }
        } catch (error) {
          console.error('Error fetching admin', JSON.stringify(error));
        }
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const handleLogout = async () => {
    await logOut(store);
    navigate('/login');
  };

  const handleFileChange = (e) => {
    setLoading(false);
    const file = e.target.files[0];
    if (file) {
      setFileSelected(true);
      setSelectedFileName(file.name);
    } else {
      setFileSelected(false);
      setSelectedFileName('');
    }
  };

  const handleProfilePicFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('admin[avatar]', e.target[0].files[0]);

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    try {
      setLoading(true);
      const response = await axiosFormRequest(
        'PATCH',
        `admins/${currentUser.id}/update`,
        formData,
      );
      if (response?.data?.admin) {
        setAdminData(formatAdminData(response.data.admin));
        setEditingProfilePic(false);
      } else if (response?.data?.errors) {
        console.error('Error updating profile pic', JSON.stringify(response?.data?.errors));
      }
    } catch (error) {
      console.error('Error updating profile pic', JSON.stringify(error));
    }
    setLoading(false);
  };

  const handleUserInfoFormSubmit = async (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    const adminUpdateParams = {
      first_name: adminUpdate.firstName,
      last_name: adminUpdate.lastName,
      email: adminUpdate.email,
    };

    try {
      setLoading(true);
      const response = await axiosFormRequest(
        'PATCH',
        `admins/${currentUser.id}/update`,
        { admin: adminUpdateParams },
      );

      if (response?.data?.admin) {
        setAdminData(formatAdminData(response.data.admin));
        setAdminUpdate(formatAdminUpdateData(response.data.admin));
      } else if (response?.data?.errors) {
        console.error('Error updating profile pic', JSON.stringify(response?.data?.errors));
      }
    } catch (error) {
      console.error('Error updating admin', JSON.stringify(error));
    }
    setLoading(false);
    setEditModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <Container className={styles.container}>
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
            {editingProfilePic && (
              <>
                <input type="file" id="fileUpload" onChange={handleFileChange} />
                <label htmlFor="fileUpload" onClick={() => setLoading(true)} className={styles.fileUploadButton}>
                  Select Photo
                </label>
                {fileSelected && (
                  <div>
                    <button className={styles.profilePicButton} type="submit">Save</button>
                    <p className={styles.selectedFileName}>{selectedFileName}</p>
                  </div>
                )}
              </>
            )}
            {!editingProfilePic && (
              <button
                type="button"
                className={styles.profilePicButton}
                onClick={() => setEditingProfilePic(true)}
              >
                Change Photo
              </button>
            )}
            <Spinner loading={loading} />
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
            <hr />
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
      </Container>
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
        <Form onSubmit={handleUserInfoFormSubmit} className={styles.userInfoForm}>
          <FormGroup floating>
            <Input
              id="firstName"
              type="text"
              value={adminUpdate.firstName || ''}
              onChange={(e) => setAdminUpdate({ ...adminUpdate, firstName: e.target.value })}
            />
            <Label for="firstName">
              First Name
            </Label>
          </FormGroup>

          <FormGroup floating>
            <Input
              id="lastName"
              type="text"
              value={adminUpdate.lastName || ''}
              onChange={(e) => setAdminUpdate({ ...adminUpdate, lastName: e.target.value })}
            />
            <Label for="lastName">
              Last Name
            </Label>
          </FormGroup>

          <FormGroup floating>
            <Input
              id="email"
              type="email"
              value={adminUpdate.email || ''}
              onChange={(e) => setAdminUpdate({ ...adminUpdate, email: e.target.value })}
            />
            <Label for="email">
              Email
            </Label>
          </FormGroup>
        </Form>
      </Modal>
      <Spinner loading={loading} />
    </div>
  );
}
