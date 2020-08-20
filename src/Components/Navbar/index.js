import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Icon from '../Icon';

function Navbar(props) {
  // eslint-disable-next-line no-unused-vars
  const { showMenu, showNotification } = props;
  //const [dropdownOpen, setDropdownOpen] = useState(false);

  //const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className={styles.container}>
      <Nav pills>
        <NavItem>
        <Icon name="bananaIcon" size={75} />
        </NavItem>
        <NavItem>
          <NavLink href="#" active className={styles.bananaPortalNav}>BANANA PORTAL</NavLink>
        </NavItem>
        <NavItem className={styles.alertBell}>
          <Icon name="alertBell" size={35} />
        </NavItem>
        <NavItem className={styles.tasks}>
          <Icon name="tasks" size={35} />
        </NavItem>
        <NavItem className={styles.ellipse}>
          <Icon name="ellipse" size={35} />
        </NavItem>
      </Nav>
    </div>
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
