import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import "./style.css";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Datetime from "react-datetime";

class ThirdSignupPageHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        level: "",
        isPaneOpen: false,
        schoolName: "",
        areaOfStudy: "",
        degree: "",
        startDate: null,
        endDate: null,
        description: ""
    }
}
    skipStep = () => {
        console.log("clicked.");
        this.props.history.push("/signup/freelancer/page/3");
    }
    handleChange = date => {
        this.setState({
            startDate: date._d
        });
    };
    handleChangeTwo = date => {
        this.setState({
            endDate: date._d
        })
    }
    handleSchoolSubmission = () => {
        console.log("submitted");

        const { schoolName, areaOfStudy, degree, startDate, endDate, description } = this.state;

        if (schoolName.length > 0 && degree.length > 0) {
            axios.post("/update/profile/school/data", {
                username: this.props.username,
                schoolName,
                degree,
                areaOfStudy: areaOfStudy.length > 0 ? areaOfStudy : "Not-Provided.",
                startDate: startDate !== null ? startDate : "Not-Provided.",
                endDate: endDate !== null ? endDate : "Not-Provided.",
                description: description.length > 0 ? description : "Not-Provided."
            }).then((res) => {
                if (res.data.message === "Successfully updated account!") {
                    console.log(res.data);
                    this.props.history.push("/signup/freelancer/page/3");
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            alert("Please complete at least 'School Name' & 'Degree'...")
        }
    }
    render() {
        console.log("this.state --- second - index... ", this.state);
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                <div className="dashboard-container">

                    <div className="dashboard-content-container" data-simplebar>
                        <div className="dashboard-content-inner">
                            
                      
                            <div className="dashboard-headline">
                                <h3 className="text-left">Education Details</h3>

                                {/* <div className="col-xl-12">
                                    <button onClick={this.handleSubmission} className="button blue-btn ripple-effect big margin-top-30">Continue to next page </button>
                                </div> */}
                                <nav id="breadcrumbs" className="dark">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li>Expertise</li>
                                        <li>Level Of Expertise</li>
                                        <li style={{ color: "red" }}>Education</li>
                                        <li>Employment</li>
                                        <li>Languages</li>
                                        <li>Hourly Rate</li>
                                        <li>Location</li>
                                        <li>Contact Info</li>
                                    </ul>
                                </nav>
                            </div>

                            

                            <h1 className="text-center" style={{ marginBottom: "40px" }}>Education</h1>
                                <div className="row">
                                    
                                <div className="col-xl-12">
                                        <div className="dashboard-box margin-top-0">

                                            <div className="headline">
                                                <h3><i className="icon-feather-folder-plus"></i>Education</h3>
                                            </div>

                                            <div style={{ minHeight: "400px", padding: "40px" }} className="content">
                                                <h2 className="text-left">Add the schools you attended, areas of study, and degrees earned.</h2>
                                                <hr className="my-4" />
                                                <div style={{ float: "left" }}>
                                                    <button onClick={() => {
                                                        this.setState({
                                                            isPaneOpen: !this.state.isPaneOpen
                                                        })
                                                    }} className="btn blue-btn" style={{ color: "white" }}><i class="fa fa-plus-circle"></i> Add Education</button>
                                                </div>
                                                <br />
                                                <br />

                                                <div className="hover-text" onClick={() => {
                                                    this.skipStep()
                                                }}><h4 className="text-left" style={{ textDecoration: "underline" }}>Skip This Step...</h4></div>

                                            </div>
                                        </div>
                                    </div>
                                        
                                </div>

                                <div className="col-xl-12">
                                    <button onClick={() => {
                                        console.log("clicked.")
                                        this.props.history.push("/signup/freelancer/page/1");
                                    }} style={{ width: "50%" }} className="button btn-danger red-btn ripple-effect big margin-top-30">Back to previous page</button>
                                </div>

                        
                                <div style={{ marginTop: "250px" }} className="dashboard-footer-spacer"></div>
                                <div className="small-footer margin-top-15">
                                    <div className="small-footer-copyrights">
                                        © 2019 <strong>[Company Name(s)]</strong>. All Rights Reserved.
                                    </div>
                                    <ul className="footer-social-links">
                                        <li>
                                            <a href="#" title="Facebook" data-tippy-placement="top">
                                                <i className="icon-brand-facebook-f"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="Twitter" data-tippy-placement="top">
                                                <i className="icon-brand-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="Google Plus" data-tippy-placement="top">
                                                <i className="icon-brand-google-plus-g"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="LinkedIn" data-tippy-placement="top">
                                                <i className="icon-brand-linkedin-in"></i>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="clearfix"></div>
                                </div>
                    

                            </div>
                    </div>
                                    

                </div>
                <SlidingPane
                    className="panel-panel"
                    overlayClassName="panel-overlay-special"
                    isOpen={this.state.isPaneOpen}
                    title="Please select your schooling information"
                    subtitle="Please provide the most up-to-date information regarding your schooling to the best of your knowledge"
                    onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                        this.setState({ isPaneOpen: false });
                    }}
                >
                <div className="content with-padding padding-bottom-10">
                    <div className="row">

                        <div className="col-xl-4">
                            <div className="submit-field">
                                <h5>School Name</h5>
                                <input onChange={(e) => {
                                    this.setState({
                                        schoolName: e.target.value
                                    })
                                }} value={this.state.schoolName} type="text" className="with-border" placeholder={"School Name..."} />
                            </div>
                        </div>

                        <div className="col-xl-4">
                            <div className="submit-field">
                                <h5>Area Of Study (Optional)</h5>
                                <input onChange={(e) => {
                                    this.setState({
                                        areaOfStudy: e.target.value
                                    })
                                }} value={this.state.areaOfStudy} type="text" className="with-border" placeholder={"Area Of Study..."} />
                            </div>
                        </div>

                        <div className="col-xl-4">
                            <div className="submit-field">
                                <h5>Degree</h5>
                                <select onChange={(e) => {
                                    this.setState({
                                        degree: e.target.value
                                    })
                                }} className="form-control">
                                    <option value="technical-school">Technical School</option>
                                    <option value="associates-degree">Associates Degree</option>
                                    <option value="bachelors-degree">bachelor's Degree</option>
                                    <option value="masters-degree">Master's Degree</option>
                                    <option value="coding-bootcamp">Coding Bootcamp</option>
                                    <option value="doctorates-degree">Doctorate's Degree</option>
                                    <option value="no-degree">No Degree Acheieved</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-sm-12 col-sx-12">
                            
                            <label>Start Date (From)</label>
                            <Datetime timeFormat={false} value={this.state.startDate} onChange={this.handleChange} />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-sm-12 col-sx-12">
                            
                            <label>End Date (Graduation date or expected)</label>
                            <Datetime timeFormat={false} value={this.state.endDate} onChange={this.handleChangeTwo} />
                        </div>



                        <div className="col-xl-12">
                            <div className="submit-field">
                                <h5>Description (Optional)</h5>
                                <textarea placeholder={"Graduated with a 3.75 GPA - Specialized in computer science and competed in various competitions from building robots to studying algorithims..."} onChange={(e) => {
                                    this.setState({
                                        description: e.target.value
                                    })
                                }} cols="30" rows="5" className="with-border"></textarea>
                                
                            </div>
                        </div>
                        <button onClick={() => {
                            console.log("clicked.")
                            this.handleSchoolSubmission();
                        }} style={{ width: "100%" }} className="button blue-btn red-btn ripple-effect big margin-top-30">Submit</button>
                    </div>
                </div>
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
                username: state.auth.authenticated.username
            }
        }
    }
}
export default withRouter(connect(mapStateToProps, { })(ThirdSignupPageHelper));