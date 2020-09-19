import React, { Component, Fragment } from 'react';
import "./style.css";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Slider from 'react-rangeslider';
import { NotificationManager } from "react-notifications";

class VisibilityHelperBusinessSignup extends Component {
constructor(props) {
    super(props)
    
    this.state = {
      amountOfFreelancers: null,
      volume: 0,
      amountEarned: null,
      successScore: null,
      companyOrNo: null,
      talentType: null
    }
}
    handleOnChange = (value) => {
        this.setState({
            volume: Number(value)
        })
    }
    handleSubmission = () => {
        console.log("handle submission...");

        const { amountOfFreelancers, talentType, successScore, amountEarned, companyOrNo, volume } = this.state;
 
        if (amountOfFreelancers !== null && talentType !== null && successScore !== null && amountEarned !== null && companyOrNo !== null) {
            axios.post("/business/signup/visibility/update", {
                amount_of_freelancers: amountOfFreelancers === "MULTIPLE-FREELANCERS-REQUIRED" ? volume : amountOfFreelancers, 
                visibility: talentType, 
                success_score: successScore, 
                amount_earned: amountEarned, 
                agency_or_individual: companyOrNo,
                username: this.props.username
            }).then((res) => {
                if (res.data.message === "Successfully edited and posted new information to users profile!") {
                    console.log(res.data);
    
                    this.props.history.push("/signup/business/page/6");
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            NotificationManager.error('Please make sure you fill out each appropriate field before continuing...', 'ERROR', 7000);
        }
    }

    render() {
        console.log('this.state - description', this.state);
        return (
            <div>
                <div style={{ borderTop: "3px solid lightgrey" }}>
                    <div className="dashboard-container">

                        <div className="dashboard-content-container" data-simplebar>
                            <div className="dashboard-content-inner">
                                
                        
                                <div className="dashboard-headline">
                                    <h3 className="text-left">Details - Type of project</h3>

                                    
                                    <nav id="breadcrumbs" className="dark">
                                        <ul>
                                            <li>Home</li>
                                            <li>Title</li>
                                            <li>Description</li>
                                            <li>Details/Type</li>
                                            <li>Expertise</li>
                                            <li>Location</li>
                                            <li style={{ color: "red" }}>Visibility</li>
                                            <li>Budget</li>
                                            <li>Review</li>
                                            
                                        </ul>
                                    </nav>
                                </div>

                        
                                <div className="row">

                                    
                                    <div className="col-xl-12">
                                        <div className="dashboard-box margin-top-0" style={{ height: "100%" }}>
                                        <label className="header">Who can see your job?</label>
                                            <div className="row">
                                            
                                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-xl-4">
                                                        <div className="card" style={{ width: "100%" }}>
                                                            <div className={this.state.talentType === "ANYONE" ? "card-header header" : "card-header red-header"}>
                                                                Anyone (ANY Freelancers)
                                                            </div>
                                                            <div className="card-body">
                                                                
                                                                <p className="card-text">Freelancers and agencies using [Company Name(s)] and public search engines can find this job.</p>
                                                                <button onClick={() => {
                                                                    this.setState({
                                                                        talentType: "ANYONE"
                                                                    })
                                                                }} className={this.state.talentType === "ANYONE" ? "btn btn-dark" : "btn two-red"} style={{ color: "white" }}>Select Option</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-xl-4">
                                                    <div className="frb-group">
                                                        <div className="card" style={{ width: "100%" }}>
                                                            <div className={this.state.talentType === "PLATFORM-SPECIFIC" ? "card-header header" : "card-header red-header"}>
                                                                Only [Company Name(s)] talent
                                                            </div>
                                                            <div className="card-body">
                                                               
                                                                <p className="card-text">Only [Company Name(s)] users can find this job.</p>
                                                                <button onClick={() => {
                                                                    this.setState({
                                                                        talentType: "PLATFORM-SPECIFIC"
                                                                    })
                                                                }} className={this.state.talentType === "PLATFORM-SPECIFIC" ? "btn btn-dark" : "btn two-red"} style={{ color: "white" }}>Select Option</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-xl-4">
                                                    <div className="frb-group">
                                                        <div className="card" style={{ width: "100%" }}>
                                                            <div className={this.state.talentType === "INVITE-ONLY" ? "card-header header" : "card-header red-header"}>
                                                                Invitation-ONLY
                                                            </div>
                                                            <div className="card-body">
                                                            
                                                                <p className="card-text">Only freelancers and agencies you have invited can find this job.</p>
                                                                <button onClick={() => {
                                                                    this.setState({
                                                                        talentType: "INVITE-ONLY"
                                                                    })
                                                                }} className={this.state.talentType === "INVITE-ONLY" ? "btn btn-dark" : "btn two-red"} style={{ color: "white" }}>Select Option</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                               
                                            </div>
                                            <hr className="black-line" />    
                                            <label className="header">How many people do you need for this job?</label>                
                                            <div className="row" style={{ marginTop: "30px" }}>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-xl-6">
                                                        <div className="card" style={{ width: "100%" }}>
                                                            <div className={this.state.amountOfFreelancers === "ONE-FREELANCER-REQUIRED" ? "card-header header" : "card-header blue-header"}>
                                                                ONE Freelancer Required
                                                            </div>
                                                            <div className="card-body">
                                                                
                                                                <p className="card-text">Only ONE freelancer is required for this specific job</p>
                                                                <button onClick={() => {
                                                                    this.setState({
                                                                        amountOfFreelancers: "ONE-FREELANCER-REQUIRED"
                                                                    })
                                                                }} className={this.state.amountOfFreelancers === "ONE-FREELANCER-REQUIRED" ? "btn btn-dark" : "btn two-red"} style={{ color: "white" }}>Select Option</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-xl-6">
                                                    <div className="frb-group">
                                                        <div className="card" style={{ width: "100%" }}>
                                                            <div className={this.state.amountOfFreelancers === "MULTIPLE-FREELANCERS-REQUIRED" ? "card-header header" : "card-header blue-header"}>
                                                                Multiple Freelancer Are Required (More than 1)
                                                            </div>
                                                            <div className="card-body">
                                                               
                                                                <p className="card-text">Multiple freelancers are required for this job - this is useful if you want to build a team</p>
                                                                <Slider
                                                                    value={this.state.volume}
                                                                    orientation="horizontal"
                                                                    onChange={this.handleOnChange} 
                                                                    min={2}
                                                                    max={20}
                                                                />
                                                               {this.state.volume !== 0 ?  <button onClick={() => {
                                                                    this.setState({
                                                                        amountOfFreelancers: "MULTIPLE-FREELANCERS-REQUIRED"
                                                                    })
                                                                }} className={this.state.amountOfFreelancers === "MULTIPLE-FREELANCERS-REQUIRED" ? "btn btn-dark" : "btn two-red"} style={{ color: "white" }}>Select Option</button> : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>

                                            </div>        
                                            <hr className="black-line" />
                                            <div className="container">
                                                <div className="row" style={{ marginTop: "30px" }}>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xl-12">
                                                    <label className="header">Talent Type</label>
                                                        <select className="form-control" onChange={(e) => {
                                                            this.setState({
                                                                companyOrNo: e.target.value
                                                            })
                                                        }}>
                                                            <option value="---select a value---">---select a value---</option>
                                                            <option value="doesnt-matter">Doesn't Matter</option>
                                                            <option value="individual">Individual</option>
                                                            <option value="agency">Agency</option>
                                                        </select>
                                                    </div>

                                                </div>  
                                                <div className="row" style={{ marginTop: "30px" }}>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xl-12">
                                                    <label className="header">Job Success Score</label>
                                                        <select className="form-control" onChange={(e) => {
                                                            this.setState({
                                                                successScore: e.target.value
                                                            })
                                                        }}>
                                                            <option value="---select a value---">---select a value---</option>
                                                            <option value="doesnt-matter">Doesn't Matter</option>
                                                            <option value="80%+">80%+</option>
                                                            <option value="90%+">90%+</option>
                                                            <option value="Any-job-success">ANY Job Success</option>
                                                        </select>
                                                    </div>

                                                </div>   
                                                <div className="row" style={{ marginTop: "30px" }}>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xl-12">
                                                    <label className="header">Amount Earned</label>
                                                        <select className="form-control" onChange={(e) => {
                                                            this.setState({
                                                                amountEarned: e.target.value
                                                            })
                                                        }}>
                                                            <option value="---select a value---">---select a value---</option>
                                                            <option value="doesnt-matter">Doesn't Matter</option>
                                                            <option value="$100+">$100+</option>
                                                            <option value="$1,000+">$1,000+</option>
                                                            <option value="$5,000+">$5,000+</option>
                                                            <option value="$10,000+">$10,000+</option>
                                                        </select>
                                                    </div>

                                                </div>  
                                                
                                                
                                            </div>
                                        <div className="col-xl-12">
                                            <button onClick={() => {
                                                console.log("clicked.")
                                                this.props.history.push("/signup/business/page/4");
                                            }} className="button custom-btn red-btn ripple-effect big margin-top-30">Back to previous page</button>
                                        </div>

                                        <div className="col-xl-12">
                                            <button style={{ width: "100%" }} onClick={this.handleSubmission} className="button blue-btn ripple-effect big margin-top-30">Continue to next page </button>
                                        </div>
                                        
                                            
                                        </div>
                                        
                                    </div>

                                   
                                    
                                </div>
                        
                                <div className="dashboard-footer-spacer"></div>
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
                unique_id: state.signup_completed.id,
                username: state.auth.authenticated.username
            }
        }
    }
}
export default withRouter(connect(mapStateToProps, {  })(VisibilityHelperBusinessSignup));
