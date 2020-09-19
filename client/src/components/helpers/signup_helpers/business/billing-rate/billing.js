import React, { Component } from 'react';
import "./style.css";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import Slider from 'react-rangeslider';
import { NotificationManager } from 'react-notifications';


class BusinessSignupBillingSetupHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        volumeFixedPrice: null,
        volumeHourlyPrice: null,
        hourly: false,
        fixed: false,
        timeline: ""
    }
}   
    handleSubmission = () => {
        console.log("submitted.", this.props.username);

        const { timeline, volumeFixedPrice, volumeHourlyPrice } = this.state;

        if (timeline.length > 0 && (volumeFixedPrice !== null || volumeHourlyPrice !== null)) {
            axios.post("/business/signup/billing/rate/update", {
                username: this.props.username,
                fixed_project_cost: volumeFixedPrice !== null ? volumeFixedPrice : null,
                hourly_project_cost: volumeHourlyPrice !== null ? volumeHourlyPrice : null
            }).then((res) => {
                if (res.data.message === "Successfully edited and posted new information to users profile!") {
    
                    console.log(res.data);

                    this.props.history.push("/signup/business/page/7");
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            NotificationManager.error('Please complete each field including hourly/fixed pay & timeline...', 'ERROR', 7000);
        }
    }
    handleOnChangeFixed = (value) => {
        this.setState({
            volumeFixedPrice: Number(value),
            volumeHourlyPrice: null
        })
    }
    handleOnChangeHourly = (value) => {
        this.setState({
            volumeHourlyPrice: Number(value),
            volumeFixedPrice: null
        })
    }
    convert = (data) => {
        console.log("Data", data);
        return `$${data} USD`;
    }
    convertFixed = (data) => {
        return `$${data} USD`;
    }
    renderClickCardOne = () => {

        console.log("renderClickCardOne");

        this.setState({
            timeline: "MORE-THAN-6-MONTHS",
            oneClicked: true,
            twoClicked: false,
            threeClicked: false,
            fourClicked: false
        })
    }
    renderClickCardTwo = () => {

        console.log("renderClickCardTwo");

        this.setState({
            timeline: "3-6 MONTHS",
            oneClicked: false,
            twoClicked: true,
            threeClicked: false,
            fourClicked: false
        })
    }
    renderClickCardThree = () => {

        console.log("renderClickCardThree");

        this.setState({
            timeline: "1-3 MONTHS",
            oneClicked: false,
            twoClicked: false,
            threeClicked: true,
            fourClicked: false
        })
    }
    renderClickCardFour = () => {

        console.log("renderClickCardFour");

        this.setState({
            timeline: "LESS-THAN-1-MONTH",
            oneClicked: false,
            twoClicked: false,
            threeClicked: false,
            fourClicked: true
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
                                            <li>Title</li>
                                            <li>Description</li>
                                            <li>Details</li>
                                            <li>Expertise</li>
                                            <li>Location</li>
                                            <li>Visibility</li>
                                            <li style={{ color: "red" }}>Budget</li>
                                            <li>Review</li>
                                            
                                        </ul>
                                    </nav>
                                </div>

                        
                                <div class="row">

                                    
                                    <div class="col-xl-12">
                                        <div class="dashboard-box margin-top-0">

                                        
                                        <div className="content with-padding padding-bottom-10">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-xl-6">
                                                    <div className="frb-group">
                                                        <div className="card" style={{ width: "100%" }}>
                                                            <div className={this.state.hourlyOrFixed === "HOURLY" ? "card-header header" : "card-header blue-header"}>
                                                                Pay by the hour
                                                            </div>
                                                            <div className="card-body">
                                                               
                                                                <p className="card-text">Pay hourly to easily scale up and down.</p>
                                                                <Slider
                                                                    value={this.state.volumeHourlyPrice}
                                                                    orientation="horizontal"
                                                                    onChange={this.handleOnChangeHourly} 
                                                                    format={this.convert}
                                                                    min={15}
                                                                    max={150}
                                                                />
                                                               {this.state.volumeHourlyPrice !== null ?  <button onClick={() => {
                                                                    this.setState({
                                                                        hourlyOrFixed: "HOURLY",
                                                                        volumeFixedPrice: null
                                                                    })
                                                                }} className={this.state.hourlyOrFixed === "HOURLY" ? "btn btn-dark" : "btn two-red"} style={{ color: "white" }}>Select Option</button> : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-xl-6">
                                                    <div className="frb-group">
                                                        <div className="card" style={{ width: "100%" }}>
                                                            <div className={this.state.hourlyOrFixed === "FIXED-PRICE" ? "card-header header" : "card-header blue-header"}>
                                                                Pay a fixed price
                                                            </div>
                                                            <div className="card-body">
                                                               
                                                                <p className="card-text">Define payment before work begins and pay only when work is delivered.</p>
                                                                <Slider
                                                                    value={this.state.volumeFixedPrice}
                                                                    orientation="horizontal"
                                                                    onChange={this.handleOnChangeFixed} 
                                                                    format={this.convertFixed}
                                                                    min={500}
                                                                    step={100}
                                                                    max={10000}
                                                                />
                                                               {this.state.volumeFixedPrice !== null ?  <button onClick={() => {
                                                                    this.setState({
                                                                        hourlyOrFixed: "FIXED-PRICE",
                                                                        volumeHourlyPrice: null
                                                                    })
                                                                }} className={this.state.hourlyOrFixed === "FIXED-PRICE" ? "btn btn-dark" : "btn two-red"} style={{ color: "white" }}>Select Option</button> : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                              
                                            
                                            </div>
                                            <div className="row" style={{ marginTop: "40px" }}>
                                                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 col-xl-3">
                                                    <div className="frb-group">
                                                        <div className="card" onClick={this.renderClickCardOne} style={{ width: "100%" }}>
                                                            <div className={this.state.oneClicked === true ? "card-header header-two" : "card-header blue-header"}>
                                                                More than 6 months
                                                            </div>
                                                            <div className={this.state.oneClicked === true ? "custom-body card-body" : "card-body"}>
                                                               
                                                                <p className="card-text">Your project will take at least 6 months to complete</p>
                                                                
                                                               
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 col-xl-3">
                                                    <div className="frb-group">
                                                        <div className="card" onClick={this.renderClickCardTwo} style={{ width: "100%" }}>
                                                            <div className={this.state.twoClicked === true ? "card-header header-two" : "card-header blue-header"}>
                                                                3 - 6 Months
                                                            </div>
                                                            <div className={this.state.twoClicked === true ? "custom-body card-body" : "card-body"}>
                                                               
                                                                <p className="card-text">Estimated completion timeline is between 3 - 6 months </p>
                                                                
                                                               
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 col-xl-3">
                                                    <div className="frb-group">
                                                        <div className="card" onClick={this.renderClickCardThree} style={{ width: "100%" }}>
                                                            <div className={this.state.threeClicked === true ? "card-header header-two" : "card-header blue-header"}>
                                                                1 - 3 Months
                                                            </div>
                                                            <div className={this.state.threeClicked === true ? "custom-body card-body" : "card-body"}>
                                                               
                                                                <p className="card-text">This is a simple project still with some complexity.</p>
                                                                
                                                               
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 col-xl-3">
                                                    <div className="frb-group">
                                                        <div className="card" onClick={this.renderClickCardFour} style={{ width: "100%" }}>
                                                            <div className={this.state.fourClicked === true ? "card-header header-two" : "card-header blue-header"}>
                                                                Less Than 1 Month
                                                            </div>
                                                            <div className={this.state.fourClicked === true ? "custom-body card-body" : "card-body"}>
                                                               
                                                                <p className="card-text">This is a very short/easy project to complete.</p>
                                                                
                                                               
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
                                            this.props.history.push("/signup/freelancer/page/5");
                                        }} class="button btn-danger red-btn stretch-mobile ripple-effect big margin-top-30">Back to previous page</button>
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
export default withRouter(connect(mapStateToProps, { })(BusinessSignupBillingSetupHelper));