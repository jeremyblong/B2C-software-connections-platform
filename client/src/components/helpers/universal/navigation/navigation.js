import React, { useState, Fragment, useEffect } from 'react';
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
import { Link, withRouter } from "react-router-dom";
import "./style.css";
import { connect } from "react-redux";
import { authentication } from "../../../../actions/auth/auth.js";
import { completedSignup } from "../../../../actions/signup/signedUpOrNot.js";
import axios from "axios";


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
  const [data, setData] = useState([]);
 
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

    localStorage.clear();

    props.completedSignup(false);

    axios.post("/logout").then((res) => {
        if (res.data.message === "Successfully disconnected from chat!") {
            console.log("logged out res.data: ", res.data);
        }
    }).catch((err) => {
        console.log(err);
    })
    
    setTimeout(() => {
        props.history.push("/");
    }, 500);
  }
  useEffect(() => {
    console.log("magic username -- :", props.username);
    if (typeof props.username !== "undefined") {
        axios.post("/gather/specific/user/username", {
            username: props.username
        }).then((res) => {
            if (res.data.message === "Found Specific User!") {
                console.log(res.data);
                setData(res.data.user);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
  }, [])
  const renderContent = () => {
      console.log("PROPS ------------ ", props);
      if (props.email) {
          return (
                <Fragment>
                    <div className="header-widget">
                        <div className="header-notifications user-menu">
                            <div className="header-notifications-trigger">
                                <a id="Popover3" onClick={toggleThirdPopover}><div className="user-avatar user-avatar-main status-online"><img id="profile-pic" src={props.profilePics ? `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${props.profilePics[props.profilePics.length - 1].picture}` : "/images/user-avatar-small-01.jpg"} alt="random" /></div></a>
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
                                                <li><Link style={{ color: "black" }} to="/dashboard"><i className="icon-material-outline-dashboard"></i> Dashboard</Link></li>
                                                <li><Link style={{ color: "black" }} to="/dashboard/settings/main"><i className="icon-material-outline-settings"></i> Settings</Link></li>
                                                <li><Link style={{ color: "black" }} to="/view/personal/profile"><i className="icon-material-outline-dashboard"></i>View Public Profile</Link></li>
                                                {props.email ? <li><button onClick={logUserOut} style={{ color: "white", width: "80%" }} className="btn blue-btn">Log-Out</button> </li> : null}
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
                                                            {data.notifications ? data.notifications.map((notification, index) => {
                                                                console.log("NOTIFYICAITONNNNNNNN: ", notification);
                                                                if (notification.freelancer_profile_id) {
                                                                    return (
                                                                        <li key={index} className="notifications-not-read">
                                                                            <Link to={{pathname: `/freelancer/individual/page/public/${notification.freelancer_profile_id}`, user: props, openPane: true, index: notification.index ? notification.index : null }}>
                                                                                <span className="notification-icon"><i className="icon-material-outline-group"></i></span>
                                                                                <span className="notification-text">
                                                                                    <strong>{notification.action_taker === props.username ? "You" : notification.action_taker}</strong> {notification.action_specific} 
                                                                                </span>
                                                                            </Link>
                                                                        </li>
                                                                    );
                                                                } else if (notification.action) {
                                                                    return (
                                                                        <li key={index} className="notifications-not-read">
                                                                            <Link to={{pathname: `/business/individual/listing/${notification.related_job}`}}>
                                                                                <span className="notification-icon"><i className="icon-material-outline-group"></i></span>
                                                                                <span className="notification-text">
                                                                                    <strong>{notification.action_taker === props.username ? "You" : notification.action_taker}</strong> {notification.action_specific} <span className="color">{notification.action.title}</span>
                                                                                </span>
                                                                            </Link>
                                                                        </li>
                                                                    );
                                                                }
                                                            }) : null}
                                                        </ul>
                                                    </div>
                                                    <button className="btn btn-blue" style={{ width: "100%" }} onClick={null} >View All Notifications</button>
                                                </div>
                                            
                                        </PopoverBody>
                                    </div>
                                </Popover>
                        <div className="header-widget make-border-right hide-on-mobile">
                            <div className="header-notifications">
                                <a style={{ marginRight: "30px" }} onClick={togglePopoverTwo} type="button" id="Popover2"><i className="icon-feather-mail fa-2x"></i><span id="circle">8</span></a>
                                <Popover className="main" id="pop" placement="bottom" modifiers={modifiers} isOpen={popoverOpenTwo} target="Popover2">
                                    <div className="main" id="controlled">
                                        <PopoverHeader className="main">
                                            <div className="header-notifications-headline">
                                                <h4>Messages</h4>
                                                <button className="mark-as-read ripple-effect-dark" title="Mark all as read" data-tippy-placement="left">
                                                    <i className="icon-feather-check-square"></i>
                                                </button>
                                            </div>
                                        </PopoverHeader>
                                        <PopoverBody className="body-popover main">
                                
                                        <div className="header-notifications-content"> 
                                        <div className="header-notifications-scroll" data-simplebar>
                                            <ul>
                                        
                                                <li className="notifications-not-read">
                                                    <a href="dashboard-messages.html">
                                                        <span className="notification-avatar status-online"><img src="/images/user-avatar-small-03.jpg" alt=""/></span>
                                                        <div className="notification-text">
                                                            <strong>David Peterson</strong>
                                                            <p className="notification-msg-text">Thanks for reaching out. I'm quite busy right now on many...</p>
                                                            <span className="color">4 hours ago</span>
                                                        </div>
                                                    </a>
                                                </li>

                                                <li className="notifications-not-read">
                                                    <a href="dashboard-messages.html">
                                                        <span className="notification-avatar status-offline"><img src="/images/user-avatar-small-02.jpg" alt=""/></span>
                                                        <div className="notification-text">
                                                            <strong>Sindy Forest</strong>
                                                            <p className="notification-msg-text">Hi Tom! Hate to break it to you, but I'm actually on vacation until...</p>
                                                            <span className="color">Yesterday</span>
                                                        </div>
                                                    </a>
                                                </li>

                                        
                                                <li className="notifications-not-read">
                                                    <a href="dashboard-messages.html">
                                                        <span className="notification-avatar status-online"><img src="/images/user-avatar-placeholder.png" alt=""/></span>
                                                        <div className="notification-text">
                                                            <strong>Marcin Kowalski</strong>
                                                            <p className="notification-msg-text">I received payment. Thanks for cooperation!</p>
                                                            <span className="color">Yesterday</span>
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
        <NavbarBrand><Link style={{ color: "black" }} to="/">The Real Coders Inc.</Link></NavbarBrand>
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
                    <Link className="dropdown-link" to="/freelancers/list/view">Find A Developer</Link>
                </DropdownItem>
                {props.accountType === "business" ? <DropdownItem className="dropdown-link">
                    <Link className="dropdown-link" to="/businesses/post/job/listing">Post A Job Listing</Link>
                </DropdownItem> : null}
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
            
            
            {props.auth === true ? <UncontrolledDropdown className="drop" nav inNavbar>
              <DropdownToggle style={{ color: "blue" }} className="link" nav caret>
                Manage Profile
              </DropdownToggle>
              <DropdownMenu right>
                {props.accountType === "freelancer" ? <DropdownItem>
                    <Link className="dropdown-link" to="/view/personal/profile">View Public Profile</Link>
                </DropdownItem> : null}
                <DropdownItem className="dropdown-link">
                    <Link className="dropdown-link" to="/purchase/tokens">Purchase Tokens</Link>
                </DropdownItem>
                <DropdownItem className="dropdown-link">
                    <Link className="dropdown-link" to="/">Refer A Friend & Get $25</Link>
                </DropdownItem>
                <DropdownItem className="dropdown-link" divider />
                <DropdownItem>
                    <Link style={{ color: "blue" }} className="dropdown-link" to="/dashboard">Dashboard</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> : null}
            <NavItem>
                <NavLink><Link to="/contact">Contact</Link></NavLink>
            </NavItem>
          </Nav>
          {renderContent()}
        </Collapse>
      </Navbar>
    </div>
  );
}
const mapStateToProps = state => {
  for (const key in state.auth) {
    const obj = state.auth;
    if (obj.authenticated && (obj.authenticated.hasOwnProperty("email"))) {
      return {
        auth: true,
        email: state.auth.authenticated.email,
        username: state.auth.authenticated.username,
        accountType: state.auth.authenticated.accountType,
        profilePics: state.auth.authenticated.profilePics
      }
    } else {
        return {
            auth: false
        }
    }
  }
}

export default withRouter(connect(mapStateToProps, { authentication, completedSignup })(Navigation));

 