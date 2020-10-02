import React, { Component, Fragment } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

class BusinessPostingsHomepage extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        users: []
    }
}

    componentDidMount() {
        axios.post("/gather/users/job_postings/exists").then((res) => {
            if (res.data.message === "Successfully found specific users!") {
                console.log(res.data);

                this.setState({
                    users: res.data.jobs
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    addBookmark = (e, posting) => {
        // prevent redirect...
        e.preventDefault();
        // log outcome
        console.log("add bookmark...", posting, this.props.username);
        // logic goes here...
        const { username } = this.props;

        axios.post("/bookmark/business/page", {
            username,
            job_posting: posting
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        return (
            <div id="margin-adjust-two">
                <div class="full-page-container">

                    <div class="full-page-sidebar">
                        <div class="full-page-sidebar-inner">
                            <div class="sidebar-container">
                                
                              
                                <div class="sidebar-widget">
                                    <h3>Location</h3>
                                    <div class="input-with-icon">
                                        <div id="autocomplete-container">
                                            <input id="autocomplete-input" type="text" placeholder="Location"/>
                                        </div>
                                        <i class="icon-material-outline-location-on"></i>
                                    </div>
                                </div>

                                
                               
                                <div class="sidebar-widget">
                                    <h3>Keywords</h3>
                                    <div class="keywords-container">
                                        <div class="keyword-input-container">
                                            <input type="text" class="keyword-input" placeholder="e.g. job title"/>
                                            <button class="keyword-input-button ripple-effect"><i class="icon-material-outline-add"></i></button>
                                        </div>
                                        <div class="keywords-list">{/* keywords go here */}</div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                
                                 
                                <div class="sidebar-widget">
                                    <h3>Category</h3>
                                    <select class="form-control default" multiple data-selected-text-format="count" data-size="7" title="All Categories" >
                                        <option>Admin Support</option>
                                        <option>Customer Service</option>
                                        <option>Data Analytics</option>
                                        <option>Design & Creative</option>
                                        <option>Legal</option>
                                        <option>Software Developing</option>
                                        <option>IT & Networking</option>
                                        <option>Writing</option>
                                        <option>Translation</option>
                                        <option>Sales & Marketing</option>
                                    </select>
                                </div>
                                
                               
                                <div class="sidebar-widget">
                                    <h3>Job Type</h3>

                                    <div class="switches-list">
                                        <div class="switch-container">
                                            <label class="switch"><input type="checkbox" /><span class="switch-button"></span> Freelance</label>
                                        </div>

                                        <div class="switch-container">
                                            <label class="switch"><input type="checkbox" /><span class="switch-button"></span> Full Time</label>
                                        </div>

                                        <div class="switch-container">
                                            <label class="switch"><input type="checkbox" /><span class="switch-button"></span> Part Time</label>
                                        </div>

                                        <div class="switch-container">
                                            <label class="switch"><input type="checkbox" /><span class="switch-button"></span> Internship</label>
                                        </div>
                                        <div class="switch-container">
                                            <label class="switch"><input type="checkbox" /><span class="switch-button"></span> Temporary</label>
                                        </div>
                                    </div>

                                </div>

                                <div class="sidebar-widget">
                                    <h3>Salary</h3>
                                    <div class="margin-top-55"></div>

                                 
                                    <input class="range-slider" type="text" value="" data-slider-currency="$" data-slider-min="1500" data-slider-max="15000" data-slider-step="100" data-slider-value="[1500,15000]"/>
                                </div>

                         
                                <div class="sidebar-widget">
                                    <h3>Tags</h3>

                                    <div class="tags-container">
                                        <div class="tag">
                                            <input type="checkbox" id="tag1"/>
                                            <label for="tag1">front-end dev</label>
                                        </div>
                                        <div class="tag">
                                            <input type="checkbox" id="tag2"/>
                                            <label for="tag2">angular</label>
                                        </div>
                                        <div class="tag">
                                            <input type="checkbox" id="tag3"/>
                                            <label for="tag3">react</label>
                                        </div>
                                        <div class="tag">
                                            <input type="checkbox" id="tag4"/>
                                            <label for="tag4">vue js</label>
                                        </div>
                                        <div class="tag">
                                            <input type="checkbox" id="tag5"/>
                                            <label for="tag5">web apps</label>
                                        </div>
                                        <div class="tag">
                                            <input type="checkbox" id="tag6"/>
                                            <label for="tag6">design</label>
                                        </div>
                                        <div class="tag">
                                            <input type="checkbox" id="tag7"/>
                                            <label for="tag7">wordpress</label>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>

                            </div>
                            

                            
                            <div class="sidebar-search-button-container">
                                <button class="button ripple-effect">Search</button>
                            </div>
                     

                        </div>
                    </div>
                  

              
                    <div class="full-page-content-container">
                        <div class="full-page-content-inner">

                            <h3 class="page-title">Search Results</h3>

                            <div class="notify-box margin-top-15">
                                <div class="switch-container">
                                    <label class="switch"><input type="checkbox"/><span class="switch-button"></span><span class="switch-text">Turn on email alerts for this search</span></label>
                                </div>

                                <div class="sort-by">
                                    {/* <span style={{ marginLeft: "-50px" }}>Sort by:</span> */}
                                    <select class="form-control hide-tick">
                                        <option>Relevance</option>
                                        <option>Newest</option>
                                        <option>Oldest</option>
                                        <option>Random</option>
                                    </select>
                                </div>
                            </div>

                            <div class="listings-container grid-layout margin-top-35">
                            {this.state.users.length !== 0 ? this.state.users.map((job, index) => {
                                if (job) {
                                    console.log("USER~!:", job);
                                    return (
                                        <Fragment>
                                            <Link to={{pathname: `/business/individual/listing/${job.id}`, data: { job }}} className="job-listing add-backdrop">

                                                <div class="job-listing-details">
                                                
                                                    <div class="job-listing-company-logo">
                                                        <img src="/images/company-logo-01.png" alt=""/>
                                                    </div>

                                                
                                                    <div class="job-listing-description">
                                                        <h4 class="job-listing-company">{job.category} <span class="verified-badge" title="Verified Employer" data-tippy-placement="top"></span></h4>
                                                        <h3 class="job-listing-title">{job.title.slice(0, 55)}{job.title.length > 55 ? "..." : null}</h3>
                                                    </div>
                                                </div>

                                            
                                                <div class="job-listing-footer">
                                                    <div onClick={(e) => {
                                                        this.addBookmark(e, job);
                                                    }}>
                                                        <span class="bookmark-icon"></span>
                                                    </div>
                                                    <ul>
                                                        <li><i className="icon-material-outline-business"></i><strong style={{ color: "blue" }}>Length:</strong> {job.length_of_project}</li>
                                                        <li><i className="icon-material-outline-location-on"></i>{job.location_preference}</li>
                                                        <li><i className="icon-material-outline-business-center"></i><strong style={{ color: "blue" }}>{job.experience_level}</strong> skill level</li>
                                                        <li><i className="icon-material-outline-access-time"></i>{job.date}</li>
                                                        <li><i className="icon-material-outline-money"></i>{`Billed At: ${job.billing.pay} ${job.billing.currency} - ${job.billing.rate}`}</li>
                                                    </ul>
                                                </div>
                                                {/* <div className="job-listing-details">


                                                    <div className="job-listing-company-logo">
                                                        <img src="/images/company-logo-01.png" alt=""/>
                                                    </div>


                                                    <div className="job-listing-description">
                                                        <h3 className="job-listing-title">{job.title.slice(0, 75)}{job.title.length > 75 ? "..." : null}</h3>
                                                        

                                                        <div className="job-listing-footer">
                                                            <ul>
                                                                <li><i className="icon-material-outline-business"></i><strong style={{ color: "#DD2D4A" }}>Length:</strong> {job.length_of_project}</li>
                                                                <li><i className="icon-material-outline-location-on"></i>{job.location_preference}</li>
                                                                <li><i className="icon-material-outline-business-center"></i><strong style={{ color: "blue" }}>{job.experience_level}</strong> skill level</li>
                                                                <li><i className="icon-material-outline-access-time"></i>{job.date}</li>
                                                                <li><i className="icon-material-outline-money"></i>{`Billed At: ${job.billing.pay} ${job.billing.currency} - ${job.billing.rate}`}</li>
                                                            </ul>
                                                        </div>
                                                    </div>


                                                    <span className="bookmark-icon"></span>
                                                </div> */}
                                            </Link>
                                        </Fragment>
                                    );
                                }
                            }) : null}
                               
                            

                            </div>

                            <div class="clearfix"></div>
                            <div class="pagination-container margin-top-20 margin-bottom-20">
                                <nav class="pagination">
                                    <ul>
                                        <li class="pagination-arrow"><a href="#" class="ripple-effect"><i class="icon-material-outline-keyboard-arrow-left"></i></a></li>
                                        <li><a href="#" class="ripple-effect">1</a></li>
                                        <li><a href="#" class="ripple-effect current-page">2</a></li>
                                        <li><a href="#" class="ripple-effect">3</a></li>
                                        <li><a href="#" class="ripple-effect">4</a></li>
                                        <li class="pagination-arrow"><a href="#" class="ripple-effect"><i class="icon-material-outline-keyboard-arrow-right"></i></a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="clearfix"></div>
                         
                            <div class="small-footer margin-top-15">
                                <div class="small-footer-copyrights">
                                    © 2019 <strong>Hireo</strong>. All Rights Reserved.
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
        )
    }
}
const mapStateToProps = state => {
    for (const key in state.auth) {
      const obj = state.auth;
      if (obj.authenticated && (obj.authenticated.hasOwnProperty("email"))) {
        return {
          username: state.auth.authenticated.username
        }
      } 
    }
  }
export default connect(mapStateToProps, { })(BusinessPostingsHomepage);
