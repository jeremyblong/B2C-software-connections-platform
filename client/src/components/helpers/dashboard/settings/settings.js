import React, { Component } from 'react'
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
import "./style.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authentication } from "../../../../actions/auth/auth.js";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-sliding-pane/dist/react-sliding-pane.css";
import SlidingPane from "react-sliding-pane";
import LoadingOverlay from 'react-loading-overlay';
import ProfileHelperSettingsOne from "./helpers/settingsHelperProfile.js";

class SettingsHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        isOpen: false,
        firstName: "",
        lastName: "",
        accountType: null,
        email: "",
        user: null,
        isPaneOpen: false,
        file: null,
        normalFile: null,
        updatedPhoto: null,
        loading: false,
        freelancerChecked: false,
        businessChecked: false,
        emailErr: "",
        emailTaken: ""
    }
}
    uploadNewProfilePic = () => {
        console.log("upload new pic...");

        const { user, file } = this.state;

        if (file !== null) {
            this.setState({
                loading: true
            }, () => {
                axios.post("/upload/new/profile/picture", {
                    username: user.username,
                    base64: file
                }).then((res) => {
                    console.log(res.data);
                    if (res.data.message === "Successfully uploaded new photo!") {
                        this.setState({
                            updatedPhoto: `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${res.data.image}`,
                            loading: false,
                            isPaneOpen: false
                        }, () => {
                            this.props.authentication(res.data.user);
                            
                            setTimeout(() => {
                                alert("Uploaded new profile picture successfully!")
                            }, 400);
                        })
                    } else if (res.data.message === "Could NOT locate any users with this field.") {
                        this.setState({
                            loading: false,
                            isPaneOpen: false
                        }, () => {
                            alert("Could not complete your request, please try again later.")
                        })
                    } else if (res.data.err) {
                        this.setState({
                            loading: false,
                            isPaneOpen: false
                        }, () => {
                            alert("An error occurred while uploading your profile picture, please try again later.");
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                    this.setState({
                        loading: false,
                        isPaneOpen: false
                    }, () => {
                        alert(err);
                    })
                })
            })
        } else {
            alert("Please select a new profile picture before submitting...")
        }
    }
    renderLoadingOverlay = () => {
        const { loading } = this.state;
        
        if (loading === true) {
            return (
                <LoadingOverlay
                    active={true}
                    spinner
                    text='Please be patient while we upload your new profile picture...' 
                    className="loading-overlay"
                >
                    <p>Please be patient while we upload your new profile picture...</p>
                </LoadingOverlay>
            );
        }
    }
    updateBasicInfomation = () => {
        const { freelancerChecked, businessChecked, firstName, lastName, email, user } = this.state;

        const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

        if (email.match(email_regex)) {
            console.log("MATCH.");
            if (firstName.length > 0 && lastName.length > 0) {
                if (freelancerChecked === true || businessChecked === true) {
                    console.log("DID CHECK ACCOUNT CHANGE TYPE!!");
                    // IF someone checked the "change" account type box - run this api call
                    axios.post("/update/profile/main/info", {
                        checked: freelancerChecked ? "freelancer" : businessChecked ? "business" : null,
                        firstName,
                        lastName,
                        email: this.state.email === 0 ? user.email : this.state.email,
                        username: user.username
                    }).then((res) => {
                        console.log(res.data);
                        if (res.data.message === "Successfully updated information!") {
                            this.props.authentication(res.data.user);
                            this.setState({
                                firstName: "",
                                lastName: "",
                                email: "",
                                businessChecked: false,
                                freelancerChecked: false
                            })
                            setTimeout(() => {
                                alert(res.data.message);
                            }, 500);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    console.log("DIDNT check account type.");
                    // if someone DIDNT check the change account type, leave it as is and update the remainder of the information
                    axios.post("/update/profile/main/info", {
                        firstName,
                        lastName,
                        email: this.state.email === 0 ? user.email : this.state.email,
                        username: user.username
                    }).then((res) => {
                        console.log(res.data);
                        if (res.data.message === "Successfully updated information!") {
                            this.props.authentication(res.data.user);
                            this.setState({
                                firstName: "",
                                lastName: "",
                                email: "",
                                businessChecked: false,
                                freelancerChecked: false
                            })
                            setTimeout(() => {
                                alert(res.data.message);
                            }, 500);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            } else {
                alert("You must enter your first and last name to change your email...");
            }
        } else {
            console.log("no match.");
            this.setState({
                emailErr: "Please enter a valid email..."
            })
        }

    }
    componentDidMount() {

        setTimeout(() => {
            axios.post("/gather/specific/user/username", {
                username: this.props.username
            }).then((res) => {
                if (res.data.message === "Found Specific User!") {
                    console.log("Found user... :", res.data);

                    this.setState({
                        user: res.data.user,
                        email: res.data.user.email
                    })
                } else if (res.data.message === "Could NOT find any user by that username") {
                    console.log("Did NOT find user... :", res.data);
                    this.setState({
                        user: "Could NOT locate user...",
                        email: this.props.email
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        }, 500);
    }
    openPane = () => {
        console.log("hi - clicked.");
        this.setState({
            isPaneOpen: !this.state.isPaneOpen
        })
    }
    checkValidEmail = () => {
        console.log("unfocussed.");

        if (this.props.email === this.state.user.email) {
            return null;
        } else {
            axios.post("/check/email/taken", {
                email: this.state.email
            }).then((res) => {
                console.log(res.data);
                if (res.data.message === "Email is already taken!") {
                    this.setState({
                        emailTaken: res.data.message,
                        email: ""
                    })
                } else {
                    this.setState({
                        emailTaken: ""
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    renderConditional = () => {
        const { user } = this.state;

        console.log("USER :) ---- :", user);

        if ((user !== null && user !== "Could NOT locate user...")) {
            return (
                <div class="dashboard-container">
                    <div class="dashboard-sidebar">
                        <div class="dashboard-sidebar-inner" data-simplebar>
                            <div class="dashboard-nav-container">
                                <div className="hide-mobile-please">
                                    <a href="#" class="dashboard-responsive-nav-trigger blue-btn">
                                        <span class="hamburger hamburger--collapse" >
                                            <span class="hamburger-box">
                                                <span class="hamburger-inner"></span>
                                            </span>
                                        </span>
                                        <span class="trigger-title">Dashboard Navigation</span>
                                    </a>
                                    <div class="dashboard-nav">
                                        <div class="dashboard-nav-inner">

                                            <ul data-submenu-title="Start">
                                                <li><Link to="/dashboard"><i class="icon-material-outline-dashboard"></i> Dashboard</Link></li>
                                                <li><Link to="/dashboard/messages"><i class="icon-material-outline-question-answer"></i> Messages <span class="nav-tag">2</span></Link></li>
                                                <li><a href="dashboard-bookmarks.html"><i class="icon-material-outline-star-border"></i> Bookmarks</a></li>
                                                <li><a href="dashboard-reviews.html"><i class="icon-material-outline-rate-review"></i> Reviews</a></li>
                                                <li><Link to="/bids/active"><i class="icon-material-outline-dashboard"></i> Active Bids</Link></li>
                                            </ul>
                                            
                                            <ul data-submenu-title="Organize and Manage">
                                                <li><a href="#"><i class="icon-material-outline-business-center"></i> Jobs</a>
                                                    <ul>
                                                        <li><a href="dashboard-manage-jobs.html">Manage Jobs <span class="nav-tag">3</span></a></li>
                                                        <li><a href="dashboard-manage-candidates.html">Manage Candidates</a></li>
                                                        <li><a href="dashboard-post-a-job.html">Post a Job</a></li>
                                                    </ul>	
                                                </li>
                                                <li><a href="#"><i class="icon-material-outline-assignment"></i> Tasks</a>
                                                    <ul>
                                                        <li><a href="dashboard-manage-tasks.html">Manage Tasks <span class="nav-tag">2</span></a></li>
                                                        <li><a href="dashboard-manage-bidders.html">Manage Bidders</a></li>
                                                        <li><a href="dashboard-my-active-bids.html">My Active Bids <span class="nav-tag">4</span></a></li>
                                                        <li><a href="dashboard-post-a-task.html">Post a Task</a></li>
                                                    </ul>	
                                                </li>
                                            </ul>

                                            <ul data-submenu-title="Account">
                                                <li class="active"><Link style={{ color: "white" }} to="/dashboard/settings/main"><i class="icon-material-outline-settings"></i> Settings</Link></li>
                                                <li><a onClick={() => {
                                                    this.props.authentication({});

                                                    localStorage.clear();

                                                    setTimeout(() => {
                                                        this.props.history.push("/");
                                                    }, 500)
                                                }}><i class="icon-material-outline-power-settings-new"></i> Logout</a></li>
                                            </ul>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="dashboard-sidebar reactstrap-navbar">
                                    <div class="dashboard-sidebar-inner" data-simplebar>
                                        <div class="dashboard-nav-container" style={{ width: "100%" }}>
                                            <Navbar color="light" light expand="md">
                                            <NavbarToggler onClick={this.toggle} >
                                                <a href="#" class="dashboard-responsive-nav-trigger blue-btn">
                                                    <span class="hamburger hamburger--collapse" >
                                                        <span class="hamburger-box">
                                                            <span class="hamburger-inner"></span>
                                                        </span>
                                                    </span>
                                                    <span class="trigger-title">Dashboard Navigation</span>
                                                </a>
                                            </NavbarToggler>
                                            <Collapse isOpen={this.state.isOpen} navbar>
                                            <Nav className="mr-auto" navbar>
                                                <NavItem>
                                                <NavLink href="/components/">Components</NavLink>
                                                </NavItem>
                                                <NavItem>
                                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                                                </NavItem>
                                                <UncontrolledDropdown nav inNavbar>
                                                <DropdownToggle nav caret>
                                                    Options
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem>
                                                    Option 1
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                    Option 2
                                                    </DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem>
                                                    Reset
                                                    </DropdownItem>
                                                </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </Nav>
                                            <NavbarText>Simple Text</NavbarText>
                                            </Collapse>
                                        </Navbar>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dashboard-content-container" data-simplebar>
                        <div class="dashboard-content-inner" >
                            <div class="dashboard-headline">
                                <h3>Settings</h3>
                                <nav id="breadcrumbs" class="dark">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">Dashboard</a></li>
                                        <li>Settings</li>
                                    </ul>
                                </nav>
                            </div>


                            <div class="row">

                                
                                <div class="col-xl-12">
                                    <div class="dashboard-box margin-top-0">

                                    
                                        <div class="headline">
                                            <h3><i class="icon-material-outline-account-circle"></i> My Account</h3>
                                        </div>

                                        <div class="content with-padding padding-bottom-0">

                                            <div class="row">

                                                <div class="col-auto">
                                                    <div onClick={this.openPane} class="avatar-wrapper" data-tippy-placement="bottom" title="Change Avatar">
                                                        <img class="profile-pic" src={this.state.updatedPhoto !== null ? this.state.updatedPhoto : `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${user.profilePics[user.profilePics.length - 1].picture}`} alt="profile-pic" />
                                                        
                                                    </div>
                                                    
                                                </div>

                                                <div class="col">
                                                    <div class="row">

                                                        <div class="col-xl-6">
                                                            <div class="submit-field">
                                                                <h5>First Name</h5>
                                                                <input onChange={(e) => {
                                                                    this.setState({
                                                                        firstName: e.target.value
                                                                    })
                                                                }} value={this.state.firstName} type="text" class="with-border" placeholder={"First Name"}/>
                                                            </div>
                                                        </div>

                                                        <div class="col-xl-6">
                                                            <div class="submit-field">
                                                                <h5>Last Name</h5>
                                                                <input onChange={(e) => {
                                                                    this.setState({
                                                                        lastName: e.target.value
                                                                    })
                                                                }} value={this.state.lastName} type="text" class="with-border" placeholder={"Last Name"} />
                                                            </div>
                                                        </div>

                                                        <div class="col-xl-6">
                                                            
                                                            <div class="submit-field">
                                                                <h5>Account Type</h5>
                                                                <div class="account-type">
                                                                    <div>
                                                                        <input onClick={() => {
                                                                            this.setState({
                                                                                freelancerChecked: true,
                                                                                businessChecked: false
                                                                            })
                                                                        }} type="radio" name="account-type-radio" id="freelancer-radio" class="account-type-radio" checked={this.state.freelancerChecked ? true : false}/>
                                                                        <label for="freelancer-radio" class="ripple-effect-dark"><i class="icon-material-outline-account-circle"></i> Freelancer</label>
                                                                    </div>

                                                                    <div>
                                                                        <input onClick={() => {
                                                                            this.setState({
                                                                                freelancerChecked: false,
                                                                                businessChecked: true
                                                                            })
                                                                        }} type="radio" name="account-type-radio" id="employer-radio" class="account-type-radio" checked={this.state.businessChecked ? true : false}/>
                                                                        <label for="employer-radio" class="ripple-effect-dark"><i class="icon-material-outline-business-center"></i> Employer</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="col-xl-6">
                                                            <div class="submit-field">
                                                                <h5>Email</h5>
                                                                <input onBlur={this.checkValidEmail} onChange={(e) => {
                                                                    this.setState({
                                                                        email: e.target.value,
                                                                        emailErr: ""
                                                                    })
                                                                }} value={this.state.email.length !== 0 ? this.state.email : this.state.user.email} type="text" class="with-border" placeholder={this.state.user.email}/>
                                                                {this.state.emailErr.length !== 0 ? <h4 style={{ color: "red" }} className="text-center">{this.state.emailErr}</h4> : null}

                                                                {this.state.emailTaken.length !== 0 ? <h4 style={{ color: "red" }} className="text-center">{this.state.emailTaken}</h4> : null}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                
                                            </div>
                                            {this.state.firstName.length > 0 || this.state.lastName.length > 0 || this.state.email.length > 0 || this.state.accountType !== null || this.state.businessChecked || this.state.freelancerChecked ? <div className="row">
                                                <button onClick={this.updateBasicInfomation} className="btn blue-btn" style={{ width: "100%", color: "white" }}>Submit Changes</button>
                                            </div> : null}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                    <ProfileHelperSettingsOne />
                                </div>

                    
                                <div class="col-xl-12">
                                    <div id="test1" class="dashboard-box">

                                        
                                        <div class="headline">
                                            <h3><i class="icon-material-outline-lock"></i> Password & Security</h3>
                                        </div>

                                        <div class="content with-padding">
                                            <div class="row">
                                                <div class="col-xl-4">
                                                    <div class="submit-field">
                                                        <h5>Current Password</h5>
                                                        <input type="password" class="with-border"/>
                                                    </div>
                                                </div>

                                                <div class="col-xl-4">
                                                    <div class="submit-field">
                                                        <h5>New Password</h5>
                                                        <input type="password" class="with-border"/>
                                                    </div>
                                                </div>

                                                <div class="col-xl-4">
                                                    <div class="submit-field">
                                                        <h5>Repeat New Password</h5>
                                                        <input type="password" class="with-border"/>
                                                    </div>
                                                </div>

                                                <div class="col-xl-12">
                                                    <div class="checkbox">
                                                        <input type="checkbox" id="two-step" checked/>
                                                        <label for="two-step"><span class="checkbox-icon"></span> Enable Two-Step Verification via Email</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            
                                <div class="col-xl-12">
                                    <a href="#" class="button ripple-effect big margin-top-30">Save Changes</a>
                                </div>

                            </div>
                    

                    
                            <div class="dashboard-footer-spacer"></div>
                            <div class="small-footer margin-top-15">
                                <div class="small-footer-copyrights">
                                    © 2019 <strong>[Comapny Name(s)]</strong>. All Rights Reserved.
                                </div>
                                {/* <ul class="footer-social-links">
                                    <li>
                                        <a href="#" title="Facebook" data-tippy-placement="top">
                                            <i class="icon-brand-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="Twitter" data-tippy-placement="top">
                                            <i class="icon-brand-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="Google Plus" data-tippy-placement="top">
                                            <i class="icon-brand-google-plus-g"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="LinkedIn" data-tippy-placement="top">
                                            <i class="icon-brand-linkedin-in"></i>
                                        </a>
                                    </li>
                                </ul> */}
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div class="dashboard-container">
                    <div class="dashboard-sidebar">
                        <div class="dashboard-sidebar-inner" data-simplebar>
                            <div class="dashboard-nav-container">
                                <div className="hide-mobile-please">
                                    <a href="#" class="dashboard-responsive-nav-trigger blue-btn">
                                        <span class="hamburger hamburger--collapse" >
                                            <span class="hamburger-box">
                                                <span class="hamburger-inner"></span>
                                            </span>
                                        </span>
                                        <span class="trigger-title">Dashboard Navigation</span>
                                    </a>
                                    <div class="dashboard-nav">
                                        <div class="dashboard-nav-inner">

                                            <Skeleton height={75} width={"100%"} />
                                            <hr />
                                            <Skeleton height={75} width={"100%"} />
                                            <hr />
                                            <Skeleton height={75} width={"100%"} />
                                            <hr />
                                            <Skeleton height={75} width={"100%"} />
                                            <hr />
                                            <Skeleton height={75} width={"100%"} />
                                            <hr />
                                            <Skeleton height={75} width={"100%"} />
                                            <hr />
                                            <Skeleton height={75} width={"100%"} />
                                            <hr />
                                            <Skeleton height={75} width={"100%"} />
                                            <hr />
                                            <Skeleton height={75} width={"100%"} />
                                            <hr />
                                            <Skeleton height={75} width={"100%"} />
                                            <hr />
                                            <Skeleton height={75} width={"100%"} />
                                            <hr />
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="dashboard-sidebar reactstrap-navbar">
                                    <div class="dashboard-sidebar-inner" data-simplebar>
                                        <div class="dashboard-nav-container" style={{ width: "100%" }}>
                                            <Navbar color="light" light expand="md">
                                            <NavbarToggler onClick={this.toggle} >
                                                <a href="#" class="dashboard-responsive-nav-trigger blue-btn">
                                                    <span class="hamburger hamburger--collapse" >
                                                        <span class="hamburger-box">
                                                            <span class="hamburger-inner"></span>
                                                        </span>
                                                    </span>
                                                    <span class="trigger-title">Dashboard Navigation</span>
                                                </a>
                                            </NavbarToggler>
                                            <Collapse isOpen={this.state.isOpen} navbar>
                                            <Nav className="mr-auto" navbar>
                                                <NavItem>
                                                <NavLink href="/components/">Components</NavLink>
                                                </NavItem>
                                                <NavItem>
                                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                                                </NavItem>
                                                <UncontrolledDropdown nav inNavbar>
                                                <DropdownToggle nav caret>
                                                    Options
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem>
                                                    Option 1
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                    Option 2
                                                    </DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem>
                                                    Reset
                                                    </DropdownItem>
                                                </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </Nav>
                                            <NavbarText>Simple Text</NavbarText>
                                            </Collapse>
                                        </Navbar>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dashboard-content-container" data-simplebar>
                        <div class="dashboard-content-inner" >
                            <div class="dashboard-headline">
                                <h3>Settings</h3>
                                <nav id="breadcrumbs" class="dark">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">Dashboard</a></li>
                                        <li>Settings</li>
                                    </ul>
                                </nav>
                            </div>


                            <div class="row">

                                
                                <div class="col-xl-12">
                                    <div class="dashboard-box margin-top-0">

                                    
                                        <Skeleton height={350} width={"100%"} />
                                    </div>
                                </div>

                                <div class="col-xl-12">
                                    <div class="dashboard-box">

                                    <Skeleton height={225} width={"100%"} />
                                    <hr />
                                    <Skeleton height={225} width={"100%"} /> 
                                    <hr />
                                    <Skeleton height={225} width={"100%"} />
                                        
                                    </div>
                                </div>

                    
                                <div class="col-xl-12">
                                    <div id="test1" class="dashboard-box">

                                        
                                        <Skeleton height={225} width={"100%"} />

                                    </div>
                                </div>
                                
                            
                                {/* <div class="col-xl-12">
                                    <a href="#" class="button ripple-effect big margin-top-30">Save Changes</a>
                                </div> */}

                            </div>
                    

                    
                            <div class="dashboard-footer-spacer"></div>
                            <div class="small-footer margin-top-15">
                                
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
    getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    callback = (result) => {
        console.log("Callback RESULT... :", result);

        if (result.includes("data:image/png;base64,")) {
            this.setState({
                file: result.split("data:image/png;base64,")[1],
                normalFile: result
            })
        } else if (result.includes("data:image/jpeg;base64,")) {
            this.setState({
                file: result.split("data:image/jpeg;base64,")[1],
                normalFile: result
            })
        }
    }
    render() {
        const { user } = this.state;
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                {this.renderConditional()}
                <SlidingPane
                    className="sliding-pane"
                    overlayClassName="sliding-pane-overlay"
                    isOpen={this.state.isPaneOpen}
                    title="Welcome to your image upload wizard... Here you will be able to change your profile picture"
                    subtitle="Hotels see this photo as it helps them identify each visitor booked through our platform..."
                    onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                     this.setState({ isPaneOpen: false });
                    }}
                >
                    <div class="container py-5">


                    <header class="text-white text-center">
                                <h1 class="display-4 text-dark">Profile Picture - Image Upload</h1>
                                <p class="lead mb-0 text-dark">Upload a clear "head-shot" of yourself - We will send this to the different hotels so they can identify you easier...</p>
                                <p class="mb-5 font-weight-light text-dark">
                                    <a href="https://bootstrapious.com" class="text-white">
                                        <u className="text-dark">[Company Name Here...]</u>
                                    </a>
                                </p>
                            
                            </header>


                    <div class="row py-4">
                        <div class="col-lg-6 mx-auto">
                            <div class="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                                <input id="upload" type="file" onChange={(e) => {
                                    this.setState({
                                        file: e.target.files[0]
                                    }, () => {
                                        this.getBase64(this.state.file, this.callback);
                                    })
                                }} class="form-control border-0" />
                                <label id="upload-label" for="upload" class="font-weight-light text-muted">Choose file</label>
                                <div class="input-group-append">
                                    <label for="upload" class="btn btn-light m-0 rounded-pill px-4"> <i class="fa fa-cloud-upload mr-2 text-muted"></i><small class="text-uppercase font-weight-bold text-muted">Choose file</small></label>
                                </div>
                            </div>
                            {this.state.normalFile === null ? <p class="font-italic text-white text-center text-dark" style={{ marginBottom: "50px" }}>The image uploaded will be rendered inside the box below.</p> : null}
                            <div class="image-area mt-4">{this.state.normalFile !== null ? <img src={this.state.normalFile} id="selected-photo" /> : null}</div>
                            {/* <Loading type={"spinningBubbles"} color={"black"} /> */}
                            <button onClick={() => {
                                this.uploadNewProfilePic();
                            }} className="btn blue-btn" style={{ width: "100%", marginTop: "50px", color: "white" }}>Upload New Profile Picture</button>
                        </div>
                            </div>
                    </div>
                </SlidingPane>
                {this.renderLoadingOverlay()}
            </div>
        )
    }
}
const mapStateToProps = state => {
    for (const key in state.auth) {
        const obj = state.auth;
        if (obj.authenticated.hasOwnProperty("email")) {
            return {
                username: state.auth.authenticated.username,
                email: state.auth.authenticated.email
            }
        }
    }
}
export default withRouter(connect(mapStateToProps, { authentication })(SettingsHelper));