import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import "./style.css";

class SecondSignupPageHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        level: ""
    }
}
    handleSubmission = () => {
        console.log("submitted");

        const { level } = this.state;

        axios.post("/create/profile/update/expertise/level", {
            username: this.props.username,
            level
        }).then((res) => {
            if (res.data.message === "Successfully updated account!") {

                console.log(res.data);

                this.props.history.push("/signup/freelancer/page/2");
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        console.log("this.state --- second - index... ", this.state);
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                <div class="dashboard-container">

                    <div class="dashboard-content-container" data-simplebar>
                        <div class="dashboard-content-inner">
                            
                      
                            <div class="dashboard-headline">
                                <h3 className="text-left">Continue Building Your Profile</h3>

                                {/* <div class="col-xl-12">
                                    <button onClick={this.handleSubmission} class="button blue-btn ripple-effect big margin-top-30">Continue to next page </button>
                                </div> */}
                                <nav id="breadcrumbs" class="dark">
                                    <ul>
                                        <li>Home</li>
                                        <li>Expertise</li>
                                        <li style={{ color: "red" }}>Level Of Expertise</li>
                                        <li>Education</li>
                                        <li>Employment</li>
                                        <li>Languages</li>
                                        <li>Hourly Rate</li>
                                        <li>Location</li>
                                        <li>Contact Info</li>
                                    </ul>
                                </nav>
                            </div>

           

                            <h1 className="text-center" style={{ marginBottom: "40px" }}>Expertise level</h1>
                            <div className="row">
                                
                                    <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 col-col">
                                        <div class="card custom-align" style={{ width: "100%" }}>
                                            
                                            <div class="card-body">
                                                <h5 class="card-title">Entry level</h5>
                                                <p class="card-text">I am relatively new to this field...</p>
                                                <div id="push-bottom">
                                                    <button onClick={() => {
                                                        this.setState({
                                                            level: "ENTRY_LEVEL"
                                                        }, () => {
                                                            this.handleSubmission();
                                                        })
                                                    }} href="#" class="btn blue-btn" style={{ color: "white", fontWeight: "bold", width: "100%" }}>Select Entry Level</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 col-col">
                                        <div class="card custom-align" style={{ width: "100%" }}>
                                            
                                            <div class="card-body">
                                                <h5 class="card-title">Intermediate</h5>
                                                <p class="card-text">I have substantial experience in this field...</p>
                                                <button onClick={() => {
                                                    this.setState({
                                                        level: "INTERMEDIATE"
                                                    }, () => {
                                                        this.handleSubmission();
                                                    })
                                                }} href="#" class="btn blue-btn" style={{ color: "white", fontWeight: "bold", width: "100%" }}>Select Intermediate Level</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 col-col">
                                        <div class="card custom-align" style={{ width: "100%" }}>
                                            
                                            <div class="card-body">
                                                <h5 class="card-title">Expert</h5>
                                                <p class="card-text">I have comprehensive and deep expertise in this field</p>
                                                <button onClick={() => {
                                                    this.setState({
                                                        level: "EXPERT"
                                                    }, () => {
                                                       this.handleSubmission();
                                                    })
                                                }} href="#" class="btn blue-btn" style={{ color: "white", fontWeight: "bold", width: "100%" }}>Select Expert Level</button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div class="col-xl-12">
                                    <button onClick={() => {
                                        console.log("clicked.")
                                        this.props.history.push("/");
                                    }} style={{ width: "50%" }} class="button btn-danger red-btn ripple-effect big margin-top-30">Back to previous page</button>
                                </div>

                        
                                <div style={{ marginTop: "250px" }} class="dashboard-footer-spacer"></div>
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
export default withRouter(connect(mapStateToProps, { })(SecondSignupPageHelper));