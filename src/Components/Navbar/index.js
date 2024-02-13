import React, { useState } from 'react';
import {
  Collapse,
  Navbar as ReactStrapNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom'; // Ensure this is imported

import Icon from '../Icon';
import styles from './style.module.scss';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <ReactStrapNavbar expand="sm" light className={styles.container}>
      <NavbarBrand href="/" className={styles.navBarBrand}>
        <Icon name="bananaIcon" className={styles.bananaIcon} />
        <NavbarText className={styles.navText}>
          BANANA
          <br />
          PORTAL
        </NavbarText>
      </NavbarBrand>

      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className={`ms-auto + ${styles.mobileNav}`} navbar>
          <NavItem className="w-100">
            <RouterNavLink to="/notifications" className="dropdown-item">
              <Icon name="alertBell" className={styles.navIcon} />
              <NavbarText className={`${styles.displayMobile} + ${styles.navbarText}`}>
                Notifications
              </NavbarText>
            </RouterNavLink>
          </NavItem>

          <UncontrolledDropdown nav inNavbar className={`${styles.hideMobile} w-100`}>
            <DropdownToggle
              nav
              caret
              className={`${styles.dropdownToggleMobile} + ${styles.navbarText}`}
            >
              <Icon name="tasks" className={styles.navIcon} />
              <NavbarText className={styles.displayMobile}>Tasks</NavbarText>
            </DropdownToggle>
            <DropdownMenu end className={styles.mobileDropdownTasks}>
              <DropdownItem className={styles.dropDownItem}>
                <RouterNavLink to="/all" className={styles.dropdownLink}>All</RouterNavLink>
              </DropdownItem>
              <DropdownItem className={styles.dropDownItem}>
                <RouterNavLink to="/clients" className={styles.dropdownLink}>Clients</RouterNavLink>
              </DropdownItem>
              <DropdownItem className={styles.dropDownItem}>
                <RouterNavLink to="/donors" className={styles.dropdownLink}>Donors</RouterNavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <RouterNavLink to="/settings" className="dropdown-item w-100">
            <Icon name="avatar" className={styles.navIcon} />
            <NavbarText className={`${styles.displayMobile} + ${styles.navbarText}`}>
              Profile
            </NavbarText>
          </RouterNavLink>
        </Nav>
      </Collapse>
    </ReactStrapNavbar>
  );
}

export default Navbar;
