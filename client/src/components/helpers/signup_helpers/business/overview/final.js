import React, { Component, Fragment } from 'react';
import "./style.css";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { authentication } from "../../../../../actions/auth/auth.js";

class BusinessSignupOverviewHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        data: []
    }
}
    handleSubmission = () => {
        console.log("handle submission");

        const { job_postings } = this.state.data.businessData;

        const posting = job_postings[0];

        const action_data = {
            title: posting.title,
            desc: posting.description,
            billing: posting.billing,
            listing_id: posting.id
        }

        axios.post("/business/complete/signup", {
            username: this.props.username,
            action_data_id: posting.id,
            action_data
        }).then((res) => {
            console.log(res.data);
            if (res.data.message === "Successfully registered user and posted job!") {

                this.props.authentication({});

                localStorage.clear();
                
                this.props.history.push("/sign-in");

                window.location.reload();
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    componentDidMount() {
        axios.post("/gather/specific/user/username", {
            username: this.props.username
        }).then((res) => {
            if (res.data.message === "Found Specific User!") {
                console.log(res.data);

                this.setState({
                    data: res.data.user
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    delayRenderTillLoad = () => {
        if (this.state.data.length !== 0) {
            const { job_postings } = this.state.data.businessData;

            const posting = job_postings[0];

            console.log("job postings", posting);
            return (
                <Fragment>
                    <Tabs>
                        <TabList>
                        <Tab>General</Tab>
                        <Tab>Details</Tab>
                        <Tab>Expertise</Tab>
                        <Tab>Location</Tab>
                        <Tab>Visibility</Tab>
                        <Tab>Budget</Tab>
                        </TabList>
                    
                        <TabPanel>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12">
                                    <div class="section-headline border-top margin-top-40 padding-top-45 margin-bottom-25">
                                            <h4>General Details</h4>
                                        </div>
                                        <div class="row">
                                                <div class="numbered color filled">
                                                    <ul className="ol list-2 custom-list">
                                                        <label>Title</label>
                                                        <li>{posting.title ? posting.title : "None-Provided"}</li>
                                                        <label>Description</label>
                                                        <li>{posting.description ? posting.description : "None-Provided"}</li>
                                                        <label>Experience Level Desired</label>
                                                        <li>{posting.experience_level ? posting.experience_level : "None-Provided"}</li>
                                                        <label>Original Creation Date</label>
                                                        <li>{posting.date ? posting.date : "None-Provided"}</li>
                                                    </ul>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="container-fluid adjust-width">
                                <div className="row">
                                    <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12">
                                    <div class="section-headline border-top margin-top-40 padding-top-45 margin-bottom-25">
                                            <h4>Details</h4>
                                        </div>
                                        <div class="row">
                                                <div class="numbered color filled">
                                                    <ul className="ol list-2 custom-list">
                                                        <label>Attached Files</label>
                                                        {typeof posting.attachedFiles !== "undefined" && posting.attachedFiles.length !== 0 ? posting.attachedFiles.map((file, index) => {
                                                            return <li>{file.title}</li>
                                                        }) : null}
                                                        <label>Type Of Length Of Project</label>
                                                        <li>{typeof posting.length_of_project !== "undefined" && posting.length_of_project ? posting.length_of_project : "None-Provided"}</li>
                                                        <label>Size Of Company</label>
                                                        {typeof posting.business_size !== "undefined" && posting.business_size.length !== 0 ? posting.business_size.map((size, index) => {
                                                            return <li>{size.label}</li>
                                                        }) : null}
                                                        <label>Questions For Applicant</label>
                                                        {typeof posting.questions_for_applicant !== "undefined" && posting.questions_for_applicant.length !== 0 ? posting.questions_for_applicant.map((question, index) => {
                                                            return <li>{question}</li>
                                                        }) : null}
                                                    </ul>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="container-fluid adjust-width">
                                <div className="row">
                                    <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12">
                                    <div class="section-headline border-top margin-top-40 padding-top-45 margin-bottom-25">
                                            <h4>Expertise</h4>
                                        </div>
                                        <div class="row">
                                                <div class="numbered color filled">
                                                    <ul className="ol list-2 custom-list">
                                                        <label>Types Of Development Desired</label>
                                                        {posting.type_of_development.length !== 0 ? posting.type_of_development.map((type, index) => {
                                                            return <li>{type.label}</li>
                                                        }) : null}
                                                        <label>Web Server Types Potentially Required</label>
                                                        {posting.web_server_types.length !== 0 ? posting.web_server_types.map((server, index) => {
                                                            return <li>{server.label}</li>
                                                        }) : null}
                                                        <label>Database Types Requried</label>
                                                        {posting.database_types.length !== 0 ? posting.database_types.map((database, index) => {
                                                            return <li>{database.label}</li>
                                                        }) : null}
                                                        <label>Additional Skills</label>
                                                        {posting.additional_skills.length !== 0 ? posting.additional_skills.map((skill, index) => {
                                                            return <li>{skill.value}</li>
                                                        }) : null}
                                                        <label>Platform Types</label>
                                                        {posting.platform.length !== 0 ? posting.platform.map((type, index) => {
                                                            return <li>{type.label}</li>
                                                        }) : null}
                                                    </ul>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                        <div className="container-fluid adjust-width">
                                <div className="row">
                                    <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12">
                                    <div class="section-headline border-top margin-top-40 padding-top-45 margin-bottom-25">
                                            <h4>Location</h4>
                                        </div>
                                        <div class="row">
                                                <div class="numbered color filled">
                                                    <ul className="ol list-2 custom-list">
                                                        <label>Location Preference</label>
                                                        <li>{posting.location_preference ? posting.location_preference : "None-Provided"}</li>
                                                        <label>Preferred Time-Zone</label>
                                                        <li>{posting.preferred_state_timezone ? posting.preferred_state_timezone : "None-Provided"}</li>
                                                        
                                                    </ul>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="container-fluid adjust-width">
                                <div className="row">
                                    <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12">
                                    <div class="section-headline border-top margin-top-40 padding-top-45 margin-bottom-25">
                                            <h4>Visibility</h4>
                                        </div>
                                        <div class="row">
                                                <div class="numbered color filled">
                                                    <ul className="ol list-2 custom-list">
                                                        <label>Perfer Agency Or Individual Freelancer</label>
                                                        <li>{posting.visibility.agency_or_individual ? posting.visibility.agency_or_individual : "None-Provided"}</li>
                                                        <label>Amount Of Freelancers Required</label>
                                                        <li>{posting.visibility.amount_of_freelancers_required ? posting.visibility.amount_of_freelancers_required : "None-Provided"}</li>
                                                        <label>Minimum Amount Earned To Apply</label>
                                                        <li>{posting.visibility.minimum_amount_earned ? posting.visibility.minimum_amount_earned : "None-Provided"}</li>
                                                        <label>Minimum Success Score To Apply</label>
                                                        <li>{posting.visibility.minimum_success_score ? posting.visibility.minimum_success_score : "None-Provided"}</li>
                                                        <label>Visibility</label>
                                                        <li>{posting.visibility.visibility ? posting.visibility.visibility : "None-Provided"}</li>
                                                       
                                                    </ul>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="container-fluid adjust-width">
                                <div className="row">
                                    <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12">
                                    <div class="section-headline border-top margin-top-40 padding-top-45 margin-bottom-25">
                                            <h4>Billing / Budget</h4>
                                        </div>
                                        <div class="row">
                                                <div class="numbered color filled">
                                                    <ul className="ol list-2 custom-list">
                                                        <label>Currency Type</label>
                                                        <li>{posting.billing.currency ? posting.billing.currency : "None-Provided"}</li>
                                                        <label>Hourly or Fixed</label>
                                                        <li>{posting.billing.rate ? posting.billing.rate : "None-Provided"}</li>
                                                        <label>Billing Amount Per Rate</label>
                                                        <li>{posting.billing.pay ? posting.billing.pay : "None-Provided"}</li>
                                                       
                                                    </ul>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                    
                </Fragment>
            );
        } else {
            return null;
        }
    }
    render() {
        console.log('this.state - description', this.state);
        return (
            <div>
                <div style={{ borderTop: "3px solid lightgrey" }}>
                    <div class="dashboard-container">

                        <div class="dashboard-content-container" data-simplebar>
                            <div class="dashboard-content-inner">
                                
                        
                                <div class="dashboard-headline">
                                    <h3 className="text-left">Review</h3>

                                    
                                    <nav id="breadcrumbs" class="dark">
                                        <ul>
                                            <li>Home</li>
                                            <li>Title</li>
                                            <li>Description</li>
                                            <li>Details/Type</li>
                                            <li>Expertise</li>
                                            <li>Location</li>
                                            <li>Visibility</li>
                                            <li>Budget</li>
                                            <li style={{ color: "red" }}>Review</li>
                                            
                                        </ul>
                                    </nav>
                                </div>

                        
                                <div class="row">

                                    
                                    <div class="col-xl-12">
                                        <div class="dashboard-box margin-top-0" style={{ height: "100%" }}>

                                        
                                        <div className="content with-padding padding-bottom-10">
                                            <div className="row">
                                                {this.delayRenderTillLoad()}
                                            </div>
                                            <label className="text-center">You'll be able to edit any information you may want to change at a later date from the "Dashboard" page in your account settings...</label>
                                            <div className="row">
                                                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 col-xl-12">
                                                    <button onClick={this.handleSubmission} className="btn blue-btn" style={{ width: "100%", color: "white" }}>Submit Job Posting & fully activate your account!</button>
                                                </div>                                  
                                            </div>
                                        </div>
                                            
                                        </div>
                                        
                                    </div>

                                   
                                    
                                </div>
                        
                                <div class="dashboard-footer-spacer"></div>
                                <div class="small-footer margin-top-15">
                                    <div class="small-footer-copyrights">
                                        © 2019 <strong>[Company Name(s)]</strong>. All Rights Reserved.
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
export default withRouter(connect(mapStateToProps, { authentication })(BusinessSignupOverviewHelper));
