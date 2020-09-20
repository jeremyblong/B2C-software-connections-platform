import React, { Component } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import { authentication, forceSignup } from "../../../actions/auth/auth.js";
import { withRouter } from "react-router-dom";

class VerifyPhoneNumberHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        code: ""
    }
    
}
    handleSubmission = () => {
        console.log("clicked - submitted.");

        axios.post("/twilio/verify/phone/number", {
            code: this.state.code,
            username: this.props.passed.username,
            phoneNumber: this.props.passed.phoneNumber,
            sid: this.props.sid
        }).then((res) => {
            if (res.data.message === "SUCCESS!" && res.data.approved === "approved") {
                console.log(res.data);
                
                this.props.authentication(this.props.passed);

                this.props.forceSignup(true);

                setTimeout(() => {
                    this.props.history.push("/");

                    window.location.reload();
                }, 500);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        console.log(this.props);
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
               <div id="titlebar" class="gradient">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">

                                <h2>Verify</h2>

                                <nav id="breadcrumbs" class="dark">
                                    <ul>
                                        <li><a>Phone Verfication</a></li>
                                  
                                    </ul>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>

              
                <div class="container">

                    <div class="row">
                        <div class="col-xl-12">

                            <section id="not-found" class="center margin-top-50 margin-bottom-25">
                                <h2>Verify <i style={{ paddingLeft: "10px" }} class="fa fa-phone-square fa-5x"></i></h2>
                                <p>Please enter your verification code we just sent to your phone below...</p>
                            </section>

                            <div class="row">
                                <div class="col-xl-8 offset-xl-2">
                                        <div class="intro-banner-search-form not-found-search margin-bottom-50">
                                           
                                            <div class="intro-search-field ">
                                                <input onChange={(e) => {
                                                    this.setState({
                                                        code: e.target.value
                                                    })
                                                }} id="intro-keywords" type="text" placeholder="Ex. 583929" />
                                            </div>

                                            <div class="intro-search-button">
                                                <button onClick={this.handleSubmission} class="button ripple-effect">Submit Verfication Code</button>
                                            </div>
                                        </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default withRouter(connect(null, { authentication, forceSignup })(VerifyPhoneNumberHelper));