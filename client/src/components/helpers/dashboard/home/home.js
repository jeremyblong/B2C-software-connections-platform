import React, { Component, Fragment } from 'react';
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
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { NotificationManager } from 'react-notifications';
import uuid from "react-uuid";
import moment from "moment";


const Chart = require("chart.js");



class DashboardHomeHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        isOpen: false,
        user: null,
        isPaneOpen: false,
        application: null,
        notePaneOpen: false,
        priority: "",
        note: "",
        notes: [],
        notePaneOpenEdit: false,
        selectedNote: null,
        newNote: "",
        newPriority: ""
    }
}
    onOpenModal = () => {
        this.setState({ notePaneOpen: true });
    };
    handleNoteSubmissionEdit = (e) => {
        e.preventDefault();

        console.log("edit submitted...");

        const { newPriority, newNote, selectedNote } = this.state;

        axios.post("/edit/note/dashboard/home/change", {
            username: this.props.username,
            newNote: newNote,
            newPriority: newPriority,
            selectedNote
        }).then((res) => {
            if (res.data.message === "Successfully posted a new note!") {
                console.log(res.data);

                this.setState({
                    notes: res.data.user.personal_notes,
                    notePaneOpenEdit: false,
                    newNote: "",
                    newPriority: ""
                })
            } else {
                console.log("potential err occurred... :", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    onCloseModal = () => {
        this.setState({ notePaneOpen: false });
    };
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
                        user: res.data.user,
                        notes: res.data.user.personal_notes
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
            });
        }, 500);
    }
    renderPortionOne = () => {
        const { user } = this.state;

        if (user.accountType === "freelancer") {
            return (
                <Fragment>
                    <div class="headline">
                        <h3><i class="icon-material-outline-assignment"></i> Current Pending/Accepted Applications - Submitted Applications</h3>
                    </div>
                        <div class="content">
                            <ul class="dashboard-box-list">
                                {user.submitted_applications ? user.submitted_applications.map((application, index) => {
                                    return (
                                        <li>
                                            <div class="invoice-list-item mx-auto">
                                            <strong>{application.title}</strong>
                                                <ul>
                                                    <li>{application.accepted === "DENIED/DECLINED" ? <span class="unpaid">DECLINED</span> :  <span class="paid">Pending</span>}</li> <br />
                                                    <li>Order: {application.id}</li> <br />
                                                    <li>Date: {application.date}</li>
                                                </ul>
                                            </div>
                                            <div class="buttons-to-right">
                                                <a class="button blue-btn" style={{ color: "white" }}>View Posting</a>
                                            </div>
                                        </li>
                                    );
                                }) : null}
                                {!user.submitted_applications ? <h3 className="text-center" style={{ marginTop: "40px" }}>You don't have any new notifications yet... Interact to get more traction!</h3> : null}
                        </ul>
                    </div>
                </Fragment>
            );
        } else if (user.accountType === "business") {
            return (
                <Fragment>
                    <div class="headline">
                        <h3><i class="icon-material-outline-assignment"></i> Recieved Applications - Job Posting </h3>
                    </div>
                        <div class="content">
                            <ul class="dashboard-box-list">
                                {user.received_applications ? user.received_applications.map((application, index) => {
                                    console.log("application", application);
                                    return (
                                        <li>
                                            <div class="invoice-list-item mx-auto">
                                            <strong>{application.title}</strong>
                                                <ul>
                                                    <li><span class="unpaid">Pending</span></li> <br />
                                                    <li>Order: {application.id}</li> <br />
                                                    <li>Date: {application.date}</li>
                                                </ul>
                                            </div>
                                            <div class="buttons-to-right">
                                                <button onClick={() => {
                                                    this.setState({
                                                        isPaneOpen: !this.state.isPaneOpen,
                                                        application
                                                    })
                                                }} class="button blue-btn" style={{ color: "white" }}>View More Information</button>
                                            </div>
                                        </li>
                                    );
                                }) : null}
                                
{/*                                 
                                
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
                                </li> */}
                        </ul>
                    </div>
                </Fragment>
            );
        }
    }
    renderCountOne = () => {
        const { user } = this.state;

        if (user.accountType === "freelancer") {
            return (
                <Fragment>
                    <div class="fun-fact" data-fun-fact-color="#b81b7f">
                        <div class="fun-fact-text">
                            <span>Jobs Applied</span>
                            <h4>{user.submitted_applications ? user.submitted_applications.length : 0}</h4>
                        </div>
                        <div class="fun-fact-icon fun-fact-two"><i class="icon-material-outline-business-center" style={{ color: "white" }}></i></div>
                    </div>
                </Fragment>
            );
        } else if (user.accountType === "business") {
            return (
                <Fragment>
                    <div class="fun-fact" data-fun-fact-color="#b81b7f">
                        <div class="fun-fact-text">
                            <span># Of Responses (Applications)</span>
                            <h4>{user.received_applications ? user.received_applications.length : 0}</h4>
                        </div>
                        <div class="fun-fact-icon fun-fact-two"><i class="icon-material-outline-business-center" style={{ color: "white" }}></i></div>
                    </div>
                </Fragment>
            );
        }
    }
    _onSelect = (value) => {
        console.log("selected", value);

        this.props.history.push(value.value);
    }
    priorityConversion = (note) => {
        switch (note.priority) {
            case "Low-Priority":
                return "Low Priority";
                break;
            case "Medium-Priority":
                return "Medium Priority";
                break;
            case "High-Priority":
                return "High Priority";
                break;
            default:
                break;
        }
    }
    notePriorityTag = (note) => {
        switch (note.priority) {
            case "Low-Priority":
                return "low";
                break;
            case "Medium-Priority":
                return "medium";
                break;
            case "High-Priority":
                return "high";
                break;
            default:
                break;
        }
    }
    editNote = (note) => {
        console.log("edit", note);
        
        this.setState({
            notePaneOpenEdit: !this.state.notePaneOpenEdit,
            selectedNote: note
        })
    }
    deleteNote = (note) => {
        console.log("delete", note);

        axios.put("/delete/note/dashboard", {
            username: this.props.username,
            note
        }).then((res) => {
            if (res.data.message === "Successfully deleted your selected note!") {
                console.log(res.data);

                this.setState({
                    notes: res.data.user.personal_notes
                }, () => {
                    NotificationManager.warning('We have deleted your selected note!', 'Note Deleted!', 5000);
                })
            } else {
                console.log("an error probably occurred... ", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    } 
    renderCountTwo = () => {
        const { user } = this.state;

        if (user.accountType === "business") {
            return (
                <div class="fun-fact" data-fun-fact-color="#2a41e6">
                    <div class="fun-fact-text">
                        <span>Combined Business Listing Views</span>
                        <h4>{user.job_posting_combined_count}</h4>
                    </div>
                    <div class="fun-fact-icon fun-fact-four"><i class="icon-feather-trending-up" style={{ color: "white" }}></i></div>
                </div>
            );
        } else {
            return (
                <div class="fun-fact" data-fun-fact-color="#2a41e6">
                    <div class="fun-fact-text">
                        <span>Your Profile Views</span>
                        <h4>{user.page_views ? user.page_views : "0"}</h4>
                    </div>
                    <div class="fun-fact-icon fun-fact-four"><i class="icon-feather-trending-up" style={{ color: "white" }}></i></div>
                </div>
            );
        }
    }
    renderConditional = () => {
        const { user } = this.state;
        
        let options;

        if (this.props.accountType === "freelancer") {
            options = [
                { value: "/dashboard/manage/applications", label: "Manage Jobs" },
                { value: "/dashboard/manage/bidders", label: "Manage My Bids" },
                { value: "/dashboard/manage/applications", label: "Un-Developed" },
                { value: "/dashboard/manage/applications", label: "Un-Developed" }
            ];
        } else {
            options = [
                { value: "/dashboard/manage/applications", label: "Manage Jobs" },
                { value: "/dashboard/manage/bidders", label: "Un-Developed" },
                { value: "/dashboard/manage/applications", label: "Un-Developed" },
                { value: "/dashboard/manage/applications", label: "Un-Developed" }
            ];
        }
        const defaultOption = options[0];

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
                                                <li class="active"><a style={{ color: "white" }} href={null}><i class="icon-material-outline-dashboard"></i> Dashboard</a></li>
                                                <li><Link to="/dashboard/messages"><i class="icon-material-outline-question-answer"></i> Messages <span class="nav-tag">2</span></Link></li>
                                                <li><a href="dashboard-bookmarks.html"><i class="icon-material-outline-star-border"></i> Bookmarks</a></li>
                                                <li><a href="dashboard-reviews.html"><i class="icon-material-outline-rate-review"></i> Reviews</a></li>
                                            </ul>
                                            {/* /dashboard/manage/applications */}
                                            <ul data-submenu-title="Organize and Manage">
                                                <li>
                                                    <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
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
                                                    <span class="trigger-title">Dashboard</span>
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
                                        <h4>0</h4>
                                    </div>
                                    <div class="fun-fact-icon fun-fact-one"><i class="icon-material-outline-gavel" style={{ color: "white" }}></i></div>
                                </div>
                                {this.renderCountOne()}
                                <div class="fun-fact" data-fun-fact-color="#efa80f">
                                    <div class="fun-fact-text">
                                        <span>Reviews</span>
                                        <h4>0</h4>
                                    </div>
                                    <div class="fun-fact-icon fun-fact-three"><i class="icon-material-outline-rate-review" style={{ color: "white" }}></i></div>
                                </div>

                                {this.renderCountTwo()}
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

                                        <div class="content with-padding note-content">
                                        {this.state.notes ? this.state.notes.map((note, index) => {
                                            return (
                                                <div class="dashboard-note">
                                                    <p>{note.note}</p>
                                                    <hr />
                                                    <p>{note.date}</p>
                                                    <div class="note-footer">
                                                        <span class={`note-priority ${this.notePriorityTag(note)}`}>{this.priorityConversion(note)}</span>
                                                        <div class="note-buttons">
                                                            <a onClick={() => {
                                                                this.editNote(note);
                                                            }} title="Edit" data-tippy-placement="top"><i class="icon-feather-edit"></i></a>
                                                            <a onClick={() => {
                                                                this.deleteNote(note);
                                                            }} title="Remove" data-tippy-placement="top"><i class="icon-feather-trash-2"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }) : <Fragment><h3 className="lead blue-text">You don't have any notes currently... Post a new one today!</h3></Fragment>}
                                            {/* <div class="dashboard-note">
                                                <p>Meeting with candidate at 3pm who applied for Bilingual Event Support Specialist</p>
                                                <div class="note-footer">
                                                    <span class="note-priority high">High Priority</span>
                                                    <div class="note-buttons">
                                                        <a href="#" title="Edit" data-tippy-placement="top"><i class="icon-feather-edit"></i></a>
                                                        <a href="#" title="Remove" data-tippy-placement="top"><i class="icon-feather-trash-2"></i></a>
                                                    </div>
                                                </div>
                                            </div> */}
                                            
                                        </div>
                                            <div class="add-note-button">
                                                <button onClick={() => {
                                                    this.setState({
                                                        notePaneOpen: !this.state.notePaneOpen
                                                    })
                                                }} class="btn blue-btn popup-with-zoom-anim button full-width button-sliding-icon">Add Note <i class="icon-material-outline-arrow-right-alt"></i></button>
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
                                    <div class="dashboard-box applications-box">
                                        {this.renderPortionOne()}
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
                                            <button class="btn blue-btn full-width button-sliding-icon">Add Note <i class="icon-material-outline-arrow-right-alt"></i></button>
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
    handleNoteSubmission = (e) => {
        e.preventDefault();

        console.log("note submission...");

        const { note, priority } = this.state;

        if (note.length > 0 && priority.length > 0) {
            axios.post("/post/new/note/dashboard", {
                username: this.props.username,
                note,
                priority
            }).then((res) => {
                if (res.data.message === "Successfully posted a new note!") {
                    console.log(res.data);
    
                    if (this.state.notes === undefined || this.state.notes.length == 0) {
                        this.setState({
                            notePaneOpen: false,
                            notes: [{
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                id: uuid(),
                                note,
                                priority
                            }]
                        }, () => {
                            NotificationManager.success('NEW NOTE POSTED!', 'Posted a new note successfully!');
        
                            setTimeout(() => {
                                this.setState({
                                    note: "",
                                    priority: ""
                                })
                            }, 1500);
                        })
                    } else {
                        this.setState({
                            notePaneOpen: false,
                            notes: [...this.state.notes, {
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                id: uuid(),
                                note,
                                priority
                            }]
                        }, () => {
                            NotificationManager.success('NEW NOTE POSTED!', 'Posted a new note successfully!');
        
                            setTimeout(() => {
                                this.setState({
                                    note: "",
                                    priority: ""
                                })
                            }, 1500);
                        })
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            NotificationManager.error('Make sure you complete BOTH fields (priority & note) before continuing', 'Please complete each field...', 7000);
        }
    }
    onCloseModalEdit = () => {
        this.setState({
            notePaneOpenEdit: !this.state.notePaneOpenEdit
        })
    }
    render() {
        const { user, application, notePaneOpen } = this.state;

        console.log(this.state);
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                {this.renderConditional()}       
                <Modal id="modal-modal" open={this.state.notePaneOpen} onClose={this.onCloseModal} center>
                        <div class="sign-in-form custom-popup">

                            <ul class="popup-tabs-nav">
                                <li><a href="#tab">Add Note</a></li>
                            </ul>

                            <div class="popup-tabs-container">

                        
                                <div class="popup-tab-content" id="tab">
                                    
                                
                                    <div class="welcome-text">
                                        <h3>Do Not Forget 😎</h3>
                                    </div>
                                        
                                
                                    <form onSubmit={this.handleNoteSubmission} id="add-note">

                                        <select onChange={(e) => {
                                            this.setState({
                                                priority: e.target.value
                                            })
                                        }} class="form-control with-border default margin-bottom-20" data-size="7" title="Priority">
                                            <option value={"--- select a value ---"}>--- select a value ---</option>
                                            <option value={"Low-Priority"}>Low Priority</option>
                                            <option value={"Medium-Priority"}>Medium Priority</option>
                                            <option value={"High-Priority"}>High Priority</option>
                                        </select>

                                        <textarea value={this.state.note} onChange={(e) => {
                                            this.setState({
                                                note: e.target.value
                                            })
                                        }} name="textarea" cols="10" placeholder={"Your note goes here..."} class="with-border"></textarea>

                                    </form>
                                    
                            
                                    <button class="button blue-btn full-width button-sliding-icon ripple-effect" type="submit" form="add-note">Add Note <i class="icon-material-outline-arrow-right-alt"></i></button>

                                </div>

                            </div>
                        </div>
                </Modal>
                <Modal id="modal-modal" open={this.state.notePaneOpenEdit} onClose={this.onCloseModalEdit} center>
                        <div class="sign-in-form custom-popup">

                            <ul class="popup-tabs-nav">
                                <li><a href="#tab">EDIT Note</a></li>
                            </ul>

                            <div class="popup-tabs-container">

                        
                                <div class="popup-tab-content" id="tab">
                                    
                                
                                    <div class="welcome-text">
                                        <h3>Edit your note below 🥳</h3>
                                    </div>
                                        
                                
                                    <form onSubmit={this.handleNoteSubmissionEdit} id="add-note">

                                        <select onChange={(e) => {
                                            this.setState({
                                                newPriority: e.target.value
                                            })
                                        }} class="form-control with-border default margin-bottom-20" data-size="7" title="Priority">
                                            <option value={"--- select a new value ---"}>--- select a new value ---</option>
                                            <option value={"Low-Priority"}>Low Priority</option>
                                            <option value={"Medium-Priority"}>Medium Priority</option>
                                            <option value={"High-Priority"}>High Priority</option>
                                        </select>

                                        <textarea onChange={(e) => {
                                            this.setState({
                                                newNote: e.target.value
                                            })
                                        }} value={this.state.newNote} name="textarea" cols="10" placeholder={this.state.selectedNote !== null ? `Your previous note is --- ${this.state.selectedNote.note}` : "Note could NOT be loaded yet..."} class="with-border"></textarea>

                                    </form>
                                    
                            
                                    <button class="button blue-btn full-width button-sliding-icon ripple-effect" type="submit" form="add-note">Add Note <i class="icon-material-outline-arrow-right-alt"></i></button>

                                </div>

                            </div>
                        </div>
                </Modal>
                <SlidingPane
                    className="sliding-pane-class"
                    overlayClassName="sliding-pane-overlay"
                    isOpen={this.state.isPaneOpen}
                    title="You are now viewing the details page of your potential future business partners/developers"
                    onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                        this.setState({ isPaneOpen: false });
                    }}
                >
                    {this.state.application !== null ? <Fragment>
                        <div>
                        <h3 className="text-center bold">Author/Sender: {application.sender} --- Date Submitted: {application.date}</h3> <hr />
                        <p className="lead text-dark"><strong style={{ color: "blue" }}>Subject/Title:</strong> {application.title}</p> <br />
                        <p><strong style={{ color: "blue" }}>Cover Letter/Intro: </strong> {application.cover_letter_message}</p>
                        <div class="numbered">
                            <ol>    
                                {application.firstQuestion ? <label>{application.firstQuestion.question}</label> : null}
                                {application.firstQuestion ? <li>{application.firstQuestion.answer}</li> : null}
                                {application.secondQuestion ? <label>{application.secondQuestion.question}</label> : null}
                                {application.secondQuestion ? <li>{application.secondQuestion.answer}</li> : null}
                                {application.thirdQuestion ? <label>{application.thirdQuestion.question}</label> : null}
                                {application.thirdQuestion ? <li>{application.thirdQuestion.answer}</li> : null}
                                {application.fourthQuestion ? <label>{application.fourthQuestion.question}</label> : null}
                                {application.fourthQuestion ? <li>{application.fourthQuestion.answer}</li> : null}
                                {application.fifthQuestion ? <label>{application.fifthQuestion.question}</label> : null}
                                {application.fifthQuestion ? <li>{application.fifthQuestion.answer}</li> : null}
                            </ol>
                        </div>
                        <hr className="my-4" />
                        {application.attachedFiles ? <label className="text-left" style={{ fontWeight: "bold" }}>This application includes {application.attachedFiles.length} file(s)</label> : null}
                        {application.attachedFiles ? application.attachedFiles.map((file, index) => {
                            return (
                                <div>
                                    <a style={{ margin: "15px 0px", color: "white" }} className="btn blue-btn" href={`https://s3.us-west-1.wasabisys.com/software-gateway-platform/${file.picture}`} download={file.title}>Download - {file.title}</a>
                                </div>
                            );
                        }) : null}
                    </div>
                    </Fragment> : null}
                    
                </SlidingPane> 
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
                accountType: state.auth.authenticated.accountType
            }
        }
    }
}
export default withRouter(connect(mapStateToProps, { authentication })(DashboardHomeHelper));