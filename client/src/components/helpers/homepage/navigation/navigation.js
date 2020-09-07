import React, { useState, Fragment } from 'react';
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
import { Link, withRouter } from "react-router-dom";
import "./style.css";
import { connect } from "react-redux";
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

const modifiers = {
    preventOverflow: {
      enabled: true,
    },
    flip: {
      enabled: false,
    },
};

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popoverOpen, openPopover] = useState(false);
  const [popoverOpenTwo, openPopoverTwo] = useState(false);
  const [popoverOpenThree, openPopoverThree] = useState(false);
 
  const toggle = () => setIsOpen(!isOpen);

  const logOut = () => {
    localStorage.clear();
    console.log(props.email);
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
  const renderContent = () => {
      if (props.authenticated) {
          return (
                <Fragment>
                    <div class="header-widget">
                        <div class="header-notifications user-menu">
                            <div class="header-notifications-trigger">
                                <a id="Popover3" onClick={toggleThirdPopover}><div class="user-avatar user-avatar-main status-online"><img style={{ marginTop: "20px" }} src="images/user-avatar-small-01.jpg" alt="random" /></div></a>
                            </div>
                            <Popover id="special-move-left" placement="bottom" isOpen={popoverOpenThree} target="Popover3">
                                    <PopoverHeader>
                                        <div class="user-status">
                                            <div class="user-details">
                                                <div class="user-avatar status-online"><img src="images/user-avatar-small-01.jpg" alt="random" /></div>
                                                <div class="user-name">
                                                    Tom Smith <span>Freelancer</span>
                                                </div>
                                            </div>
                                            <div class="status-switch" id="snackbar-user-status">
                                                <label class="user-online current-status">Online</label>
                                                <label class="user-invisible">Invisible</label>
                                            
                                                <span class="status-indicator" aria-hidden="true"></span>
                                            </div>	
                                        </div>
                                    </PopoverHeader>
                                    <PopoverBody className="body-popover">
                                        <div class="drop-drop">           
                                            <ul class="user-menu-small-nav">
                                                <li><a href="/"><i class="icon-material-outline-dashboard"></i> Dashboard</a></li>
                                                <li><a href="/"><i class="icon-material-outline-settings"></i> Settings</a></li>
                                                <li><a href="/"><i class="icon-material-outline-power-settings-new"></i> Logout</a></li>
                                            </ul>
                                        </div>
                                    </PopoverBody>
                                </Popover>
                            
                        </div>

                    </div>
                        <div className="header-widget hide-on-mobile">
                            <div className="header-notifications">
                                <a onClick={togglePopover} type="button" id="Popover1"><i className="icon-feather-bell fa-2x"></i><span id="circle">4</span></a>
                                <Popover className="main" id="pop" placement="bottom" modifiers={modifiers} isOpen={popoverOpen} target="Popover1">
                                    <div className="main" id="controlled">
                                        <PopoverHeader className="main">
                                            <div className="header-notifications-headline">
                                                <h4>Notifications</h4>
                                                <button className="mark-as-read ripple-effect-dark" title="Mark all as read" data-tippy-placement="left">
                                                    <i className="icon-feather-check-square"></i>
                                                </button>
                                            </div>
                                        </PopoverHeader>
                                        <PopoverBody className="main body-popover">
                                
                                                <div className="header-notifications-content">
                                                    <div className="header-notifications-scroll" data-simplebar>
                                                        <ul id="list">
                                                            <li className="notifications-not-read">
                                                                <a href="dashboard-manage-candidates.html">
                                                                    <span className="notification-icon"><i className="icon-material-outline-group"></i></span>
                                                                    <span className="notification-text">
                                                                        <strong>Michael Shannah</strong> applied for a job <span className="color">Full Stack Software Engineer</span>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="dashboard-manage-bidders.html">
                                                                    <span className="notification-icon"><i className=" icon-material-outline-gavel"></i></span>
                                                                    <span className="notification-text">
                                                                        <strong>Gilbert Allanis</strong> placed a bid on your <span className="color">iOS App Development</span> project
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="dashboard-manage-jobs.html">
                                                                    <span className="notification-icon"><i className="icon-material-outline-autorenew"></i></span>
                                                                    <span className="notification-text">
                                                                        Your job listing <span className="color">Full Stack PHP Developer</span> is expiring.
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="dashboard-manage-candidates.html">
                                                                    <span className="notification-icon"><i className="icon-material-outline-group"></i></span>
                                                                    <span className="notification-text">
                                                                        <strong>Sindy Forrest</strong> applied for a job <span className="color">Full Stack Software Engineer</span>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li className="notifications-not-read">
                                                                <a href="dashboard-manage-candidates.html">
                                                                    <span className="notification-icon"><i className="icon-material-outline-group"></i></span>
                                                                    <span className="notification-text">
                                                                        <strong>Michael Shannah</strong> applied for a job <span className="color">Full Stack Software Engineer</span>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="dashboard-manage-bidders.html">
                                                                    <span className="notification-icon"><i className=" icon-material-outline-gavel"></i></span>
                                                                    <span className="notification-text">
                                                                        <strong>Gilbert Allanis</strong> placed a bid on your <span className="color">iOS App Development</span> project
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="dashboard-manage-jobs.html">
                                                                    <span className="notification-icon"><i className="icon-material-outline-autorenew"></i></span>
                                                                    <span className="notification-text">
                                                                        Your job listing <span className="color">Full Stack PHP Developer</span> is expiring.
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="dashboard-manage-candidates.html">
                                                                    <span className="notification-icon"><i className="icon-material-outline-group"></i></span>
                                                                    <span className="notification-text">
                                                                        <strong>Sindy Forrest</strong> applied for a job <span className="color">Full Stack Software Engineer</span>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <button className="btn btn-blue" style={{ width: "100%" }} onClick={null} >View All Notifications</button>
                                                </div>
                                            
                                        </PopoverBody>
                                    </div>
                                </Popover>
                        <div className="header-widget make-border-right hide-on-mobile">
                            <div className="header-notifications">
                                <a style={{ marginRight: "30px" }} onClick={togglePopoverTwo} type="button" id="Popover2"><i class="icon-feather-mail fa-2x"></i><span id="circle">8</span></a>
                                <Popover className="main" id="pop" placement="bottom" modifiers={modifiers} isOpen={popoverOpenTwo} target="Popover2">
                                    <div className="main" id="controlled">
                                        <PopoverHeader className="main">
                                            <div class="header-notifications-headline">
                                                <h4>Messages</h4>
                                                <button class="mark-as-read ripple-effect-dark" title="Mark all as read" data-tippy-placement="left">
                                                    <i class="icon-feather-check-square"></i>
                                                </button>
                                            </div>
                                        </PopoverHeader>
                                        <PopoverBody className="body-popover main">
                                
                                        <div class="header-notifications-content"> 
                                        <div class="header-notifications-scroll" data-simplebar>
                                            <ul>
                                        
                                                <li class="notifications-not-read">
                                                    <a href="dashboard-messages.html">
                                                        <span class="notification-avatar status-online"><img src="images/user-avatar-small-03.jpg" alt=""/></span>
                                                        <div class="notification-text">
                                                            <strong>David Peterson</strong>
                                                            <p class="notification-msg-text">Thanks for reaching out. I'm quite busy right now on many...</p>
                                                            <span class="color">4 hours ago</span>
                                                        </div>
                                                    </a>
                                                </li>

                                                <li class="notifications-not-read">
                                                    <a href="dashboard-messages.html">
                                                        <span class="notification-avatar status-offline"><img src="images/user-avatar-small-02.jpg" alt=""/></span>
                                                        <div class="notification-text">
                                                            <strong>Sindy Forest</strong>
                                                            <p class="notification-msg-text">Hi Tom! Hate to break it to you, but I'm actually on vacation until...</p>
                                                            <span class="color">Yesterday</span>
                                                        </div>
                                                    </a>
                                                </li>

                                        
                                                <li class="notifications-not-read">
                                                    <a href="dashboard-messages.html">
                                                        <span class="notification-avatar status-online"><img src="images/user-avatar-placeholder.png" alt=""/></span>
                                                        <div class="notification-text">
                                                            <strong>Marcin Kowalski</strong>
                                                            <p class="notification-msg-text">I received payment. Thanks for cooperation!</p>
                                                            <span class="color">Yesterday</span>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                            <button className="btn btn-info" style={{ width: "100%" }} onClick={null} >View All Messages</button>
                                        </div>
                                    </div>
                                            
                                        </PopoverBody>
                                    </div>
                                </Popover>
                                </div>
                            </div>
                        </div>
                    </div>
            </Fragment>
          );
    } else {
        return (
            <Fragment>
                <NavItem style={{ marginRight: "20px" }} className="nav-link-special">
                <NavLink className="btn btn-success sign-up"><Link style={{ color: "white" }} to="/register">Sign-Up (Free)</Link></NavLink>
                </NavItem>
                <NavItem className="nav-link-special">
                    <NavLink className="btn btn-primary sign-in"><Link style={{ color: "white" }} to="/sign-in">Sign-In</Link></NavLink>
                </NavItem>
            </Fragment>
        );
    } 
  }
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand><Link style={{ color: "black" }} to="/">Talented Engineers Inc.</Link></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* <NavItem>
              <NavLink className="link" href="/"><Link className="link" to="/">Something</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="link" href="/">Something... Link</NavLink>
            </NavItem> */}
            <UncontrolledDropdown className="drop" nav inNavbar>
              <DropdownToggle className="link" nav caret>
                Businesses / Clients
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                    <Link className="dropdown-link" to="/">Find A Developer</Link>
                </DropdownItem>
                <DropdownItem className="dropdown-link">
                    <Link className="dropdown-link" to="/">General Account Settings</Link>
                </DropdownItem>
                <DropdownItem className="dropdown-link" divider />
                <DropdownItem>
                    <Link className="dropdown-link" to="/">Profile</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown className="drop" nav inNavbar>
              <DropdownToggle className="link" nav caret>
                Developers / Designers
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                    <Link className="dropdown-link" to="/display/jobs/main">Find Clients Looking For Work</Link>
                </DropdownItem>
                <DropdownItem className="dropdown-link">
                    <Link className="dropdown-link" to="/">General Account Settings</Link>
                </DropdownItem>
                <DropdownItem className="dropdown-link" divider />
                <DropdownItem>
                    <Link className="dropdown-link" to="/">Profile</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown className="drop" nav inNavbar>
              <DropdownToggle className="link" nav caret>
                DropDown Two
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                    <Link className="dropdown-link" to="/">Marriot - Dummy link</Link>
                </DropdownItem>
                <DropdownItem className="dropdown-link">
                    <Link className="dropdown-link" to="/">General Account Settings</Link>
                </DropdownItem>
                <DropdownItem className="dropdown-link" divider />
                <DropdownItem>
                    <Link className="dropdown-link" to="/">Profile</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown className="drop" nav inNavbar>
              <DropdownToggle className="link" nav caret>
                DropDown Three
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                    <Link className="dropdown-link" to="/">Marriot - Dummy link</Link>
                </DropdownItem>
                <DropdownItem className="dropdown-link">
                    <Link className="dropdown-link" to="/">General Account Settings</Link>
                </DropdownItem>
                <DropdownItem className="dropdown-link" divider />
                <DropdownItem>
                    <Link className="dropdown-link" to="/">Profile</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {props.auth === true ? <UncontrolledDropdown className="drop" nav inNavbar>
              <DropdownToggle className="link" nav caret>
                Manage Profile
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                    <Link className="dropdown-link" to="/profile/settings">Profile Settings - Public</Link>
                </DropdownItem>
                <DropdownItem className="dropdown-link">
                    <Link className="dropdown-link" to="/">Refer A Friend & Get $25</Link>
                </DropdownItem>
                <DropdownItem className="dropdown-link" divider />
                <DropdownItem>
                    <Link className="dropdown-link" to="/">Dashboard - Booked Rooms</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> : null}
          </Nav>
          {renderContent()}
        </Collapse>
      </Navbar>
    </div>
  );
}
const mapStateToProps = state => {
  console.log("state.... :", state);
  for (const key in state.auth) {
    const obj = state.auth;
    console.log("obj", obj);
    if (obj.authenticated.hasOwnProperty("email")) {
      console.log("has email...");
      return {
        auth: true,
        email: state.auth.authenticated.email,
        avatar: state.auth.authenticated.avatar
      }
    } else {
      console.log("doesnt have email");
      return {
        auth: false
      }
    }
  }
}

export default withRouter(connect(mapStateToProps, {  })(Navigation));

 