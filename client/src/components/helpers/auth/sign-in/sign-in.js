import React, { Component } from 'react';
import "./style.css";
import { Link, withRouter } from "react-router-dom";
import { authentication } from "../../../../actions/auth/auth.js";
import { connect } from "react-redux";
import axios from "axios";

class SignInHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {

    }
}
    handleSubmission = (e) => {
        e.preventDefault();

        const { email, password } = this.state;
        
        console.log("submitted...", this.state);

        axios.post("/login", {
            email,
            password
        }).then((res) => {
            switch (res.data.message) {
                case "User FOUND!":
                        console.log(res.data);   

                        this.props.authentication(res.data.user);

                        localStorage.setItem("token", res.data.token);

                        setTimeout(() => {
                            this.props.history.push("/");
                        }, 750);
                    break;
                case "Password/email did match our records...":
                    alert(res.data.message);        
                    break;
                default:
                    break;
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    render() {
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                <div id="titlebar" className="gradient">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">

                                    <h2 className="text-left">Log In</h2>
                                    <nav id="breadcrumbs" className="dark">
                                        <ul>
                                            <li><a href="#">Home</a></li>
                                            <li>Log In</li>
                                        </ul>
                                    </nav>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-5 offset-xl-3">


                                <div className="login-register-page">
                                    <div className="welcome-text">
                                        <h3>We're glad to see you again!</h3>
                                        <span>Don't have an account? <Link to="/register">Sign Up!</Link></span>
                                    </div>
                                    
                                    <form onSubmit={this.handleSubmission} id="login-form">
                                        <div className="input-with-icon-left">
                                            <i className="icon-material-baseline-mail-outline"></i>
                                            <input onChange={(e) => {
                                                this.setState({
                                                    email: e.target.value
                                                })
                                            }} type="text" className="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Email Address" required/>
                                        </div>

                                        <div className="input-with-icon-left">
                                            <i className="icon-material-outline-lock"></i>
                                            <input onChange={(e) => {
                                                this.setState({
                                                    password: e.target.value
                                                })
                                            }} type="password" className="input-text with-border" name="password" id="password" placeholder="Password" required/>
                                        </div>
                                        <a href="#" className="forgot-password">Forgot Password?</a>
                                    </form>
                                    <button className="button full-width button-sliding-icon ripple-effect margin-top-10 blue-btn" type="submit" form="login-form">Log In <i className="icon-material-outline-arrow-right-alt"></i></button>
                                    <div className="social-login-separator"><span>or</span></div>
                                    <div className="social-login-buttons">
                                        <button className="facebook-login ripple-effect"><i className="icon-brand-facebook-f"></i> Log In via Facebook</button>
                                        <button className="google-login ripple-effect"><i className="icon-brand-google-plus-g"></i> Log In via Google+</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                <div className="margin-top-70"></div>
            </div>
        )
    }
}
export default withRouter(connect(null, { authentication })(SignInHelper));