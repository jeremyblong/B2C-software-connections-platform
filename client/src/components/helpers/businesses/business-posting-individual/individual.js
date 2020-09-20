import React, { Component, Fragment } from 'react';
import "./style.css";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import FileViewer from 'react-file-viewer';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class BusinessPostingsIndividual extends Component {
constructor(props) {
    super(props)
    
}
    onError(e) {
        console.log(e);
    }
    renderButtonOrNot = () => {
        // {passedData.responses ? passedData.responses.map((response, index) => {
            // if (response.sender === this.props.username) {
            //     return null;
            // } else if (response.sender !== this.props.username) {
            //     return (
            //         <Fragment>
            //             <Link to={{pathname: "/freelancer/place/bid/company/listing", data: { data: this.props.job.job }}} class="apply-now-button red-btn popup-with-zoom-anim">Apply Now <i class="icon-material-outline-arrow-right-alt"></i></Link>
            //         </Fragment>
            //     );
            // }
        // }) : null}
        const passedData = this.props.job ? this.props.job.job : null;

        let found = false;

        if (passedData.responses) {
            for (let index = 0; index < passedData.responses.length; index++) {
                const response = passedData.responses[index];
                console.log(response.sender, this.props.username);
                if (response.sender === this.props.username) {
                    found = true;
                }
            }
            if (found === true) {
                return null;
            } else {
                return (
                    <Fragment>
                        <Link to={{pathname: "/freelancer/place/bid/company/listing", data: { data: this.props.job.job }}} class="apply-now-button red-btn popup-with-zoom-anim">Apply Now <i class="icon-material-outline-arrow-right-alt"></i></Link>
                    </Fragment>
                );
            }
        } else {
            return (
                <Fragment>
                    <Link to={{pathname: "/freelancer/place/bid/company/listing", data: { data: this.props.job.job }}} class="apply-now-button red-btn popup-with-zoom-anim">Apply Now <i class="icon-material-outline-arrow-right-alt"></i></Link>
                </Fragment>
            );
        }
    }
    renderContent = () => {
        const passedData = this.props.job ? this.props.job.job : null;

        const Map = ReactMapboxGl({
            accessToken:
              'pk.eyJ1IjoiamVyZW15YWJsb25nIiwiYSI6ImNrNzIzemZ6cDA3Mm8zbWxncW5pZDkzeDkifQ.jeLgR1gLLJsaeyfjBUqrdw'
        });

        console.log("passedData :", passedData);

        let alreadyApplied = false;

        if (passedData !== null) {
            return (
                <div>
                    <div class="single-page-header" data-background-image="/images/single-job.jpg">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="single-page-header-inner">
                                        <div class="left-side">
                                        
                                            <div class="header-image"><a><img src="/images/company-logo-03a.png" alt=""/></a></div>
                                            <div class="header-details">
                                                <h3 className="text-white bold">{passedData.title}</h3>
                                                <h5 className="text-white">Required experience level: <strong style={{ color: "blue" }}>{passedData.experience_level}</strong></h5>
                                                <ul>
                                                    <li><a style={{ color: "black", fontWeight: "bold" }}>{passedData.category}</a></li>
                                                    <li><div class="star-rating" data-rating="4.9"></div></li>
                                                    <li style={{ color: "black", fontWeight: "bold" }}>Location Preference: {passedData.location_preference}</li>
                                                    <li><div class="verified-badge-with-title">Verified</div></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="right-side">
                                            <div class="salary-box">
                                                <div class="salary-type">Billing Rate: <strong style={{ color: "blue" }}>{passedData.billing.rate}</strong></div>
                                                <div class="salary-amount">{`$${passedData.billing.pay} ${passedData.billing.currency}`}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    
                    <div class="container">
                        <div class="row">
                        
                            <div class="col-xl-8 col-lg-8 content-right-offset">

                                <div class="single-page-section">
                                    <h3 class="margin-bottom-25">Job Description</h3>
                                    <p>{passedData.description}</p>
                                    <hr className="black-line" />
                                    <label className="text-center" style={{ color: "blue" }}>Types of development sought out after...</label>
                                    <ul class="list-2">
                                        {passedData.type_of_development ? passedData.type_of_development.map((type, index) => {
                                            return <li>{type.label}</li>;
                                        }) : null}
                                    </ul>
                                    {passedData.additional_skills.length !== 0 ? <Fragment><label className="text-center" style={{ color: "blue" }}>Additional skills desired...</label>
                                    <ul class="list-2">
                                        {passedData.additional_skills ? passedData.additional_skills.map((item, index) => {
                                            return <li>{item.value}</li>;
                                        }) : null}
                                    </ul></Fragment> : null}


                                    {passedData.platform.length !== 0 ? <Fragment><label className="text-center" style={{ color: "blue" }}>Platforms</label>
                                    <ul class="list-2">
                                        {passedData.platform ? passedData.platform.map((item, index) => {
                                            return <li>{item.label}</li>;
                                        }) : null}
                                    </ul></Fragment> : null}

                                    {passedData.preferred_state_timezone ? <Fragment><label className="text-center" style={{ color: "blue" }}>Perferred timezone</label>
                                    <ul class="list-2">
                                        <li>{passedData.preferred_state_timezone}</li>
                                    </ul></Fragment> : null}
                                    {passedData.preferred_country ? <Fragment><label className="text-center" style={{ color: "blue" }}>Perferred location</label>
                                    <ul class="list-2">
                                        <li>{passedData.preferred_country}</li>
                                    </ul></Fragment> : null}
                                    
                                    <div class="card" style={{ width: "100%", marginTop: "40px" }}>
                                        <div class="card-header blue-text">
                                            Visibility Preferences
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item"><strong style={{ color: "blue" }}>Agency Or Individual:</strong> {passedData.visibility.agency_or_individual}</li>
                                            <li class="list-group-item"><strong style={{ color: "blue" }}>Required Freelancers:</strong> {passedData.visibility.amount_of_freelancers_required}</li>
                                            <li class="list-group-item"><strong style={{ color: "blue" }}>Minimum Earning Record:</strong> {passedData.visibility.minimum_amount_earned}</li>
                                            <li class="list-group-item"><strong style={{ color: "blue" }}>Public Visibility: </strong> {passedData.visibility.visibility}</li>
                                            <li class="list-group-item"><strong style={{ color: "blue" }}>Minimum Success Score:</strong> {passedData.visibility.minimum_success_score}</li>
                                        </ul>
                                        </div>
                                </div>

                                <div class="single-page-section">
                                    <h3 class="margin-bottom-30">Location</h3>
                                    <div id="single-job-map-container">
                                    <Map 
                                        style="mapbox://styles/mapbox/streets-v9"
                                        containerStyle={{
                                            height: '300px',
                                            width: '100%'
                                        }}
                                        >
                                        
                                        <a href="#" id="streetView">Street View</a>
                                    </Map>
                                        
                                    </div>
                                </div>

                                <div class="single-page-section">
                                    <h3 class="margin-bottom-25">Similar Jobs</h3>

                            
                                    <div class="listings-container grid-layout">

                                        
                                            <a href="#" class="job-listing">

                                        
                                                <div class="job-listing-details">
                                                
                                                    <div class="job-listing-company-logo">
                                                        <img src="/images/company-logo-02.png" alt=""/>
                                                    </div>

                                                
                                                    <div class="job-listing-description">
                                                        <h4 class="job-listing-company">Coffee</h4>
                                                        <h3 class="job-listing-title">Barista and Cashier</h3>
                                                    </div>
                                                </div>

                            
                                                <div class="job-listing-footer">
                                                    <ul>
                                                        <li><i class="icon-material-outline-location-on"></i> San Francisco</li>
                                                        <li><i class="icon-material-outline-business-center"></i> Full Time</li>
                                                        <li><i class="icon-material-outline-account-balance-wallet"></i> $35000-$38000</li>
                                                        <li><i class="icon-material-outline-access-time"></i> 2 days ago</li>
                                                    </ul>
                                                </div>
                                            </a>

                                            <a href="#" class="job-listing">

                                            
                                                <div class="job-listing-details">
                                            
                                                    <div class="job-listing-company-logo">
                                                        <img src="/images/company-logo-03.png" alt=""/>
                                                    </div>

                                                
                                                    <div class="job-listing-description">
                                                        <h4 class="job-listing-company">King <span class="verified-badge" title="Verified Employer" data-tippy-placement="top"></span></h4>
                                                        <h3 class="job-listing-title">Restaurant Manager</h3>
                                                    </div>
                                                </div>

                                        
                                                <div class="job-listing-footer">
                                                    <ul>
                                                        <li><i class="icon-material-outline-location-on"></i> San Francisco</li>
                                                        <li><i class="icon-material-outline-business-center"></i> Full Time</li>
                                                        <li><i class="icon-material-outline-account-balance-wallet"></i> $35000-$38000</li>
                                                        <li><i class="icon-material-outline-access-time"></i> 2 days ago</li>
                                                    </ul>
                                                </div>
                                            </a>
                                        </div>
                                    

                                    </div>
                            </div>
                            

                        
                            <div class="col-xl-4 col-lg-4">
                                <div class="sidebar-container">
                                    {this.renderButtonOrNot()}
                                    {/* {this.props.accountType === "freelancer" && alreadyApplied === false ? <Link to={{pathname: "/freelancer/place/bid/company/listing", data: { data: this.props.job.job }}} class="apply-now-button red-btn popup-with-zoom-anim">Apply Now <i class="icon-material-outline-arrow-right-alt"></i></Link> : null}                                         */}
                            
                                    <div class="sidebar-widget">
                                        <div class="job-overview">
                                            <div class="job-overview-headline">Job Summary</div>
                                            <div class="job-overview-inner">
                                                <ul>
                                                    <li>
                                                        <i class="icon-material-outline-location-on"></i>
                                                        <span>Ideal Partner Location</span>
                                                        <h5>{passedData.location_preference}</h5>
                                                    </li>
                                                    <li>
                                                        <i class="icon-material-outline-business-center"></i>
                                                        <span>Job Type</span>
                                                        <h5>{passedData.length_of_project}</h5>
                                                    </li>
                                                    <li>
                                                        <i class="icon-material-outline-local-atm"></i>
                                                        <span>{passedData.billing.rate}</span>
                                                        <h5>{`$${passedData.billing.pay} ${passedData.billing.currency}`}</h5>
                                                    </li>
                                                    <li>
                                                        <i class="icon-material-outline-access-time"></i>
                                                        <span>Date Posted</span>
                                                        <h5>{passedData.date}</h5>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                
                                    <div class="sidebar-widget">
                                        <h3>Bookmark or Share</h3>

                            
                                        <button class="bookmark-button margin-bottom-25">
                                            <span class="bookmark-icon"></span>
                                            <span class="bookmark-text">Bookmark</span>
                                            <span class="bookmarked-text">Bookmarked</span>
                                        </button>

                        
                                        <div class="copy-url">
                                            <input id="copy-url" type="text" value="" class="with-border"/>
                                            <button class="copy-url-button ripple-effect" data-clipboard-target="#copy-url" title="Copy to Clipboard" data-tippy-placement="top"><i class="icon-material-outline-file-copy"></i></button>
                                        </div>

                                
                                        <div class="share-buttons margin-top-25">
                                            <div class="share-buttons-trigger"><i class="icon-feather-share-2"></i></div>
                                            <div class="share-buttons-content">
                                                <span>Interesting? <strong>Share It!</strong></span>
                                                <ul class="share-buttons-icons">
                                                    <li><a href="#" data-button-color="#3b5998" title="Share on Facebook" data-tippy-placement="top"><i class="icon-brand-facebook-f"></i></a></li>
                                                    <li><a href="#" data-button-color="#1da1f2" title="Share on Twitter" data-tippy-placement="top"><i class="icon-brand-twitter"></i></a></li>
                                                    <li><a href="#" data-button-color="#dd4b39" title="Share on Google Plus" data-tippy-placement="top"><i class="icon-brand-google-plus-g"></i></a></li>
                                                    <li><a href="#" data-button-color="#0077b5" title="Share on LinkedIn" data-tippy-placement="top"><i class="icon-brand-linkedin-in"></i></a></li>
                                                </ul>
                                            </div>
                                            {passedData.attachedFiles ? passedData.attachedFiles.map((file, index) => {
                                                return (
                                                    <a style={{ color: "white", marginTop: "10px", marginBottom: "10px" }} href={`https://s3.us-west-1.wasabisys.com/software-gateway-platform/${file.picture}`} className="btn blue-btn" download>Click to download attached file</a>
                                                );
                                            }) : null}
                                            
                                            
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            );
        } else {
            return null;
        }
    }
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}
const mapStateToProps = state => {
    for (const key in state.auth) {
      const obj = state.auth;
      if (obj.authenticated && (obj.authenticated.hasOwnProperty("email"))) {
        return {
          accountType: state.auth.authenticated.accountType,
          username: state.auth.authenticated.username
        }
      } 
    }
  }
export default connect(mapStateToProps, { })(BusinessPostingsIndividual);