import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

import Icon from '../Icon';
import styles from './style.module.css';

function BananaAdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar expand="sm" light className={styles.container}>
      <NavbarBrand href="/" className={styles.navBarBrand}>
        <Icon name="bananaIcon" size={75} className={styles.navIcon} />
        <NavbarText className={styles.bananaPortalNav}>
          BANANA
          <br />
          PORTAL
        </NavbarText>
      </NavbarBrand>

      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className={`ms-auto + ${styles.mobileNav}`} navbar>
          <NavItem className="w-100">
            <NavLink href="/notifications" className="dropdown-item">
              <Icon name="alertBell" size={32} className={styles.navIcon} />
              <NavbarText className={`${styles.displayMobile} + ${styles.navbarText}`}>
                Notifications
              </NavbarText>
            </NavLink>
          </NavItem>

          <UncontrolledDropdown nav inNavbar className={`${styles.hideMobile} w-100`}>
            <DropdownToggle
              nav
              caret
              className={`${styles.dropdownToggleMobile} + ${styles.navbarText}`}
            >
              <Icon name="tasks" size={32} className={styles.navIcon} />
              <NavbarText className={styles.displayMobile}>Tasks</NavbarText>
            </DropdownToggle>
            <DropdownMenu end className={styles.mobileDropdownTasks}>
              <DropdownItem>
                <NavLink href="/all">All</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="/clients">Clients</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="/donors">Donors</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <NavLink href="/settings" className="dropdown-item w-100">
            <Icon name="avatar" size={35} className={styles.navIcon} />
            <NavbarText className={`${styles.displayMobile} + ${styles.navbarText}`}>
              Profile
            </NavbarText>
          </NavLink>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default BananaAdminNavbar;
