import React, { Component } from 'react';
import "./style.css";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { saveCurrentID } from "../../../../../actions/signup/signedUpOrNot.js";

class InitialPageBusinessSignupHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        jobTitle: "",
        category: "",
        specialty: ""
    }
}   
    handleSubmission = () => {
        console.log("submitted.", this.props.username);

        const { jobTitle, category } = this.state;

        axios.post("/business/signup/posting/title", {
            username: this.props.username,
            job_title: jobTitle,
            category
        }).then((res) => {
            if (res.data.message === "Successfully updated account!") {

                console.log(res.data);

                this.props.saveCurrentID(res.data.id);

                setTimeout(() => {
                    this.props.history.push("/signup/business/page/1");
                }, 500);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        console.log(this.state);
        return (
            <div id="margin">
                <div style={{ borderTop: "3px solid lightgrey" }}>
                    <div class="dashboard-container">

                        <div class="dashboard-content-container" data-simplebar>
                            <div class="dashboard-content-inner">
                                
                        
                                <div class="dashboard-headline">
                                    <h3 className="text-left">Title</h3>

                                    
                                    <nav id="breadcrumbs" class="dark">
                                        <ul>
                                            <li>Home</li>
                                            <li style={{ color: "red" }}>Title</li>
                                            <li>Description</li>
                                            <li>Details</li>
                                            <li>Expertise</li>
                                            <li>Location</li>
                                            <li>Visibility</li>
                                            <li>Budget</li>
                                            <li>Review</li>
                                            
                                        </ul>
                                    </nav>
                                </div>

                        
                                <div class="row">

                                    
                                    <div class="col-xl-12">
                                        <div class="dashboard-box margin-top-0">

                                        
                                        <div className="content with-padding padding-bottom-10">
                                            <div className="row">

                                                

                                                
                                                <div className="col-xl-12 col-lg-12 col-sm-12 col-xs-12">
                                                    <div className="submit-field">
                                                        <h5>Enter the name of your job post</h5>
                                                        <input onChange={(e) => {
                                                            this.setState({
                                                                jobTitle: e.target.value
                                                            })
                                                        }} value={this.state.jobTitle} type="text" className="with-border" placeholder={"Looking for iOS/Android app developer - High pay!"} />

                                                    </div>
                                                    <label className="text-left" style={{ color: "blue" }}>Here are some good examples...</label>
                                                    <ul className="list">
                                                        <li>Developer needed for creating a responsive WordPress Theme</li>
                                                        <li>Software developer needed to create a Airbnb replica mobile app</li>
                                                        <li>Need a design for a new company logo</li>
                                                    </ul>
                                                    <hr className="my-4" />
                                                </div>
                                                <div className="col-xl-12">
                                                    <div className="submit-field">
                                                        <h5>Category</h5>
                                                        <label>Let's categorize your job, which helps us personalize your job details and match your job to relevant freelancers and agencies.</label>
                                                        <select onChange={(e) => {
                                                            this.setState({
                                                                category: e.target.value
                                                            })
                                                        }} className="form-control" >
                                                            <option value="-----">---- pick an option ----</option>
                                                            <option value="full-stack-software-project">Full-Stack Development</option>
                                                            <option value="front-end-development-only">Front-End Development (only)</option>
                                                            <option value="back-end-development-only">Back-End Development (only)</option>
                                                            <option value="ML/AI">Machine learning - Artificial intelligence</option>
                                                            <option value="big-data">Big Data</option>
                                                            <option value="web-development">Web Development</option>
                                                            <option value="mobile-app-development">Mobile App Development</option>
                                                            <option value="database-design">Database Design</option>
                                                            <option value="hacking-networking">Hacking - Networking</option>
                                                            <option value="project-management">Project Management</option>
                                                            <option value="Q-A">Quality Assurance (QA)</option>
                                                            <option value="test-driven-development">Test Driven Development</option>
                                                            <option value="AR/VR-Development">AR/VR Development</option>
                                                            <option value="desktop-app-development">Desktop App Development</option>
                                                            <option value="mobile-design">Mobile Design</option>
                                                            <option value="AR/VR-Development">Mobile Game Development</option>
                                                            <option value="UX/UI-design">UI/UX Design</option>
                                                            <option value="prototyping">Prototyping</option>
                                                            <option value="product-management">Project Management</option>
                                                            <option value="agile-scrum-guidence">Agile/Scrum Guidence</option>
                                                            <option value="general-game-development">General Game Development</option>
                                                        </select>	
                                                    </div>
                                                </div>
                                              
                                            
                                            </div>
                                        </div>
                                            
                                        </div>
                                        
                                    </div>

                                    {/* <div class="col-xl-12">
                                        <button onClick={() => {
                                            console.log("clicked.")
                                            this.props.history.push("/signup/freelancer/page/4");
                                        }} style={{ width: "50%" }} class="button btn-danger red-btn ripple-effect big margin-top-30">Back to previous page</button>
                                    </div> */}

                                    <div class="col-xl-12">
                                        <button style={{ width: "100%" }} onClick={this.handleSubmission} class="button blue-btn ripple-effect big margin-top-30">Continue to next page </button>
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
export default withRouter(connect(mapStateToProps, { saveCurrentID })(InitialPageBusinessSignupHelper));