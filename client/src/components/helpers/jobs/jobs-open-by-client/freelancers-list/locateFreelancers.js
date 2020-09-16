import React, { Component } from 'react';
import "./style.css";
import { Link, withRouter } from "react-router-dom";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css';
import axios from "axios";

class FreelancerListView extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        volume: 0,
        users: []
    }
}
    handleOnChange = (value) => {
        this.setState({
        volume: value
        })
    }
    componentDidMount() {
        axios.get("/gather/freelancers").then((res) => {
            if (res.data.message === "Successfully gathered freelancers!") {
                console.log("res.data.... :", res.data);
                
                this.setState({
                    users: res.data.users
                })
            } else {
                console.log("could NOT locate desired result...");
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    redirectPage = (user) => {
        this.props.history.push({
            pathname: `/freelancer/individual/page/public/${user.unique_id}`,
            state: { 
                user
            }
        });
    }
    render() {
        const { volume } = this.state
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                <div class="full-page-container freelancer-contain">

                    <div class="full-page-sidebar">
                        <div class="full-page-sidebar-inner" data-simplebar>
                            <div class="sidebar-container">
                                
                                <div class="sidebar-widget">
                                    <h3>Location</h3>
                                    <div class="input-with-icon">
                                        <div id="autocomplete-container">
                                            <input id="autocomplete-input" type="text" placeholder="Location" />
                                        </div>
                                        <i class="icon-material-outline-location-on"></i>
                                    </div>
                                </div>

                                <div class="sidebar-widget">
                                    <h3>Category</h3>
                                    <select class="form-control" multiple data-selected-text-format="count" data-size="7" title="All Categories" >
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
                                    <h3>Keywords</h3>
                                    <div class="keywords-container">
                                        <div class="keyword-input-container">
                                            <input type="text" class="keyword-input" placeholder="e.g. task title"/>
                                            <button class="keyword-input-button ripple-effect"><i class="icon-material-outline-add"></i></button>
                                        </div>
                                        <div class="keywords-list">{/*<!-- keywords go here -->*/}</div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>

                                <div class="sidebar-widget">
                                    <h3>Hourly Rate</h3>
                                    <div class="margin-top-55"></div>

                                    <Slider 
                                        min={5}
                                        max={250}
                                        orientation="horizontal"
                                        value={volume}
                                        onChange={this.handleOnChange}
                                    />
                                </div>

                                <div class="sidebar-widget">
                                    <h3>Skills</h3>

                                    <div class="tags-container">
                                        <div class="tag">
                                            <input type="checkbox" id="tag1"/>
                                            <label className="label-spc" for="tag1">front-end dev</label>
                                        </div>
                                        <div class="tag">
                                            <input type="checkbox" id="tag2"/>
                                            <label className="label-spc" for="tag2">angular</label>
                                        </div>
                                        <div class="tag">
                                            <input type="checkbox" id="tag3"/>
                                            <label className="label-spc" for="tag3">react</label>
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

                      
                                    <div class="keywords-container margin-top-20">
                                        <div class="keyword-input-container">
                                            <input type="text" class="keyword-input" placeholder="add more skills"/>
                                            <button class="keyword-input-button ripple-effect"><i class="icon-material-outline-add"></i></button>
                                        </div>
                                        <div class="keywords-list">{/*<!-- keywords go here -->*/}</div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>

                                <div class="margin-bottom-40"></div>

                            </div>
                   

                        
                            <div class="sidebar-search-button-container">
                                <button class="button ripple-effect">Search</button>
                            </div>
                           

                        </div>
                    </div>
                   

                   
                    <div class="full-page-content-container" data-simplebar>
                        <div class="full-page-content-inner">

                            <h3 class="page-title">Search Results</h3>

                            <div class="notify-box margin-top-15">
                                <div class="switch-container">
                                    <label class="switch"><input type="checkbox" /><span class="switch-button" ></span><span class="switch-text">Turn on email alerts for this search</span></label>
                                </div>

                                <div class="sort-by">
                                    <span>Sort by:</span>
                                    <select class="selectpicker hide-tick">
                                        <option>Relevance</option>
                                        <option>Newest</option>
                                        <option>Oldest</option>
                                        <option>Random</option>
                                    </select>
                                </div>
                            </div>

                  
                            <div class="freelancers-container freelancers-grid-layout margin-top-35">
                                {this.state.users.length !== 0 ? this.state.users.map((user, index) => {
                                    if (user.completed_signup === true) {
                                        console.log("user", user);
                                            return (
                                                <div class="freelancer col-md-3 col-xs-12 col-sm-6 col-lg-3 col-xl-3">
                                                    <div class="freelancer-overview">
                                                        <div class="freelancer-overview-inner">
                                                            
                                                        
                                                            <span class="bookmark-icon"></span>
                                                            
                                                            
                                                            <div class="freelancer-avatar">
                                                                <div class="verified-badge"></div>
                                                                <a href="/"><img src={`https://s3.us-west-1.wasabisys.com/software-gateway-platform/${user.profilePics[user.profilePics.length - 1].picture}`} alt=""/></a>
                                                            </div>

                                                        
                                                            <div class="freelancer-name">
                                                                <h4><a href="/">{user.username} <img class="flag" src="/images/flags/gb.svg" alt="" title="United Kingdom" data-tippy-placement="top"/></a></h4>
                                                                <span>{user.freelancerData.main_service_offered}</span>
                                                            </div>

                                                            <div class="freelancer-rating">
                                                                <div class="star-rating" data-rating="4.9"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                
                                                    <div class="freelancer-details">
                                                        <div class="freelancer-details-list">
                                                            <ul>
                                                                {user.freelancerData.location ? <li>Location <strong><i class="icon-material-outline-location-on"></i> {user.freelancerData.location.city + ", " + user.freelancerData.location.country}</strong></li> : <li>Location <strong><i class="icon-material-outline-location-on"></i>Location Not Provided</strong></li>}
                                                                <li>Rate <strong>{`${user.hourlyCurrency} ${user.hourlyRate}`} / hr</strong></li>
                                                                <li>Job Success <strong>95%</strong></li>
                                                            </ul>
                                                        </div>
                                                        <button onClick={() => {
                                                            this.redirectPage(user);
                                                        }} class="button button-sliding-icon ripple-effect blue-btn">View Profile <i class="icon-material-outline-arrow-right-alt"></i></button>
                                                    </div>
                                                </div>
                                            );
                                    }
                                }) : null}

                                {/* <div class="freelancer col-md-3 col-xs-12 col-sm-6 col-lg-3 col-xl-3">

                                  
                                    <div class="freelancer-overview">
                                        <div class="freelancer-overview-inner">
                                      
                                            <span class="bookmark-icon"></span>
                                            
                                          
                                            <div class="freelancer-avatar">
                                                <div class="verified-badge"></div>
                                                <a href="/"><img src="/images/user-avatar-big-02.jpg" alt=""/></a>
                                            </div>

                                       
                                            <div class="freelancer-name">
                                                <h4><a href="#">David Peterson <img class="flag" src="/images/flags/de.svg" alt="" title="Germany" data-tippy-placement="top"/></a></h4>
                                                <span>iOS Expert + Node Dev</span>
                                            </div>

                                            
                                            <div class="freelancer-rating">
                                                <div class="star-rating" data-rating="4.2"></div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                    <div class="freelancer-details">
                                        <div class="freelancer-details-list">
                                            <ul>
                                                <li>Location <strong><i class="icon-material-outline-location-on"></i> Berlin</strong></li>
                                                <li>Rate <strong>$40 / hr</strong></li>
                                                <li>Job Success <strong>88%</strong></li>
                                            </ul>
                                        </div>
                                        <a href="/" class="button button-sliding-icon ripple-effect blue-btn">View Profile <i class="icon-material-outline-arrow-right-alt"></i></a>
                                    </div>
                                </div>
                          

                       
                                <div class="freelancer col-md-3 col-xs-12 col-sm-6 col-lg-3 col-xl-3">

                               
                                    <div class="freelancer-overview">
                                        <div class="freelancer-overview-inner">
                                            
                                            <span class="bookmark-icon"></span>
                                            
                                    
                                            <div class="freelancer-avatar">
                                                <a href="/"><img src="/images/user-avatar-placeholder.png" alt=""/></a>
                                            </div>

                                            
                                            <div class="freelancer-name">
                                                <h4><a href="#">Marcin Kowalski <img class="flag" src="/images/flags/pl.svg" alt="" title="Poland" data-tippy-placement="top"/></a></h4>
                                                <span>Front-End Developer</span>
                                            </div>

                                            <span class="company-not-rated margin-bottom-5">Minimum of 3 votes required</span>
                                        </div>
                                    </div>
                                    
                                   
                                    <div class="freelancer-details">
                                        <div class="freelancer-details-list">
                                            <ul>
                                                <li>Location <strong><i class="icon-material-outline-location-on"></i> Warsaw</strong></li>
                                                <li>Rate <strong>$50 / hr</strong></li>
                                                <li>Job Success <strong>100%</strong></li>
                                            </ul>
                                        </div>
                                        <a href="/" class="button button-sliding-icon ripple-effect blue-btn">View Profile <i class="icon-material-outline-arrow-right-alt"></i></a>
                                    </div>
                                </div>
                        

                               
                                <div class="freelancer col-md-3 col-xs-12 col-sm-6 col-lg-3 col-xl-3">

                                  
                                    <div class="freelancer-overview">
                                            <div class="freelancer-overview-inner">
                                         
                                            <span class="bookmark-icon"></span>
                                            
                                          
                                            <div class="freelancer-avatar">
                                                <div class="verified-badge"></div>
                                                <a href="/"><img src="/images/user-avatar-big-03.jpg" alt=""/></a>
                                            </div>

                                          
                                            <div class="freelancer-name">
                                                <h4><a href="#">Sindy Forest <img class="flag" src="/images/flags/au.svg" alt="" title="Australia" data-tippy-placement="top" /></a></h4>
                                                <span>Magento Certified Developer</span>
                                            </div>

                                            <div class="freelancer-rating">
                                                <div class="star-rating" data-rating="5.0"></div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                   
                                    <div class="freelancer-details">
                                        <div class="freelancer-details-list">
                                            <ul>
                                                <li>Location <strong><i class="icon-material-outline-location-on"></i> Brisbane</strong></li>
                                                <li>Rate <strong>$70 / hr</strong></li>
                                                <li>Job Success <strong>100%</strong></li>
                                            </ul>
                                        </div>
                                        <a href="/" class="button button-sliding-icon ripple-effect blue-btn">View Profile <i class="icon-material-outline-arrow-right-alt"></i></a>
                                    </div>
                                </div>
                              
                         
                                <div class="freelancer col-md-3 col-xs-12 col-sm-6 col-lg-3 col-xl-3">

                             
                                    <div class="freelancer-overview">
                                            <div class="freelancer-overview-inner">
                                   
                                            <span class="bookmark-icon"></span>
                                            
                                           
                                            <div class="freelancer-avatar">
                                                <a href="/"><img src="/images/user-avatar-placeholder.png" alt=""/></a>
                                            </div>

                                      
                                            <div class="freelancer-name">
                                                <h4><a href="#">Sebastiano Piccio <img class="flag" src="/images/flags/it.svg" alt="" title="Italy" data-tippy-placement="top"/></a></h4>
                                                <span>Laravel Dev</span>
                                            </div>

                                            
                                            <div class="freelancer-rating">
                                                <div class="star-rating" data-rating="4.5"></div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                  
                                    <div class="freelancer-details">
                                        <div class="freelancer-details-list">
                                            <ul>
                                                <li>Location <strong><i class="icon-material-outline-location-on"></i> Milan</strong></li>
                                                <li>Rate <strong>$80 / hr</strong></li>
                                                <li>Job Success <strong>89%</strong></li>
                                            </ul>
                                        </div>
                                        <a href="/" class="button button-sliding-icon ripple-effect blue-btn">View Profile <i class="icon-material-outline-arrow-right-alt"></i></a>
                                    </div>
                                </div>
                              
                                            
                           
                                <div class="freelancer col-md-3 col-xs-12 col-sm-6 col-lg-3 col-xl-3">

                               
                                    <div class="freelancer-overview">
                                            <div class="freelancer-overview-inner">
                                          
                                            <span class="bookmark-icon"></span>
                                            
                                          
                                            <div class="freelancer-avatar">
                                                <a href="/"><img src="/images/user-avatar-placeholder.png" alt=""/></a>
                                            </div>

                                           
                                            <div class="freelancer-name">
                                                <h4><a href="#">Gabriel Lagueux <img class="flag" src="/images/flags/fr.svg" alt="" title="France" data-tippy-placement="top"/></a></h4>
                                                <span>WordPress Expert</span>
                                            </div>

                                            
                                            <div class="freelancer-rating">
                                                <div class="star-rating" data-rating="5.0"></div>
                                            </div>
                                        </div>
                                    </div>
                                    
                              
                                    <div class="freelancer-details">
                                        <div class="freelancer-details-list">
                                            <ul>
                                                <li>Location <strong><i class="icon-material-outline-location-on"></i> Paris</strong></li>
                                                <li>Rate <strong>$50 / hr</strong></li>
                                                <li>Job Success <strong>100%</strong></li>
                                            </ul>
                                        </div>
                                        <a href="/" class="button button-sliding-icon ripple-effect blue-btn">View Profile <i class="icon-material-outline-arrow-right-alt"></i></a>
                                    </div>
                                </div> */}
                              

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
export default withRouter(FreelancerListView);