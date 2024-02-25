import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, FormGroup, Label, Input, Container,
} from 'reactstrap';

import { useGlobalStateContext } from 'src/contexts/GlobalStateContext';

import Badge from '../../Components/Badge';
import Button from '../../Components/Button';
import fallbackPic from '../../Image/banana.png';
import Modal from '../../Components/Modal';
import Spinner from '../../Components/Spinner/Spinner';

import ApiService from '../../Services/ApiService';

import styles from './style.module.scss';
import initialState from '../../util/environment';

const formatDate = (date) => {
  const dateObj = new Date(date);

  if (dateObj) {
    return dateObj.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return 'N/A';
};

const formatAdminData = (admin) => ({
  firstName: admin.first_name,
  lastName: admin.last_name,
  avatarUrl: admin.avatar_url,
  createdAt: formatDate(admin.created_at),
  role: admin.user_type,
  email: admin.email,
  accountStatus: admin.account_status,
});

const formatAdminUpdateData = (admin) => ({
  firstName: admin.first_name,
  lastName: admin.last_name,
  email: admin.email,
});

export default function SettingsPage() {
  const { logOut, admin: savedUser } = useGlobalStateContext();
  const { axiosRequest, axiosFormRequest } = ApiService();
  const navigate = useNavigate();

  const [admin, setAdminData] = useState({});
  const [adminUpdate, setAdminUpdate] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProfilePic, setEditingProfilePic] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState(undefined);

  useEffect(() => {
    const fetchAdmin = async () => {
      if (savedUser) {
        try {
          setLoading(true);
          const response = await axiosRequest('GET', `admins/${savedUser.id}`);

          if (response?.data?.admin) {
            setAdminData(formatAdminData(response.data.admin));
            setAdminUpdate(formatAdminUpdateData(response.data.admin));
          } else if (response?.data?.errors) {
            setResponseError(`Error fetching admin: ${response.data.errors}`);
            setModalOpen(true);
          }
        } catch (error) {
          setResponseError(`Error fetching admin: ${error.message}`);
          setModalOpen(true);
        }
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const handleLogout = async () => {
    await logOut();
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

    try {
      setLoading(true);
      const response = await axiosFormRequest(
        'PATCH',
        `admins/${savedUser.id}/update`,
        formData,
      );
      if (response?.data?.admin) {
        setAdminData(formatAdminData(response.data.admin));
        setEditingProfilePic(false);
      } else if (response?.data?.errors) {
        setResponseError(`Error updating profile pic: ${response.data.errors}`);
        setModalOpen(true);
      }
    } catch (error) {
      setResponseError(`Error updating profile pic: ${error.message}`);
      setModalOpen(true);
    }
    setLoading(false);
  };

  const handleUserInfoFormSubmit = async (e) => {
    e.preventDefault();

    const adminUpdateParams = {
      first_name: adminUpdate.firstName,
      last_name: adminUpdate.lastName,
      email: adminUpdate.email,
    };

    try {
      setLoading(true);
      const response = await axiosFormRequest(
        'PATCH',
        `admins/${savedUser.id}/update`,
        {
          [initialState.USER_IDENTITY]: adminUpdateParams,
        },
      );

      if (response?.data?.admin) {
        setAdminData(formatAdminData(response.data.admin));
        setAdminUpdate(formatAdminUpdateData(response.data.admin));
      } else if (response?.data?.errors) {
        setResponseError(`Error updating admin: ${response.data.errors}`);
        setModalOpen(true);
      }
    } catch (error) {
      setResponseError(`Error updating admin: ${error.message}`);
      setModalOpen(true);
    }
    setLoading(false);
    setModalOpen(false);
  };

  const modalButtonConfig = () => {
    const cancelButton = {
      text: 'Back',
      variant: 'buttonSecondary',
      action: () => setModalOpen(false),
    };

    if (responseError) {
      return [cancelButton];
    }

    const updateButton = {
      text: 'Update',
      type: 'submit',
      variant: 'buttonPrimary',
      action: handleUserInfoFormSubmit,
    };

    return [cancelButton, updateButton];
  };

  return (
    <>
      {admin && admin.email && (
        <Container className={styles.container}>
          <div className={styles.content}>
            <h2 className={styles.nameHeader}>
              {`${admin.firstName || ''} ${admin.lastName || ''}`.toUpperCase()}
            </h2>
            <div className={styles.profilePicWrapper}>
              <img
                alt="profile pic"
                className={styles.profilePic}
                src={
                  admin.avatarUrl
                    ? `${initialState.API_BASE_URL}${admin.avatarUrl}`
                    : fallbackPic
                }
              />
            </div>
            <form
              className={styles.profilePicForm}
              onSubmit={handleProfilePicFormSubmit}
            >
              {editingProfilePic && (
                <>
                  <input
                    type="file"
                    id="fileUpload"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="fileUpload"
                    onClick={() => setLoading(true)}
                    className={styles.fileUploadButton}
                  >
                    Select Photo
                  </label>
                  {fileSelected && (
                    <div>
                      <button className={styles.profilePicButton} type="submit">
                        Save
                      </button>
                      <p className={styles.selectedFileName}>
                        {selectedFileName}
                      </p>
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
                <Badge
                  status={admin.accountStatus}
                  text={admin.role ? admin.role : ''}
                />
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
                action={() => setModalOpen(true)}
              />
              <Button
                text="Logout"
                style={{ width: '20%' }}
                action={handleLogout}
              />
            </div>
          </div>
        </Container>
      )}
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        title={responseError ? 'Error Occurred' : 'Edit Profile'}
        buttonsConfig={modalButtonConfig()}
      >
        {responseError ? (
          <p>{responseError}</p>
        ) : (
          <Form
            onSubmit={handleUserInfoFormSubmit}
            className={styles.userInfoForm}
          >
            <FormGroup floating>
              <Input
                id="firstName"
                type="text"
                value={adminUpdate.firstName || ''}
                onChange={(e) => setAdminUpdate({ ...adminUpdate, firstName: e.target.value })}
              />
              <Label for="firstName">First Name</Label>
            </FormGroup>

            <FormGroup floating>
              <Input
                id="lastName"
                type="text"
                value={adminUpdate.lastName || ''}
                onChange={(e) => setAdminUpdate({ ...adminUpdate, lastName: e.target.value })}
              />
              <Label for="lastName">Last Name</Label>
            </FormGroup>

            <FormGroup floating>
              <Input
                id="email"
                type="email"
                value={adminUpdate.email || ''}
                onChange={(e) => setAdminUpdate({ ...adminUpdate, email: e.target.value })}
              />
              <Label for="email">Email</Label>
            </FormGroup>
          </Form>
        )}
      </Modal>
      <Spinner loading={loading} />
    </>
  );
}
