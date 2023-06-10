import React from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  Navbar as BootstrapNavbar,
  NavbarBrand,
  NavbarText,
  NavItem,
  Row,
  Col,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import styles from './style.module.css';
import Icon from '../Icon';

function Navbar(props) {
  // eslint-disable-next-line no-unused-vars
  const { showMenu, showNotification } = props;
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
          <NavLink to="/notifications">
            <Icon name="alertBell" size={35} />
          </NavLink>
        </NavItem>
        <NavItem className={styles.navIcon}>
          {/*  TODO: Which Page should this link to? */}
          <NavLink to="/">
            <Icon name="tasks" size={35} />
          </NavLink>
        </NavItem>
        <NavItem className={styles.navIcon}>
          <NavLink to="/settings">
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
