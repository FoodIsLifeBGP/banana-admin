import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  Navbar as BootstrapNavbar,
  NavbarBrand,
  NavbarText,
  NavLink,
  NavItem,
  Row,
  Col,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import styles from './style.module.css';
import Icon from '../Icon';

function Navbar(props) {
  // eslint-disable-next-line no-unused-vars
  const { showMenu, showNotification } = props;
  // Bell: /notifications
  // Banana Portal: /home
  // Profile Pic: /settings
  // List: /all-clients (or /all-donors depending on what list is more popular)

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <BootstrapNavbar className={styles.container}>
      <NavbarBrand href="/">
        <Row className="align-items-center">
          <Col>
            <Icon name="bananaIcon" size={75} />
          </Col>
          <Col>
            <NavbarText className={styles.bananaPortalNav}>
              BANANA
              <br />
              PORTAL
            </NavbarText>
          </Col>
        </Row>
      </NavbarBrand>
      <Nav pills>
        <NavItem className={styles.navIcon}>
          <NavLink href="/notifications">
            <Icon name="alertBell" size={35} />
          </NavLink>
        </NavItem>
        <NavItem className={styles.navIcon}>
          <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
            {dropdownOpen ? (
              <DropdownToggle nav caret style={{ backgroundColor: '#F0EEEE' }}>
                <Icon name="tasks" size={35} />
              </DropdownToggle>
            ) : (
              <DropdownToggle nav caret>
                <Icon name="tasks" size={35} />
              </DropdownToggle>
            )}

            <DropdownMenu>
              <DropdownItem>
                <NavLink href="/users/all">All</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="/users/clients">Clients</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="/users/donors">Donors</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavItem>
        <NavItem className={styles.navIcon}>
          <NavLink href="/settings">
            <Icon name="ellipse" size={35} />
          </NavLink>
        </NavItem>
      </Nav>
    </BootstrapNavbar>
  );
}

Navbar.propTypes = {
  showNotification: PropTypes.bool,
  showMenu: PropTypes.bool,
};

Navbar.defaultProps = {
  showNotification: true,
  showMenu: true,
};

export default Navbar;
