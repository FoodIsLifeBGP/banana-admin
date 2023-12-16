import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

import Icon from '../Icon';
import styles from './style.module.scss';

function BananaAdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar expand="sm" light className={styles.container}>
      <Link to="/" className={styles.navBarBrand}>
        <Icon name="bananaIcon" size={75} className={styles.navIcon} />
        <NavbarText className={styles.bananaPortalNav}>
          BANANA
          <br />
          PORTAL
        </NavbarText>
      </Link>

      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className={`ms-auto ${styles.mobileNav}`} navbar>
          <NavItem className={styles.navItem}>
            <Link to="/notifications" className={`nav-link ${styles.navLink}`}>
              <Icon name="alertBell" size={32} className={styles.navIcon} />
              <span className={styles.mobileText}>Notifications</span>
            </Link>
          </NavItem>

          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              <Icon name="tasks" size={32} className={styles.navIcon} />
              <span className={styles.mobileText}>Tasks</span>
            </DropdownToggle>
            <DropdownMenu className={styles.tasksDropdown}>
              <DropdownItem>
                <Link to="/admins" className="dropdown-item">
                  Admins
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/clients" className="dropdown-item">
                  Clients
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/donors" className="dropdown-item">
                  Donors
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <NavItem className={styles.navItem}>
            <Link to="/settings" className={`nav-link ${styles.navLink}`}>
              <Icon name="avatar" size={35} className={styles.navIcon} />
              <span className={styles.mobileText}>Profile</span>
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default BananaAdminNavbar;
