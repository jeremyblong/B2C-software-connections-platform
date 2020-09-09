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
        loading: false
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
                            alert("Uploaded new profile picture successfully!")
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
    componentDidMount() {

        setTimeout(() => {
            axios.post("/gather/specific/user/username", {
                username: this.props.username
            }).then((res) => {
                if (res.data.message === "Found Specific User!") {
                    console.log("Found user... :", res.data);

                    this.setState({
                        user: res.data.user
                    })
                } else if (res.data.message === "Could NOT find any user by that username") {
                    console.log("Did NOT find user... :", res.data);
                    this.setState({
                        user: "Could NOT locate user..."
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
    renderConditional = () => {
        const { user } = this.state;

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
                                                <li class="active"><Link to="/dashboard"><i class="icon-material-outline-dashboard"></i> Dashboard</Link></li>
                                                <li><Link to="/dashboard/messages"><i class="icon-material-outline-question-answer"></i> Messages <span class="nav-tag">2</span></Link></li>
                                                <li><a href="dashboard-bookmarks.html"><i class="icon-material-outline-star-border"></i> Bookmarks</a></li>
                                                <li><a href="dashboard-reviews.html"><i class="icon-material-outline-rate-review"></i> Reviews</a></li>
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
                                                <li><Link to="/dashboard/settings/main"><i class="icon-material-outline-settings"></i> Settings</Link></li>
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
                                                                        <input type="radio" name="account-type-radio" id="freelancer-radio" class="account-type-radio" checked={false}/>
                                                                        <label for="freelancer-radio" class="ripple-effect-dark"><i class="icon-material-outline-account-circle"></i> Freelancer</label>
                                                                    </div>

                                                                    <div>
                                                                        <input type="radio" name="account-type-radio" id="employer-radio" class="account-type-radio" checked={false}/>
                                                                        <label for="employer-radio" class="ripple-effect-dark"><i class="icon-material-outline-business-center"></i> Employer</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="col-xl-6">
                                                            <div class="submit-field">
                                                                <h5>Email</h5>
                                                                <input onChange={(e) => {
                                                                    this.setState({
                                                                        email: e.target.value
                                                                    })
                                                                }} value={this.state.email} type="text" class="with-border" placeholder="tom@example.com"/>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                
                                            </div>
                                            {this.state.firstName.length > 0 || this.state.lastName.length > 0 || this.state.email.length > 0 || this.state.accountType !== null ? <div className="row">
                                                <button className="btn blue-btn" style={{ width: "100%", color: "white" }}>Submit Changes</button>
                                            </div> : null}
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-12">
                                    <div class="dashboard-box">

                                    
                                        <div class="headline">
                                            <h3><i class="icon-material-outline-face"></i> My Profile</h3>
                                        </div>

                                        <div class="content">
                                            <ul class="fields-ul">
                                            <li>
                                                <div class="row">
                                                    <div class="col-xl-4">
                                                        <div class="submit-field">
                                                            <div class="bidding-widget">
                                                                
                                                                <span class="bidding-detail">Set your <strong>minimal hourly rate</strong></span>

                                                            
                                                                <div class="bidding-value margin-bottom-10">$<span id="biddingVal"></span></div>
                                                                <input class="bidding-slider" type="text" value="" data-slider-handle="custom" data-slider-currency="$" data-slider-min="5" data-slider-max="150" data-slider-value="35" data-slider-step="1" data-slider-tooltip="hide" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-xl-4">
                                                        <div class="submit-field">
                                                            <h5>Skills <i class="help-icon" data-tippy-placement="right" title="Add up to 10 skills"></i></h5>

                                                            <div class="keywords-container">
                                                                <div class="keyword-input-container">
                                                                    <input type="text" class="keyword-input with-border" placeholder="e.g. Angular, Laravel"/>
                                                                    <button class="keyword-input-button ripple-effect"><i class="icon-material-outline-add"></i></button>
                                                                </div>
                                                                <div class="keywords-list">
                                                                    <span class="keyword"><span class="keyword-remove"></span><span class="keyword-text">Angular</span></span>
                                                                    <span class="keyword"><span class="keyword-remove"></span><span class="keyword-text">Vue JS</span></span>
                                                                    <span class="keyword"><span class="keyword-remove"></span><span class="keyword-text">iOS</span></span>
                                                                    <span class="keyword"><span class="keyword-remove"></span><span class="keyword-text">Android</span></span>
                                                                    <span class="keyword"><span class="keyword-remove"></span><span class="keyword-text">Laravel</span></span>
                                                                </div>
                                                                <div class="clearfix"></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-xl-4">
                                                        <div class="submit-field">
                                                            <h5>Attachments</h5>
                                                            
                                                    
                                                            <div class="attachments-container margin-top-0 margin-bottom-0">
                                                                <div class="attachment-box ripple-effect">
                                                                    <span>Cover Letter</span>
                                                                    <i>PDF</i>
                                                                    <button class="remove-attachment" data-tippy-placement="top" title="Remove"></button>
                                                                </div>
                                                                <div class="attachment-box ripple-effect">
                                                                    <span>Contract</span>
                                                                    <i>DOCX</i>
                                                                    <button class="remove-attachment" data-tippy-placement="top" title="Remove"></button>
                                                                </div>
                                                            </div>
                                                            <div class="clearfix"></div>
                                                            
                                                
                                                            <div class="uploadButton margin-top-0">
                                                                <input class="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload" multiple/>
                                                                <label class="uploadButton-button ripple-effect" for="upload">Upload Files</label>
                                                                <span class="uploadButton-file-name">Maximum file size: 10 MB</span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="row">
                                                    <div class="col-xl-6">
                                                        <div class="submit-field">
                                                            <h5>Tagline</h5>
                                                            <input type="text" class="with-border" value="iOS Expert + Node Dev"/>
                                                        </div>
                                                    </div>

                                                    <div class="col-xl-6">
                                                        <div class="submit-field">
                                                            <h5>Nationality</h5>
                                                            <select class="selectpicker with-border" data-size="7" title="Select Job Type" data-live-search="true">
                                                                <option value="AR">Argentina</option>
                                                                <option value="AM">Armenia</option>
                                                                <option value="AW">Aruba</option>
                                                                <option value="AU">Australia</option>
                                                                <option value="AT">Austria</option>
                                                                <option value="AZ">Azerbaijan</option>
                                                                <option value="BS">Bahamas</option>
                                                                <option value="BH">Bahrain</option>
                                                                <option value="BD">Bangladesh</option>
                                                                <option value="BB">Barbados</option>
                                                                <option value="BY">Belarus</option>
                                                                <option value="BE">Belgium</option>
                                                                <option value="BZ">Belize</option>
                                                                <option value="BJ">Benin</option>
                                                                <option value="BM">Bermuda</option>
                                                                <option value="BT">Bhutan</option>
                                                                <option value="BG">Bulgaria</option>
                                                                <option value="BF">Burkina Faso</option>
                                                                <option value="BI">Burundi</option>
                                                                <option value="KH">Cambodia</option>
                                                                <option value="CM">Cameroon</option>
                                                                <option value="CA">Canada</option>
                                                                <option value="CV">Cape Verde</option>
                                                                <option value="KY">Cayman Islands</option>
                                                                <option value="CO">Colombia</option>
                                                                <option value="KM">Comoros</option>
                                                                <option value="CG">Congo</option>
                                                                <option value="CK">Cook Islands</option>
                                                                <option value="CR">Costa Rica</option>
                                                                <option value="CI">Côte d'Ivoire</option>
                                                                <option value="HR">Croatia</option>
                                                                <option value="CU">Cuba</option>
                                                                <option value="CW">Curaçao</option>
                                                                <option value="CY">Cyprus</option>
                                                                <option value="CZ">Czech Republic</option>
                                                                <option value="DK">Denmark</option>
                                                                <option value="DJ">Djibouti</option>
                                                                <option value="DM">Dominica</option>
                                                                <option value="DO">Dominican Republic</option>
                                                                <option value="EC">Ecuador</option>
                                                                <option value="EG">Egypt</option>
                                                                <option value="GP">Guadeloupe</option>
                                                                <option value="GU">Guam</option>
                                                                <option value="GT">Guatemala</option>
                                                                <option value="GG">Guernsey</option>
                                                                <option value="GN">Guinea</option>
                                                                <option value="GW">Guinea-Bissau</option>
                                                                <option value="GY">Guyana</option>
                                                                <option value="HT">Haiti</option>
                                                                <option value="HN">Honduras</option>
                                                                <option value="HK">Hong Kong</option>
                                                                <option value="HU">Hungary</option>
                                                                <option value="IS">Iceland</option>
                                                                <option value="IN">India</option>
                                                                <option value="ID">Indonesia</option>
                                                                <option value="NO">Norway</option>
                                                                <option value="OM">Oman</option>
                                                                <option value="PK">Pakistan</option>
                                                                <option value="PW">Palau</option>
                                                                <option value="PA">Panama</option>
                                                                <option value="PG">Papua New Guinea</option>
                                                                <option value="PY">Paraguay</option>
                                                                <option value="PE">Peru</option>
                                                                <option value="PH">Philippines</option>
                                                                <option value="PN">Pitcairn</option>
                                                                <option value="PL">Poland</option>
                                                                <option value="PT">Portugal</option>
                                                                <option value="PR">Puerto Rico</option>
                                                                <option value="QA">Qatar</option>
                                                                <option value="RE">Réunion</option>
                                                                <option value="RO">Romania</option>
                                                                <option value="RU">Russian Federation</option>
                                                                <option value="RW">Rwanda</option>
                                                                <option value="SZ">Swaziland</option>
                                                                <option value="SE">Sweden</option>
                                                                <option value="CH">Switzerland</option>
                                                                <option value="TR">Turkey</option>
                                                                <option value="TM">Turkmenistan</option>
                                                                <option value="TV">Tuvalu</option>
                                                                <option value="UG">Uganda</option>
                                                                <option value="UA">Ukraine</option>
                                                                <option value="GB">United Kingdom</option>
                                                                <option value="US" selected>United States</option>
                                                                <option value="UY">Uruguay</option>
                                                                <option value="UZ">Uzbekistan</option>
                                                                <option value="YE">Yemen</option>
                                                                <option value="ZM">Zambia</option>
                                                                <option value="ZW">Zimbabwe</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-xl-12">
                                                        <div class="submit-field">
                                                            <h5>Introduce Yourself</h5>
                                                            <textarea cols="30" rows="5" class="with-border">Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</textarea>
                                                        </div>
                                                    </div>

                                                </div>
                                            </li>
                                        </ul>
                                        </div>
                                    </div>
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
                                <ul class="footer-social-links">
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
                                </ul>
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
                                
                            
                                <div class="col-xl-12">
                                    <a href="#" class="button ripple-effect big margin-top-30">Save Changes</a>
                                </div>

                            </div>
                    

                    
                            <div class="dashboard-footer-spacer"></div>
                            <div class="small-footer margin-top-15">
                                <div class="small-footer-copyrights">
                                    © 2019 <strong>[Comapny Name(s)]</strong>. All Rights Reserved.
                                </div>
                                <ul class="footer-social-links">
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
                                </ul>
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
            <div>
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
                username: state.auth.authenticated.username
            }
        }
    }
}
export default withRouter(connect(mapStateToProps, { authentication })(SettingsHelper));