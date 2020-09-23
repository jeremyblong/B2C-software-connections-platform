import React, { Component } from 'react';
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
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "./style.css";
import { connect } from "react-redux";
import axios from "axios";

class ManageJobsApplicationsHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        isOpen: false,
        user: null,
        jobs: []
    }
}
    componentDidMount() {
        axios.post("/gather/specific/user/username", {
            username: this.props.username
        }).then((res) => {
            if (res.data.message === "Found Specific User!") {
                console.log(res.data);

                if (res.data.user.businessData) {
                    this.setState({
                        user: res.data.user,
                        jobs: res.data.user.businessData.job_postings
                    })
                } else {
                    this.setState({
                        user: res.data.user
                    })
                }
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        console.log("manage.js page state :", this.state);

        const options = [
            { value: "/dashboard/manage/applications", label: "Manage Jobs" },
            { value: "/dashboard/manage/applications", label: "Manage Candidates" },
            { value: "/dashboard/manage/applications", label: "Post A Job" },
            { value: "/dashboard/manage/applications", label: "Analytics" }
        ];

        const defaultOption = options[0];
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                <div class="dashboard-container">
                <div class="dashboard-sidebar">
                        <div class="dashboard-sidebar-inner" data-simplebar>
                            <div class="dashboard-nav-container">
                                <div className="hide-mobile-please">
                                    <a class="dashboard-responsive-nav-trigger blue-btn">
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
                                            </ul>
                                            {/* /dashboard/manage/applications */}
                                            <ul data-submenu-title="Organize and Manage">
                                                <li>
                                                    <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />;
                                                </li>
                                                <li><a><i class="icon-material-outline-assignment"></i> Tasks</a>
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
                                                <a class="dashboard-responsive-nav-trigger blue-btn">
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
                            <h3>Manage Jobs</h3>

                            <nav id="breadcrumbs" class="dark">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/dashboard">Dashboard/Home</Link></li>
                                    <li>Manage Jobs</li>
                                </ul>
                            </nav>
                        </div>

           
                        <div class="row">

                            <div class="col-xl-12">
                                <div class="dashboard-box margin-top-0">

                               
                                    <div class="headline">
                                        <h3><i class="icon-material-outline-business-center"></i> My Job Listings/Postings</h3>
                                    </div>

                                    <div class="content">
                                        <ul class="dashboard-box-list">
                                            {this.state.jobs.length !== 0 ? this.state.jobs.map((job, index) => {
                                                console.log("jobbbbbb :", job);
                                                return (
                                                    <Link to={`/dashboard/manage/applications/individual/${job.id}`}>
                                                
                                                        <div class="job-listing job-listing-custom">

                                                            <div class="job-listing-details">

                                                                    <a class="job-listing-company-logo">
                                                                    <img style={{ marginLeft: "10px" }} src="/images/company-logo-05.png" alt=""/>
                                                                </a> 

                                                            
                                                                <div class="job-listing-description">
                                                                    <h3 class="job-listing-title my-title text-left"><a>{job.title}</a> <span class="dashboard-status-button green">Pending Decision</span></h3>

                                                                    
                                                                    <div class="job-listing-footer text-left">
                                                                        <ul>
                                                                            <li className="text-left"><i class="icon-material-outline-date-range"></i> Posted on {job.date}</li>
                                                                            <li className="text-left"><i class="icon-material-outline-date-range"></i> <strong style={{ color: "blue" }}>7 Days Past</strong> {job.date}</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="buttons-to-left float-left always-visible">
                                                            <a style={{ marginRight: "10px" }} href="dashboard-manage-candidates.html" class="button blue-btn ripple-effect"><i class="icon-material-outline-supervisor-account"></i> Manage Candidates <span class="button-info hover-change">{job.responses ? job.responses.length : "0"}</span></a>
                                                            <a style={{ marginRight: "10px" }} class="button gray ripple-effect ico" title="Edit" data-tippy-placement="top"><i class="icon-feather-edit"></i></a>
                                                            <a class="button gray ripple-effect ico" title="Remove" data-tippy-placement="top"><i class="icon-feather-trash-2"></i></a>
                                                        </div>
                                                    </Link>
                                                );
                                            }) : null}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    

                        <div class="dashboard-footer-spacer"></div>
                        <div class="small-footer margin-top-15">
                            <div class="small-footer-copyrights">
                                © 2019 <strong>Hireo</strong>. All Rights Reserved.
                            </div>
                            <ul class="footer-social-links">
                                <li>
                                    <a title="Facebook" data-tippy-placement="top">
                                        <i class="icon-brand-facebook-f"></i>
                                    </a>
                                </li>
                                <li>
                                    <a title="Twitter" data-tippy-placement="top">
                                        <i class="icon-brand-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a title="Google Plus" data-tippy-placement="top">
                                        <i class="icon-brand-google-plus-g"></i>
                                    </a>
                                </li>
                                <li>
                                    <a title="LinkedIn" data-tippy-placement="top">
                                        <i class="icon-brand-linkedin-in"></i>
                                    </a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                    

                    </div>
                </div>
              

                </div>
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
export default withRouter(connect(mapStateToProps, {  })(ManageJobsApplicationsHelper));
