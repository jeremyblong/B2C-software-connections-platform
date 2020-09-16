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
  Button, 
  Popover, 
  PopoverHeader, 
  PopoverBody
} from 'reactstrap';
import { connect } from "react-redux";
import { authentication } from "../../../../actions/auth/auth.js";
import { completedSignup } from "../../../../actions/signup/signedUpOrNot.js";
import { withRouter } from "react-router-dom";
import "./style.css";

const NavigationTwo = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popoverOpen, openPopover] = useState(false);
  const [popoverOpenTwo, openPopoverTwo] = useState(false);
  const [popoverOpenThree, openPopoverThree] = useState(false);
 
  const toggle = () => setIsOpen(!isOpen);

  const logOut = () => {
    localStorage.clear();
    console.log(props.email);
    props.completedSignup(false);
    setTimeout(() => {
    //   props.authentication({});

      props.history.push("/");
    }, 750);
  }
  const togglePopover = () => {
    openPopover(!popoverOpen);
    openPopoverTwo(false);
    openPopoverThree(false);
  }
  const togglePopoverTwo = () => {
    openPopoverTwo(!popoverOpenTwo);
    openPopover(false);
    openPopoverThree(false);
  }
  const toggleThirdPopover = () => {
    openPopoverThree(!popoverOpenThree);
    openPopover(false);
    openPopoverTwo(false);
  }
  const logUserOut = () => {
    props.authentication({});
    props.completedSignup(false);
    
    setTimeout(() => {
        props.history.push("/");
    }, 500);
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
          <div className="header-notifications-trigger">
              <a id="Popover3" onClick={toggleThirdPopover}><div className="user-avatar user-avatar-main status-online"><img id="profile-pic special-profile-pic" src={props.profilePics ? `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${props.profilePics[props.profilePics.length - 1].picture}` : "/images/user-avatar-small-01.jpg"} alt="random" /></div></a>
          </div>
          <Popover id="special-move-left" placement="bottom" isOpen={popoverOpenThree} target="Popover3">
              <PopoverHeader>
                  <div className="user-status">
                      <div className="user-details">
                          <div className="user-avatar status-online"><img id="profile-pic" src={props.profilePics ? `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${props.profilePics[props.profilePics.length - 1].picture}` : "/images/user-avatar-small-01.jpg"} alt="random" /></div>
                          <div className="user-name">
                              {props.username ? props.username : "----"} <span> {props.accountType ? `${props.accountType} account`: "----"}</span>
                          </div>
                      </div>
                      <div className="status-switch" id="snackbar-user-status">
                          <label className="user-online current-status">Online</label>
                          <label className="user-invisible">Invisible</label>
                      
                          <span className="status-indicator" aria-hidden="true"></span>
                      </div>	
                  </div>
              </PopoverHeader>
              <PopoverBody className="body-popover">
                  <div className="drop-drop">           
                      <ul className="user-menu-small-nav">
                          {/* <li><Link style={{ color: "black" }} to="/dashboard"><i className="icon-material-outline-dashboard"></i> Dashboard</Link></li>
                          <li><Link style={{ color: "black" }} to="/dashboard/settings/main"><i className="icon-material-outline-settings"></i> Settings</Link></li>
                          <li><Link style={{ color: "black" }} to="/view/personal/profile"><i className="icon-material-outline-dashboard"></i>View Public Profile</Link></li> */}
                          {props.email ? <li><button onClick={logUserOut} style={{ color: "white", width: "80%" }} className="btn blue-btn">Log-Out</button> </li> : null}
                      </ul>
                  </div>
              </PopoverBody>
          </Popover>
          <NavbarText>You have restricted access until completing registration.</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default withRouter(connect(null, { completedSignup, authentication })(NavigationTwo));