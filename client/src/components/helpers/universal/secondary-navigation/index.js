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
  NavbarText
} from 'reactstrap';
import { completedSignup } from "../../../../actions/signup/signedUpOrNot.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const NavigationTwo = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const exitSignup = () => {
    localStorage.clear();

    props.completedSignup(false);

    setTimeout(() => {
    //   props.authentication({});

      props.history.push("/");

      window.location.reload();
    }, 750);
  }
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Talented Engineer's Inc.</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* <NavItem>
              <NavLink><button onClick={exitSignup} className="btn red-btn" style={{ color: "white" }}>Exit Sign-Up</button></NavLink>
            </NavItem> */}
          </Nav>
          <NavbarText>You have restricted access until completing registration.</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default withRouter(connect(null, { completedSignup })(NavigationTwo));