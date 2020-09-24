import React, { Component } from 'react';
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { authentication } from "../../../../actions/auth/auth.js";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "./style.css";

class ManageBidsFreelancerHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        bids: [],
        ready: false
    }
}
    _onSelect = (value) => {
        console.log("selected", value);

        this.props.history.push(value.value);
    }
    componentDidMount() {
        axios.post("/gather/specific/user/username", {
            username: this.props.username
        }).then((res) => {
            if (res.data.message === "Found Specific User!") {
                console.log(res.data);

                if (res.data.user.submitted_applications) {
                    for (let index = 0; index < res.data.user.submitted_applications.length; index++) {
                        const element = res.data.user.submitted_applications[index];
                        
                        axios.post("/gather/posted/job/by/id/two", {
                            id: element.related_to
                        }).then((responseee) => {
                            console.log("responseee.data :", responseee.data);

                            element.original_post_title = responseee.data.job.title;
                            element.billing = responseee.data.job.billing;
                            element.all_data = responseee.data.job;

                            this.setState({
                                bids: [...this.state.bids, element]
                            })
                        }).catch((err) => {
                            console.log(err);
                        })
                    }

                    this.setState({
                        ready: true
                    })
                }
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        const { bids, ready } = this.state;

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
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                <div class="dashboard-container">
                    <div class="dashboard-sidebar">
                        <div class="dashboard-sidebar-inner" data-simplebar>
                            <div class="dashboard-nav-container">

                              
                                <a href="#" class="dashboard-responsive-nav-trigger">
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
                        </div>
                    </div>
                   


             
                    <div class="dashboard-content-container" data-simplebar>
                        <div class="dashboard-content-inner" >
                            
                    
                            <div class="dashboard-headline">
                                <h3>My Active Bids</h3>

                            
                                <nav id="breadcrumbs" class="dark">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">Dashboard</a></li>
                                        <li>My Active Bids</li>
                                    </ul>
                                </nav>
                            </div>

                            
                            <div class="row">

                              
                                <div class="col-xl-12">
                                    <div class="dashboard-box margin-top-0">

                                        
                                        <div class="headline">
                                            <h3><i class="icon-material-outline-gavel"></i> Bids List</h3>
                                        </div>

                                        <div class="content">
                                            <ul class="dashboard-box-list">
                                                {typeof bids !== "undefined" && bids.length > 0 && ready === true ? bids.map((bid, index) => {
                                                    console.log("bid", bid);
                                                    return (
                                                        <li key={index}>
                                                   
                                                            <div class="job-listing width-adjustment">

                                                            
                                                                <div class="job-listing-details">

                                                                
                                                                    <div class="job-listing-description">
                                                                        <h3 class="job-listing-title"><a href="#">{bid.original_post_title}</a></h3>
                                                                        <div class="buttons-to-right always-visible">
                                                                            <a class="popup-with-zoom-anim button dark ripple-effect ico ico-btn" title="Edit Bid" data-tippy-placement="top"><i class="icon-feather-edit"></i></a>
                                                                            <a class="button red ripple-effect ico ico-btn" title="Cancel Bid" data-tippy-placement="top"><i class="icon-feather-trash-2"></i></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            
                                                            <ul class="dashboard-task-info">
                                                                <li><strong>{bid.billing.pay.toString()} {bid.billing.currency}</strong><span>{bid.billing.rate === "HOURLY" ? "Per Hour" : "Fixed-Price"}</span></li>
                                                                <li><strong>14 Days</strong><span>Delivery Time</span></li>
                                                            </ul>

                                                        
                                                            
                                                        </li>
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
export default withRouter(connect(mapStateToProps, { authentication })(ManageBidsFreelancerHelper));
