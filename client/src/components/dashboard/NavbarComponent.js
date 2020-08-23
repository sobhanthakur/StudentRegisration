import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";

const NavbarComponent = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const dispatch = useDispatch()

  return (
    <>
      <Navbar color="faded" light>
        <NavbarBrand className="mr-auto">
          Student Registration Portal
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/dashboard/">Student Registration</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/students/">View Students</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/" onClick={e => dispatch(logout())}>
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
