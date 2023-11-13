import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
    <div className={styles.container}>
      <Navbar expand="sm" light>
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
            <NavItem>
              <NavLink href="/notifications">
                <Icon name="alertBell" size={32} className={styles.navIcon} />
                <NavbarText className={`${styles.displayMobile} + ${styles.navbarText}`}>
                  Notifications
                </NavbarText>
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar className={styles.hideMobile}>
              <DropdownToggle
                nav
                caret
                className={`${styles.dropdownToggleMobile} + ${styles.navbarText}`}
              >
                <Icon name="tasks" size={32} className={styles.navIcon} />
                <NavbarText className={styles.displayMobile}>Tasks</NavbarText>
              </DropdownToggle>
              <DropdownMenu right className={styles.mobileDropdownTasks}>
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

            <NavLink href="/settings">
              <Icon name="avatar" size={35} className={styles.navIcon} />
              <NavbarText className={`${styles.displayMobile} + ${styles.navbarText}`}>
                Profile
              </NavbarText>
            </NavLink>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default BananaAdminNavbar;

Navbar.propTypes = {
  showNotification: PropTypes.bool,
  showMenu: PropTypes.bool,
};

Navbar.defaultProps = {
  showNotification: true,
  showMenu: true,
};
