import React, { Component } from 'react';
import "./style.css";
import { Link, withRouter } from "react-router-dom";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css';
import axios from "axios";
import places from "places.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

class FreelancerListView extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        volume: 0,
        users: [],
        placesInstance: null,
        custom_search: false,
        user_chunk_one: [],
        user_chunk_two: [],
        user_chunk_three: []
    }
}
    handleOnChange = (value) => {
        this.setState({
        volume: value
        })
    }
    componentDidMount() {
        const fixedOptions = {
            appId: 'plQYSC0SKL1W',
            apiKey: '25eed220e2ba5812b5496ddc2340c555',
            container: document.getElementById('location-selector'),
          };
          
        const reconfigurableOptions = {
            language: 'en', // Receives results in German
            type: 'city', // Search only for cities names
            aroundLatLngViaIP: false // disable the extra search/boost around the source IP
        };
        const placesInstance = places(fixedOptions).configure(reconfigurableOptions);
          
          // dynamically reconfigure options

        this.setState({
            placesInstance
        })

        axios.get("/gather/freelancers").then((res) => {
            if (res.data.message === "Successfully gathered freelancers!") {
                console.log("res.data.... :", res.data);
                
                this.setState({
                    user_chunk_one: res.data.users,
                    user_chunk_two: res.data.users,
                    user_chunk_three: res.data.users
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
    handleLocationSearch = (data) => {
        console.log("data", data);

        axios.post("/get/freelancers/location/state", {
            state: data.administrative
        }).then((res) => {
            if (res.data.message === "Successfully found some users with that location!") {
                console.log(res.data);

                this.setState({
                    user_chunk_one: res.data.users
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderSliderOne = () => {
        if (typeof this.state.user_chunk_one !== "undefined" && this.state.user_chunk_one.length !== 0) {
            console.log("ran........")
            return this.state.user_chunk_one.map((user, index) => {
                console.log("usaaaaa", user);
                if (user.completed_signup === true) {
                    console.log("TRUE")
                    return (
                        <div className="overlay-free">
                            <div class="freelancer col-md-2 col-xs-12 col-sm-6 col-lg-2 col-xl-2">
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
                        </div>
                    );
                }
            })
        }
    }
    renderSliderTwo = () => {
        if (typeof this.state.user_chunk_two !== "undefined" && this.state.user_chunk_two.length !== 0) {
            console.log("ran........")
            return this.state.user_chunk_two.map((user, index) => {
                console.log("usaaaaa", user);
                if (user.completed_signup === true) {
                    console.log("TRUE")
                    return (
                        <div>
                            <div class="freelancer col-md-2 col-xs-12 col-sm-6 col-lg-2 col-xl-2">
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
                        </div>
                    );
                }
            })
        }
    }
    renderSliderThree = () => {
        if (typeof this.state.user_chunk_three !== "undefined" && this.state.user_chunk_three.length !== 0) {
            console.log("ran........")
            return this.state.user_chunk_three.map((user, index) => {
                console.log("usaaaaa", user);
                if (user.completed_signup === true) {
                    console.log("TRUE")
                    return (
                        <div>
                            <div class="freelancer col-md-2 col-xs-12 col-sm-6 col-lg-2 col-xl-2">
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
                        </div>
                    );
                }
            })
        }
    }
    handleServiceSubmission = () => {
        const { serviceOffered } = this.state;

        console.log("clicked handleServicesubmission...");

        axios.post("/filter/freelancers/service", {
            service_offered: serviceOffered
        }).then((res) => {
            console.log(res.data);

            this.setState({
                user_chunk_one: res.data.users.slice(0, 15),
                user_chunk_two: res.data.users.slice(16, 30),
                user_chunk_three: res.data.users.slice(31, 45)
            })
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        const { volume } = this.state;

        console.log("stateeeeeeeeeeee:", this.state);

        if (this.state.placesInstance !== null) {
            this.state.placesInstance.on('change', e => {
                console.log(e.suggestion);

                this.handleLocationSearch(e.suggestion);
            });
        }
        return (
            <div id="foot-adjust" style={{ borderTop: "3px solid lightgrey" }}>
                <div class="full-page-container freelancer-contain">
            
                    <div class="full-page-sidebar">
                        <div class="full-page-sidebar-inner" data-simplebar>
                        
                            <div class="sidebar-container">
                                
                                <div class="sidebar-widget">
                                {/* <div>
                                    <button style={{ marginBottom: "30px", width: "100%" }} class="button blue-btn ripple-effect">Search</button>
                                </div> */}
                                    <h3>Location</h3>
                                    <div class="input-with-icon">
                                        <div id="autocomplete-container">
                                            <input id="location-selector" type="text" placeholder="Location" />
                                        </div>
                                        <i class="icon-material-outline-location-on"></i>
                                    </div>
                                </div>

                                <div class="sidebar-widget">
                                    <h3>Category</h3>
                                    <select class="form-control" onChange={(e) => {
                                        this.setState({
                                            serviceOffered: e.target.value
                                        }, () => {
                                            this.handleServiceSubmission();
                                        })
                                    }} data-size="7" title="Select Category">
                                        <option value={"dev-ops"}>DevOps</option>
                                        <option value={"mobile-app-development"}>Mobile-app Development</option>
                                        <option value={"data-analytics"}>Data Analytics</option>
                                        <option value={"design-creative"}>Design & Creative</option>
                                        <option value={"back-end-development"}>Back-End Development</option>
                                        <option value={"software-development"}>Software Developing</option>
                                        <option value={"networking"}>IT & Networking</option>
                                        <option value={"writing"}>Writing</option>
                                        <option value={"translation"}>Translation</option>
                                        <option value={"full-stack-development"}>Full-Stack Development</option>
                                        <option value={"front-end-development"}>Front-End Development</option>
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
                                <button class="button blue-btn ripple-effect">Search</button>
                            </div>
                           

                        </div>
                    </div>
                   

                   
                    <div class="full-page-content-container" data-simplebar>
                        <div class="full-page-content-inner">

                            <h3 class="page-title">Search Results</h3>
                            <h3 class="page-title text-right">Swipe through the freelancers to see more users</h3>

                            <div class="notify-box margin-top-15">
                                <div class="switch-container">
                                    <label class="switch"><input type="checkbox" /><span class="switch-button" ></span><span class="switch-text">Turn on email alerts for this search</span></label>
                                </div>

                                <div class="sort-by">
                                    {/* <span>Sort by:</span> */}
                                    <select class="form-control hide-tick">
                                        <option>Relevance</option>
                                        <option>Newest</option>
                                        <option>Oldest</option>
                                        <option>Random</option>
                                    </select>
                                </div>
                            </div>

                  
                            <div class="freelancers-container freelancers-grid-layout margin-top-35">
                                <div id="display-desktop">
                                {/* <h1 style={{ color: "blue" }} className="text-center"><strong>Full-Stack</strong> Developers (Server-Side/Database & Client-Side Development)</h1> */}
                                    <div className="spacer">
                                        
                                    {typeof this.state.user_chunk_one !== "undefined" && this.state.user_chunk_one.length !== 0 ? <Carousel ref={(el) => (this.Carousel = el)} arrows={true} slidesToSlide={1} containerClass="carousel-container" responsive={responsive} itemClass="itemmm">
                                            {this.renderSliderOne()}
                                        </Carousel> : null}
                                        <h1 className="text-center">hello world</h1>
                                    </div>
                                    <div className="spacer">
                                        {/* <h1 style={{ color: "blue" }} className="text-center"><strong>Front-End</strong> Developers (Client-Side/Visual Development)</h1> */}
                                        {typeof this.state.user_chunk_two !== "undefined" && this.state.user_chunk_two.length !== 0 ? <Carousel arrows={true} slidesToSlide={1} containerClass="carousel-container" responsive={responsive} itemClass="itemmm">
                                            {this.renderSliderTwo()}
                                        </Carousel> : null}
                                    </div>
                                    <div className="spacer">
                                    {/* <h1 style={{ color: "blue" }} className="text-center"><strong>Back-End</strong> Developers (Server-Side/Database Development)</h1> */}
                                        {typeof this.state.user_chunk_three !== "undefined" && this.state.user_chunk_three.length !== 0 ? <Carousel arrows={true} slidesToSlide={1} containerClass="carousel-container" responsive={responsive} itemClass="itemmm">
                                            {this.renderSliderThree()}
                                        </Carousel> : null}
                                    </div>   
                                </div>
                                <div id="display-mobile">
                                    {typeof this.state.users !== "undefined" && this.state.users.length !== 0 ? this.state.users.map((user, index) => {
                                        if (user.completed_signup === true) {
                                            console.log("TRUE")
                                            return (
                                                <div id="freelancer-overlay" key={index}>
                                                    <div class="freelancer col-md-2 col-xs-12 col-sm-6 col-lg-2 col-xl-2">
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
                                                            }} class="button button-sliding-icon ripple-effect blue-btn full-mobile">View Profile <i class="icon-material-outline-arrow-right-alt"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    }) : null}
                                </div>
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