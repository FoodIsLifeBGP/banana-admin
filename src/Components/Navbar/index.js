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
import styles from './style.module.scss';

function BananaAdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar expand="sm" light className={styles.container}>
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
            <NavLink href="/notifications" className="dropdown-item">
              <Icon name="alertBell" className={styles.navIcon} />
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
              <Icon name="tasks" className={styles.navIcon} />
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
            <Icon name="avatar" className={styles.navIcon} />
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
