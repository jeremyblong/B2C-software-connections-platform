import React, { Component } from 'react';
import "./style.css";
import { Link } from "react-router-dom";

class SignInHelper extends Component {
    render() {
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                <div id="titlebar" class="gradient">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">

                                    <h2 className="text-left">Log In</h2>
                                    <nav id="breadcrumbs" class="dark">
                                        <ul>
                                            <li><a href="#">Home</a></li>
                                            <li>Log In</li>
                                        </ul>
                                    </nav>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-5 offset-xl-3">


                                <div class="login-register-page">
                                    <div class="welcome-text">
                                        <h3>We're glad to see you again!</h3>
                                        <span>Don't have an account? <Link to="/register">Sign Up!</Link></span>
                                    </div>
                                    
                                    <form method="post" id="login-form">
                                        <div class="input-with-icon-left">
                                            <i class="icon-material-baseline-mail-outline"></i>
                                            <input type="text" class="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Email Address" required/>
                                        </div>

                                        <div class="input-with-icon-left">
                                            <i class="icon-material-outline-lock"></i>
                                            <input type="password" class="input-text with-border" name="password" id="password" placeholder="Password" required/>
                                        </div>
                                        <a href="#" class="forgot-password">Forgot Password?</a>
                                    </form>
                                    <button class="button full-width button-sliding-icon ripple-effect margin-top-10 blue-btn" type="submit" form="login-form">Log In <i class="icon-material-outline-arrow-right-alt"></i></button>
                                    <div class="social-login-separator"><span>or</span></div>
                                    <div class="social-login-buttons">
                                        <button class="facebook-login ripple-effect"><i class="icon-brand-facebook-f"></i> Log In via Facebook</button>
                                        <button class="google-login ripple-effect"><i class="icon-brand-google-plus-g"></i> Log In via Google+</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                <div class="margin-top-70"></div>
            </div>
        )
    }
}
export default SignInHelper;