import React, { Component } from 'react';
import "./style.css";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { NotificationManager} from 'react-notifications';

class FifthProfileLanguageSelectionHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        otherLanguages: "",
        speakingLevel: ""
    }
}   
    handleSubmission = () => {
        console.log("submitted.", this.props.username);

        const { speakingLevel, otherLanguages } = this.state;

        if (speakingLevel.length > 0 && otherLanguages.length > 0) {
            axios.post("/profile/build/freelancer/languages", {
                native: speakingLevel,
                secondary: otherLanguages,
                username: this.props.username
            }).then((res) => {
                if (res.data.message === "Successfully updated account!") {
                    console.log(res.data);
                    this.props.history.push("/signup/freelancer/page/5");
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            NotificationManager.error('Please fill out both fields - if you only speak english please enter "Not Applicable" in secondary languages...', 'An Error Occurred', 7000);
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
                                    <h3 className="text-left">Language(s)</h3>

                                    
                                    <nav id="breadcrumbs" class="dark">
                                        <ul>
                                            <li>Home</li>
                                            <li>Expertise</li>
                                            <li>Level Of Expertise</li>
                                            <li>Education</li>
                                            <li>Employment</li>
                                            <li style={{ color: "red" }}>Languages</li>
                                            <li>Hourly Rate</li>
                                            <li>Location</li>
                                        
                                        </ul>
                                    </nav>
                                </div>

                        
                                <div class="row">

                                    
                                    <div class="col-xl-12">
                                        <div class="dashboard-box margin-top-0">

                                        
                                            <div class="headline">
                                                <h3><i class="icon-feather-folder-plus"></i>Language Selection</h3>
                                            </div>

                                            <div style={{ minHeight: "400px" }} class="content with-padding padding-bottom-10">
                                                <div class="row">

                                                    <div style={{ marginTop: "30px" }} class="col-xl-6">
                                                        <div class="submit-field">
                                                            <h5>English Proficiency</h5>
                                                            <select class="form-control adjust-select" onChange={(e) => {
                                                                this.setState({
                                                                    speakingLevel: e.target.value
                                                                })
                                                            }} data-size="7" title="Select Category">
                                                                <option value={"----"}>----- Select a value ---- </option>
                                                                <option value={"basic"}>Basic - I write in this language decently</option>
                                                                <option value={"conversational"}>Conversational - I write and speak this language well</option>
                                                                <option value={"fluent"}>Fluent - I write and speak this language almost perfectly</option>
                                                                <option value={"native"}>Native or Bilingual - I write and speak this language perfectly, including colloquialisms</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                

                                                    <div class="col-xl-6 col-sm-12 col-xs-12">
                                                    <h5 style={{ fontSize: "16px", marginTop: "25px", marginBottom: "15px" }}>What other <strong>secondary</strong> languages do you speak? <i class="help-icon"></i></h5>
                                                            
                                                        <input onChange={(e) => {
                                                            this.setState({
                                                                otherLanguages: e.target.value
                                                            })
                                                        }} placeholder={"English, Spanish, French, German, etc..."} className="form-group" style={{ width: "100%" }} type="text"  />
                                                    </div>
                                                </div>
                                            
                                                
                                                
                                            </div>
                                            
                                        </div>
                                        
                                    </div>

                                    <div class="col-xl-12">
                                        <button onClick={() => {
                                            console.log("clicked.")
                                            this.props.history.push("/signup/freelancer/page/3");
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
export default withRouter(connect(mapStateToProps, {  })(FifthProfileLanguageSelectionHelper));