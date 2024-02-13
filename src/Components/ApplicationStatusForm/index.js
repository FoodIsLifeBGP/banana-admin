import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Col, Form, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input,
} from 'reactstrap';
import styles from './style.module.scss';

function ApplicationStatusForm({
  title, handleSubmit, donor, client, userId,
}) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Set initial account status from donor or client
    if (donor && donor.account_status) {
      setSelectedStatus(donor.account_status);
    } else if (client && client.account_status) {
      setSelectedStatus(client.account_status);
    }
  }, [donor, client]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleDropdownSelect = (status) => {
    setSelectedStatus(status);
    setDropdownOpen(false);
  };

  return (
    <Container className={styles.container}>
      <Col sm={12} md={8}>
        <h3 className={styles.title}>{title}</h3>
        <Form
          className={styles.applicationStatusForm}
          onSubmit={(e) => handleSubmit(e, selectedStatus, userId)}
        >
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} size="lg">
            <DropdownToggle caret>
              {selectedStatus || 'Please Select...'}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Status</DropdownItem>
              <DropdownItem onClick={() => handleDropdownSelect('active')}>Active</DropdownItem>
              <DropdownItem onClick={() => handleDropdownSelect('inactive')}>Inactive</DropdownItem>
              <DropdownItem onClick={() => handleDropdownSelect('suspended')}>Suspended</DropdownItem>
              <DropdownItem onClick={() => handleDropdownSelect('incomplete')}>Incomplete</DropdownItem>
              <DropdownItem onClick={() => handleDropdownSelect('closed')}>Closed</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Input className={styles.buttonContainer} type="submit" value="Confirm" />
        </Form>
      </Col>
    </Container>
  );
}

ApplicationStatusForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  donor: PropTypes.object,
  client: PropTypes.object,
  // userId: PropTypes.string.isRequired,
};

ApplicationStatusForm.defaultProps = {
  donor: null,
  client: null,
};

export default ApplicationStatusForm;
