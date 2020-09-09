import React, { Component } from 'react';
import "./style.css";

class FeaturedJobsHelper extends Component {
    render() {
        return (
            <div>
                <div className="section gray margin-top-45 padding-top-65 padding-bottom-75">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="section-headline margin-top-0 margin-bottom-35">
                                    <h3>Featured Jobs</h3>
                                    <a href="jobs-list-layout-full-page-map.html" className="headline-link">Browse All Jobs</a>
                                </div>
                                <div className="listings-container compact-list-layout margin-top-35">
                                    <a href="/" className="job-listing with-apply-button">
                                        <div className="job-listing-details">
                                            <div className="job-listing-company-logo">
                                                <img src="/images/company-logo-01.png" alt="" />
                                            </div>
                                            <div className="job-listing-description">
                                                <h3 className="job-listing-title">Bilingual Event Support Specialist</h3>
                                                <div className="job-listing-footer">
                                                    <ul>
                                                        <li><i className="icon-material-outline-business"></i> Hexagon <div className="verified-badge" title="Verified Employer" data-tippy-placement="top"></div></li>
                                                        <li><i className="icon-material-outline-location-on"></i> San Francissco</li>
                                                        <li><i className="icon-material-outline-business-center"></i> Full Time</li>
                                                        <li><i className="icon-material-outline-access-time"></i> 2 days ago</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <span className="list-apply-button ripple-effect">Apply Now</span>
                                        </div>
                                    </a>	
                                    <a href="/" className="job-listing with-apply-button">
                                        <div className="job-listing-details">
                                            <div className="job-listing-company-logo">
                                                <img src="/images/company-logo-05.png" alt=""/>
                                            </div>
                                            <div className="job-listing-description">
                                                <h3 className="job-listing-title">Competition Law Officer</h3>
                                                <div className="job-listing-footer">
                                                    <ul>
                                                        <li><i className="icon-material-outline-business"></i> Laxo</li>
                                                        <li><i className="icon-material-outline-location-on"></i> San Francissco</li>
                                                        <li><i className="icon-material-outline-business-center"></i> Full Time</li>
                                                        <li><i className="icon-material-outline-access-time"></i> 2 days ago</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <span className="list-apply-button ripple-effect">Apply Now</span>
                                        </div>
                                    </a>
                                    <a href="/" className="job-listing with-apply-button">
                                        <div className="job-listing-details">
                                            <div className="job-listing-company-logo">
                                                <img src="/images/company-logo-02.png" alt=""/>
                                            </div>
                                            <div className="job-listing-description">
                                                <h3 className="job-listing-title">Barista and Cashier</h3>
                                                <div className="job-listing-footer">
                                                    <ul>
                                                        <li><i className="icon-material-outline-business"></i> Coffee</li>
                                                        <li><i className="icon-material-outline-location-on"></i> San Francissco</li>
                                                        <li><i className="icon-material-outline-business-center"></i> Full Time</li>
                                                        <li><i className="icon-material-outline-access-time"></i> 2 days ago</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <span className="list-apply-button ripple-effect">Apply Now</span>
                                        </div>
                                    </a>
                                    <a href="/" className="job-listing with-apply-button">
                                        <div className="job-listing-details">
                                            <div className="job-listing-company-logo">
                                                <img src="/images/company-logo-03.png" alt=""/>
                                            </div>
                                            <div className="job-listing-description">
                                                <h3 className="job-listing-title">Restaurant General Manager</h3>
                                                <div className="job-listing-footer">
                                                    <ul>
                                                        <li><i className="icon-material-outline-business"></i> King <div className="verified-badge" title="Verified Employer" data-tippy-placement="top"></div></li>
                                                        <li><i className="icon-material-outline-location-on"></i> San Francissco</li>
                                                        <li><i className="icon-material-outline-business-center"></i> Full Time</li>
                                                        <li><i className="icon-material-outline-access-time"></i> 2 days ago</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <span className="list-apply-button ripple-effect">Apply Now</span>
                                        </div>
                                    </a>
                                    <a href="/" className="job-listing with-apply-button">
                                        <div className="job-listing-details">
                                            <div className="job-listing-company-logo">
                                                <img src="/images/company-logo-05.png" alt=""/>
                                            </div>
                                            <div className="job-listing-description">
                                                <h3 className="job-listing-title">International Marketing Coordinator</h3>
                                                <div className="job-listing-footer">
                                                    <ul>
                                                        <li><i className="icon-material-outline-business"></i> Skyist</li>
                                                        <li><i className="icon-material-outline-location-on"></i> San Francissco</li>
                                                        <li><i className="icon-material-outline-business-center"></i> Full Time</li>
                                                        <li><i className="icon-material-outline-access-time"></i> 2 days ago</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <span className="list-apply-button ripple-effect">Apply Now</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FeaturedJobsHelper;