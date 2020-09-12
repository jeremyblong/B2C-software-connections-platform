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
import "./style.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authentication } from "../../../../actions/auth/auth.js";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const Chart = require("chart.js");



class DashboardHomeHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        isOpen: false,
        user: null
    }
}
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
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
                    }, () => {
                        const node = this.node;
    
                        const myChart = new Chart(node, {
                            type: "bar",
                            data: {
                                labels: ["Red", "Blue", "Yellow"],
                                datasets: [
                                {
                                    label: "# of Likes",
                                    data: [12, 19, 3],
                                    backgroundColor: [
                                    "rgba(255, 99, 132, 0.2)",
                                    "rgba(54, 162, 235, 0.2)",
                                    "rgba(255, 206, 86, 0.2)"
                                    ]
                                }
                                ]
                            }
                        });
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
    renderConditional = () => {
        const { user } = this.state;

        if (user !== null && user !== "Could NOT locate user...") {
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
                                                <li class="active"><a href={null}><i class="icon-material-outline-dashboard"></i> Dashboard</a></li>
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
                                <h3 className="text-left">Howdy, {user !== null ? user.username : "-----"}!</h3>
                                <span className="text-left">We are glad to see you again, {user.firstName ? user.firstName : "----"} {user.lastName ? user.lastName : "----" }!</span>

                                <nav id="breadcrumbs" class="dark">
                                    <ul>
                                        <li><Link to="/">Home</Link></li>
                                        <li>Dashboard</li>
                                    </ul>
                                </nav>
                            </div>

                            <div class="fun-facts-container">
                                <div class="fun-fact" data-fun-fact-color="#36bd78">
                                    <div class="fun-fact-text">
                                        <span>Task Bids Won</span>
                                        <h4>22</h4>
                                    </div>
                                    <div class="fun-fact-icon"><i class="icon-material-outline-gavel"></i></div>
                                </div>
                                <div class="fun-fact" data-fun-fact-color="#b81b7f">
                                    <div class="fun-fact-text">
                                        <span>Jobs Applied</span>
                                        <h4>4</h4>
                                    </div>
                                    <div class="fun-fact-icon"><i class="icon-material-outline-business-center"></i></div>
                                </div>
                                <div class="fun-fact" data-fun-fact-color="#efa80f">
                                    <div class="fun-fact-text">
                                        <span>Reviews</span>
                                        <h4>28</h4>
                                    </div>
                                    <div class="fun-fact-icon"><i class="icon-material-outline-rate-review"></i></div>
                                </div>

                                <div class="fun-fact" data-fun-fact-color="#2a41e6">
                                    <div class="fun-fact-text">
                                        <span>This Month Views</span>
                                        <h4>987</h4>
                                    </div>
                                    <div class="fun-fact-icon"><i class="icon-feather-trending-up"></i></div>
                                </div>
                            </div>
                            <div class="row">

                                <div class="col-xl-8">
                                    <div class="dashboard-box main-box-in-row">
                                        <div class="headline">
                                            <h3><i class="icon-feather-bar-chart-2"></i> Your Profile Views</h3>
                                            <div class="sort-by">
                                                <select class="selectpicker hide-tick">
                                                    <option>Last 6 Months</option>
                                                    <option>This Year</option>
                                                    <option>This Month</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="content">
                                        <canvas
                                            style={{ width: 800, height: 500 }}
                                            ref={node => (this.node = node)}
                                        />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4">
                                    <div class="dashboard-box child-box-in-row"> 
                                        <div class="headline">
                                            <h3><i class="icon-material-outline-note-add"></i> Notes</h3>
                                        </div>	

                                        <div class="content with-padding">
                                            <div class="dashboard-note">
                                                <p>Meeting with candidate at 3pm who applied for Bilingual Event Support Specialist</p>
                                                <div class="note-footer">
                                                    <span class="note-priority high">High Priority</span>
                                                    <div class="note-buttons">
                                                        <a href="#" title="Edit" data-tippy-placement="top"><i class="icon-feather-edit"></i></a>
                                                        <a href="#" title="Remove" data-tippy-placement="top"><i class="icon-feather-trash-2"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="dashboard-note">
                                                <p>Extend premium plan for next month</p>
                                                <div class="note-footer">
                                                    <span class="note-priority low">Low Priority</span>
                                                    <div class="note-buttons">
                                                        <a href="#" title="Edit" data-tippy-placement="top"><i class="icon-feather-edit"></i></a>
                                                        <a href="#" title="Remove" data-tippy-placement="top"><i class="icon-feather-trash-2"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="dashboard-note">
                                                <p>Send payment to David Peterson</p>
                                                <div class="note-footer">
                                                    <span class="note-priority medium">Medium Priority</span>
                                                    <div class="note-buttons">
                                                        <a href="#" title="Edit" data-tippy-placement="top"><i class="icon-feather-edit"></i></a>
                                                        <a href="#" title="Remove" data-tippy-placement="top"><i class="icon-feather-trash-2"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            <div class="add-note-button">
                                                <a href="#small-dialog" class="popup-with-zoom-anim button full-width button-sliding-icon">Add Note <i class="icon-material-outline-arrow-right-alt"></i></a>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-6">
                                    <div class="dashboard-box">
                                        <div class="headline">
                                            <h3><i class="icon-material-baseline-notifications-none"></i> Notifications</h3>
                                            <button class="mark-as-read ripple-effect-dark" data-tippy-placement="left" title="Mark all as read">
                                                    <i class="icon-feather-check-square"></i>
                                            </button>
                                        </div>
                                        <div class="content">
                                            <ul class="dashboard-box-list">
                                                <li>
                                                    <span class="notification-icon"><i class="icon-material-outline-group"></i></span>
                                                    <span class="notification-text">
                                                        <strong>Michael Shannah</strong> applied for a job <a href="#">Full Stack Software Engineer</a>
                                                    </span>
                                                    <div class="buttons-to-right">
                                                        <a href="#" class="button ripple-effect ico" title="Mark as read" data-tippy-placement="left"><i class="icon-feather-check-square"></i></a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <span class="notification-icon"><i class=" icon-material-outline-gavel"></i></span>
                                                    <span class="notification-text">
                                                        <strong>Gilber Allanis</strong> placed a bid on your <a href="#">iOS App Development</a> project
                                                    </span>
                                                    <div class="buttons-to-right">
                                                        <a href="#" class="button ripple-effect ico" title="Mark as read" data-tippy-placement="left"><i class="icon-feather-check-square"></i></a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <span class="notification-icon"><i class="icon-material-outline-autorenew"></i></span>
                                                    <span class="notification-text">
                                                        Your job listing <a href="#">Full Stack Software Engineer</a> is expiring
                                                    </span>
                                                    <div class="buttons-to-right">
                                                        <a href="#" class="button ripple-effect ico" title="Mark as read" data-tippy-placement="left"><i class="icon-feather-check-square"></i></a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <span class="notification-icon"><i class="icon-material-outline-group"></i></span>
                                                    <span class="notification-text">
                                                        <strong>Sindy Forrest</strong> applied for a job <a href="#">Full Stack Software Engineer</a>
                                                    </span>
                                                    <div class="buttons-to-right">
                                                        <a href="#" class="button ripple-effect ico" title="Mark as read" data-tippy-placement="left"><i class="icon-feather-check-square"></i></a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <span class="notification-icon"><i class="icon-material-outline-rate-review"></i></span>
                                                    <span class="notification-text">
                                                        <strong>David Peterson</strong> left you a <span class="star-rating no-stars" data-rating="5.0"></span> rating after finishing <a href="#">Logo Design</a> task
                                                    </span>
                                                    <div class="buttons-to-right">
                                                        <a href="#" class="button ripple-effect ico" title="Mark as read" data-tippy-placement="left"><i class="icon-feather-check-square"></i></a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="dashboard-box">
                                        <div class="headline">
                                            <h3><i class="icon-material-outline-assignment"></i> Orders</h3>
                                        </div>
                                        <div class="content">
                                            <ul class="dashboard-box-list">
                                                <li>
                                                    <div class="invoice-list-item">
                                                    <strong>Professional Plan</strong>
                                                        <ul>
                                                            <li><span class="unpaid">Unpaid</span></li>
                                                            <li>Order: #326</li>
                                                            <li>Date: 12/08/2019</li>
                                                        </ul>
                                                    </div>
                                                    <div class="buttons-to-right">
                                                        <a href="pages-checkout-page.html" class="button">Finish Payment</a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="invoice-list-item">
                                                    <strong>Professional Plan</strong>
                                                        <ul>
                                                            <li><span class="paid">Paid</span></li>
                                                            <li>Order: #264</li>
                                                            <li>Date: 10/07/2019</li>
                                                        </ul>
                                                    </div>
                                                    <div class="buttons-to-right">
                                                        <a href="pages-invoice-template.html" class="button gray">View Invoice</a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="invoice-list-item">
                                                    <strong>Professional Plan</strong>
                                                        <ul>
                                                            <li><span class="paid">Paid</span></li>
                                                            <li>Order: #211</li>
                                                            <li>Date: 12/06/2019</li>
                                                        </ul>
                                                    </div>
                                                    <div class="buttons-to-right">
                                                        <a href="pages-invoice-template.html" class="button gray">View Invoice</a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="invoice-list-item">
                                                    <strong>Professional Plan</strong>
                                                        <ul>
                                                            <li><span class="paid">Paid</span></li>
                                                            <li>Order: #179</li>
                                                            <li>Date: 06/05/2019</li>
                                                        </ul>
                                                    </div>
                                                    <div class="buttons-to-right">
                                                        <a href="pages-invoice-template.html" class="button gray">View Invoice</a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="dashboard-footer-spacer"></div>
                            <div class="small-footer margin-top-15">
                                <div class="small-footer-copyrights">
                                    © 2019 <strong>[Company Name!]</strong>. All Rights Reserved.
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

                                        <Skeleton height={60} width={"100%"} />
                                        <hr />
                                        <Skeleton height={60} width={"100%"} />
                                        <hr />
                                        <Skeleton height={60} width={"100%"} />
                                        <hr />
                                        <Skeleton height={60} width={"100%"} />
                                        <hr />
                                        <Skeleton height={60} width={"100%"} />
                                        <hr />
                                        <Skeleton height={60} width={"100%"} />
                                        <hr />
                                        <Skeleton height={60} width={"100%"} />
                                        <hr />
                                        <Skeleton height={60} width={"100%"} />
                                        <hr />

                                        <Skeleton height={60} width={"100%"} />
                                        <hr />
                                        <Skeleton height={60} width={"100%"} />
                                        <hr />
                                        <Skeleton height={60} width={"100%"} />
                                        <hr />
                                        <Skeleton height={60} width={"100%"} />
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
                            <Skeleton height={100} width={"70%"} />

                            <nav id="breadcrumbs" class="dark">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li>Dashboard</li>
                                </ul>
                            </nav>
                        </div>

                        <div class="fun-facts-container">
                            <div class="fun-fact" data-fun-fact-color="#36bd78">
                                <div class="fun-fact-text">
                                    <Skeleton height={150} width={"100%"} />
                                </div>
                                <div class="fun-fact-icon"><i class="icon-material-outline-gavel"></i></div>
                            </div>
                            <div class="fun-fact" data-fun-fact-color="#b81b7f">
                                <div class="fun-fact-text">
                                    <Skeleton height={150} width={"100%"} />
                                </div>
                                <div class="fun-fact-icon"><i class="icon-material-outline-business-center"></i></div>
                            </div>
                            <div class="fun-fact" data-fun-fact-color="#efa80f">
                                <div class="fun-fact-text">
                                    <Skeleton height={150} width={"100%"} />
                                </div>
                                <div class="fun-fact-icon"><i class="icon-material-outline-rate-review"></i></div>
                            </div>

                            <div class="fun-fact" data-fun-fact-color="#2a41e6">
                                <div class="fun-fact-text">
                                    <Skeleton height={150} width={"100%"} />
                                </div>
                                <div class="fun-fact-icon"><i class="icon-feather-trending-up"></i></div>
                            </div>
                        </div>
                        <div class="row">

                            <div class="col-xl-8">
                                <div class="dashboard-box main-box-in-row">
                                    <div class="headline">
                                        <h3><i class="icon-feather-bar-chart-2"></i> Your Profile Views</h3>
                                        <div class="sort-by">
                                            <select class="selectpicker hide-tick">
                                                <option>Last 6 Months</option>
                                                <option>This Year</option>
                                                <option>This Month</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <Skeleton height={500} width={"100%"} />
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4">
                                <div class="dashboard-box child-box-in-row"> 
                                    <div class="headline">
                                        <h3><i class="icon-material-outline-note-add"></i> Notes</h3>
                                    </div>	

                                    <div class="content with-padding">
                                        <div class="dashboard-note">
                                            <Skeleton height={200} width={"100%"} />
                                        </div>
                                        <div class="dashboard-note">
                                            <Skeleton height={200} width={"100%"} />
                                        </div>
                                        <div class="dashboard-note">
                                            <Skeleton height={200} width={"100%"} />
                                        </div>
                                    </div>
                                        <div class="add-note-button">
                                            <a href="#small-dialog" class="popup-with-zoom-anim button full-width button-sliding-icon">Add Note <i class="icon-material-outline-arrow-right-alt"></i></a>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-6">
                                <div class="dashboard-box">
                                    <div class="headline">
                                        <h3><i class="icon-material-baseline-notifications-none"></i> Notifications</h3>
                                        <button class="mark-as-read ripple-effect-dark" data-tippy-placement="left" title="Mark all as read">
                                                <i class="icon-feather-check-square"></i>
                                        </button>
                                    </div>
                                    <div class="content">
                                        <ul class="dashboard-box-list">
                                            <li>
                                                <span class="notification-icon"><i class="icon-material-outline-group"></i></span>
                                                <span class="notification-text">
                                                    <Skeleton height={75} width={"100%"} />
                                                </span>
                                                <div class="buttons-to-right">
                                                    <a href="#" class="button ripple-effect ico" title="Mark as read" data-tippy-placement="left"><i class="icon-feather-check-square"></i></a>
                                                </div>
                                            </li>
                                            <li>
                                                <span class="notification-icon"><i class=" icon-material-outline-gavel"></i></span>
                                                <span class="notification-text">
                                                    <Skeleton height={75} width={"100%"} />
                                                </span>
                                                <div class="buttons-to-right">
                                                    <a href="#" class="button ripple-effect ico" title="Mark as read" data-tippy-placement="left"><i class="icon-feather-check-square"></i></a>
                                                </div>
                                            </li>
                                            <li>
                                                <span class="notification-icon"><i class="icon-material-outline-autorenew"></i></span>
                                                <span class="notification-text">
                                                    <Skeleton height={75} width={"100%"} />
                                                </span>
                                                <div class="buttons-to-right">
                                                    <a href="#" class="button ripple-effect ico" title="Mark as read" data-tippy-placement="left"><i class="icon-feather-check-square"></i></a>
                                                </div>
                                            </li>
                                            <li>
                                                <span class="notification-icon"><i class="icon-material-outline-group"></i></span>
                                                <span class="notification-text">
                                                    <Skeleton height={75} width={"100%"} />
                                                </span>
                                                <div class="buttons-to-right">
                                                    <a href="#" class="button ripple-effect ico" title="Mark as read" data-tippy-placement="left"><i class="icon-feather-check-square"></i></a>
                                                </div>
                                            </li>
                                            <li>
                                                <span class="notification-icon"><i class="icon-material-outline-rate-review"></i></span>
                                                <span class="notification-text">
                                                    <Skeleton height={75} width={"100%"} />
                                                </span>
                                                <div class="buttons-to-right">
                                                    <a href="#" class="button ripple-effect ico" title="Mark as read" data-tippy-placement="left"><i class="icon-feather-check-square"></i></a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-6">
                                <div class="dashboard-box">
                                    <div class="headline">
                                        <h3><i class="icon-material-outline-assignment"></i> Orders</h3>
                                    </div>
                                    <div class="content">
                                        <Skeleton height={400} width={"100%"} />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="dashboard-footer-spacer"></div>
                        <div class="small-footer margin-top-15">
                            <div class="small-footer-copyrights">
                                © 2019 <strong>[Company Name!]</strong>. All Rights Reserved.
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
    render() {
        const { user } = this.state;
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                {this.renderConditional()}        
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
export default withRouter(connect(mapStateToProps, { authentication })(DashboardHomeHelper));