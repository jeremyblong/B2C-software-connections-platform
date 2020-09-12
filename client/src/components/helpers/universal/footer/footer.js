import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./style.css";

class FooterFooter extends Component {
    render() {
        return (
            <div>
                <div id="footer">
                    <div className="footer-top-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="footer-rows-container">
                                        <div className="footer-rows-left">
                                            <div className="footer-row">
                                                <div className="footer-row-inner footer-logo">
                                                    {/* logo goes here... */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="footer-rows-right">
                                            <div className="footer-row">
                                                <div className="footer-row-inner">
                                                    <ul className="footer-social-links">
                                                        <li>
                                                            <a href="#" title="Facebook" data-tippy-placement="bottom" data-tippy-theme="light">
                                                                <i className="icon-brand-facebook-f"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" title="Twitter" data-tippy-placement="bottom" data-tippy-theme="light">
                                                                <i className="icon-brand-twitter"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" title="Google Plus" data-tippy-placement="bottom" data-tippy-theme="light">
                                                                <i className="icon-brand-google-plus-g"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" title="LinkedIn" data-tippy-placement="bottom" data-tippy-theme="light">
                                                                <i className="icon-brand-linkedin-in"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <div className="clearfix"></div>
                                                </div>
                                            </div>
                                            <div className="footer-row">
                                                <div className="footer-row-inner">
                                                    <select className="selectpicker language-switcher" data-selected-text-format="count" data-size="5">
                                                        <option selected>English</option>
                                                        <option>Français</option>
                                                        <option>Español</option>
                                                        <option>Deutsch</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-middle-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-2 col-lg-2 col-md-3">
                                    <div className="footer-links">
                                        <h3>For Candidates</h3>
                                        <ul>
                                            <li><a href="#"><span>Browse Jobs</span></a></li>
                                            <li><a href="#"><span>Add Resume</span></a></li>
                                            <li><a href="#"><span>Job Alerts</span></a></li>
                                            <li><a href="#"><span>My Bookmarks</span></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-2 col-md-3">
                                    <div className="footer-links">
                                        <h3>For Employers</h3>
                                        <ul>
                                            <li><a href="#"><span>Browse Candidates</span></a></li>
                                            <li><a href="#"><span>Post a Job</span></a></li>
                                            <li><a href="#"><span>Post a Task</span></a></li>
                                            <li><a href="#"><span>Plans & Pricing</span></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-2 col-md-3">
                                    <div className="footer-links">
                                        <h3>Helpful Links</h3>
                                        <ul>
                                            <li><Link to="/contact"><span>Contact</span></Link></li>
                                            <li><a href="#"><span>Privacy Policy</span></a></li>
                                            <li><a href="#"><span>Terms of Use</span></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-2 col-md-3">
                                    <div className="footer-links">
                                        <h3>Account</h3>
                                        <ul>
                                            <li><a href="#"><span>Log In</span></a></li>
                                            <li><a href="#"><span>My Account</span></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12">
                                    <h3><i className="icon-feather-mail"></i> Sign Up For a Newsletter</h3>
                                    <p>Weekly breaking news, analysis and cutting edge advices on job searching.</p>
                                    <form action="#" method="get" className="newsletter">
                                        <input type="text" name="fname" placeholder="Enter your email address"/>
                                        <button type="submit"><i className="icon-feather-arrow-right"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    © 2019 <strong>[Company Name Here...]</strong>. All Rights Reserved.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
        )
    }
}
export default FooterFooter;