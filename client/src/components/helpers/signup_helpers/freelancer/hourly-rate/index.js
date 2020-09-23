import React, { Component } from 'react';
import "./style.css";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { NotificationManager} from 'react-notifications';

class HourlyRateFreelancerHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        hourly: 0
    }
}   
    handleSubmission = () => {
        console.log("submitted.", this.props.username);

        if (this.state.hourly !== 0) {
            axios.post("/profile/build/freelancer/hourly/rates", {
                username: this.props.username,
                hourly: this.state.hourly
            }).then((res) => {
                if (res.data.message === "Successfully updated account!") {
                    console.log(res.data);
                    this.props.history.push("/signup/freelancer/page/6");
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            NotificationManager.error('Please fill our your "hourly rate" before continuing...', 'An Error Occurred', 7000);
        }
    }
    render() {
        console.log(this.state);
        return (
            <div>
                <div style={{ borderTop: "3px solid lightgrey" }}>
                    <div class="dashboard-container">

                        <div class="dashboard-content-container" data-simplebar>
                            <div class="dashboard-content-inner">
                                
                        
                                <div class="dashboard-headline">
                                    <h3 className="text-left">Hourly Rate(s)</h3>

                                    
                                    <nav id="breadcrumbs" class="dark">
                                        <ul>
                                            <li>Home</li>
                                            <li>Expertise</li>
                                            <li>Level Of Expertise</li>
                                            <li>Education</li>
                                            <li>Employment</li>
                                            <li>Languages</li>
                                            <li style={{ color: "red" }}>Hourly Rate</li>
                                            <li>Location</li>
                                            
                                        </ul>
                                    </nav>
                                </div>

                        
                                <div class="row">

                                    
                                    <div class="col-xl-12">
                                        <div class="dashboard-box margin-top-0">

                                        
                                            <div class="headline">
                                                <h3><i class="icon-feather-folder-plus"></i>Hourly Rate Declaration</h3>
                                            </div>

                                            <div style={{ minHeight: "400px" }} class="content with-padding padding-bottom-10">
                                                <p className="lead text-left">Clients will see this rate on your profile and in search results once you publish your profile. You can adjust your rate every time you submit a proposal.</p>
                                                <div class="row">

                                                    <div style={{ marginTop: "30px" }} class="col-xl-12">
                                                        <div class="submit-field input-group">
                                                            <h5>Hourly Rate</h5>
                                                            <label>Total amount the client will see</label>
                                                            <div class="input-group mb-3">
                                                                <div class="input-group-prepend">
                                                                    <span class="input-group-text input-group-prepend-custom ">$</span>
                                                                </div>
                                                                <input onChange={(e) => {
                                                                    this.setState({
                                                                        hourly: Number(e.target.value)
                                                                    })
                                                                }} type="text" class="form-control" aria-label="Amount (to the nearest dollar)" />
                                                                <div class="input-group-append">
                                                                    <span class="input-group-text input-group-prepend-custom ">.00</span>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                        {this.state.hourly ? <h4 className="text-center">You will recieve <strong style={{ color: "blue" }}>${Math.floor(this.state.hourly * 0.80)}</strong> every hour of work billed after fees...</h4> : null}
                                                    </div>
                                                    <div class="col-xl-12 col-sm-12 col-xs-12">
                                                    <h5 style={{ fontSize: "16px", marginTop: "25px", marginBottom: "15px" }}>[Company Name(s)] Service Fee</h5>
                                                    <label>The [Company Name(s)] Service Fee is 20% when you begin a contract with a new client. Once you bill over $500 with your client, the fee will be 10% - Contact us if you are doing large quantites of projects as we can figure out a custom plan.</label>
                                                    <div class="submit-field input-group">
                                                        <h5>Service Fee</h5>
                                                            <div class="input-group mb-3">
                                                                <div class="input-group-prepend">
                                                                    <span class="input-group-text input-group-prepend-custom ">$</span>
                                                                </div>
                                                                <input value={"-" + Math.floor(this.state.hourly * 0.20)} type="text" class="form-control" aria-label="Amount (to the nearest dollar)" />
                                                                <div class="input-group-append">
                                                                    <span class="input-group-text input-group-prepend-custom ">.00</span>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                                
                                                
                                            </div>
                                            
                                        </div>
                                        
                                    </div>

                                    <div class="col-xl-12">
                                        <button onClick={() => {
                                            console.log("clicked.")
                                            this.props.history.push("/signup/freelancer/page/4");
                                        }} style={{ width: "50%" }} class="button btn-danger red-btn ripple-effect big margin-top-30">Back to previous page</button>
                                    </div>

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
export default withRouter(connect(mapStateToProps, {  })(HourlyRateFreelancerHelper));