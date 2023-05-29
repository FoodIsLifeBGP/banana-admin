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
import styles from './style.module.scss';
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
            <Icon name="bananaIcon" />
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
          <Icon name="alertBell" />
        </NavItem>
        <NavItem className={styles.navIcon}>
          <Icon name="tasks" />
        </NavItem>
        <NavItem className={styles.navIcon}>
          <Icon name="ellipse" />
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
