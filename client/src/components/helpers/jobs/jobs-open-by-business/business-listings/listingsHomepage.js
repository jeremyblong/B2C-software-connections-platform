import React, { Component, Fragment } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";

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
    render() {
        const Map = ReactMapboxGl({
            accessToken:
              'pk.eyJ1IjoiamVyZW15YWJsb25nIiwiYSI6ImNrNzIzemZ6cDA3Mm8zbWxncW5pZDkzeDkifQ.jeLgR1gLLJsaeyfjBUqrdw'
        });
        return (
            <div style={{ borderTop: "3px solid lightgrey" }} className="container-fluid">
            <div className="row">
                <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
                    <div className="full-page-content-container" data-simplebar>
                        <div className="full-page-content-inner">

                            <h3 className="page-title">Search Results</h3>

                            <div className="notify-box margin-top-15">
                                <div className="switch-container">
                                    <label className="switch"><input type="checkbox"/><span className="switch-button"></span><span className="switch-text">Turn on email alerts for this search</span></label>
                                </div>

                                <div className="sort-by">
                                    <span>Sort by:</span>
                                    <select className="selectpicker hide-tick">
                                        <option>Relevance</option>
                                        <option>Newest</option>
                                        <option>Oldest</option>
                                        <option>Random</option>
                                    </select>
                                </div>
                            </div>

                            <div className="listings-container compact-list-layout margin-top-35 margin-bottom-25">
                                
                        
                                {this.state.users.length !== 0 ? this.state.users.map((job, index) => {
                                    if (job) {
                                        console.log("USER~!:", job);
                                        return (
                                            <Fragment>
                                                <Link to={{pathname: "/business/individual/listing", data: { job }}} className="job-listing">

                                                
                                                    <div className="job-listing-details">


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
                                                    </div>
                                                </Link>
                                            </Fragment>
                                        );
                                    }
                                }) : null}	


                                
                                {/* <Link to="/business/individual/listing" className="job-listing">

                                
                                    <div className="job-listing-details">

                                
                                        <div className="job-listing-company-logo">
                                            <img src="/images/company-logo-05.png" alt=""/>
                                        </div>

                                    
                                        <div className="job-listing-description">
                                            <h3 className="job-listing-title">Competition Law Officer</h3>

                                            
                                            <div className="job-listing-footer">
                                                <ul>
                                                    <li><i className="icon-material-outline-business"></i> Laxo</li>
                                                    <li><i className="icon-material-outline-location-on"></i> San Francisco</li>
                                                    <li><i className="icon-material-outline-business-center"></i> Full Time</li>
                                                    <li><i className="icon-material-outline-access-time"></i> 2 days ago</li>
                                                </ul>
                                            </div>
                                        </div>

                                    
                                        <span className="bookmark-icon"></span>
                                    </div>
                                </Link>
                            
                                <Link to="/business/individual/listing" className="job-listing">

                            
                                    <div className="job-listing-details">

                                        
                                        <div className="job-listing-company-logo">
                                            <img src="/images/company-logo-02.png" alt=""/>
                                        </div>

                                    
                                        <div className="job-listing-description">
                                            <h3 className="job-listing-title">Barista and Cashier</h3>

                                        
                                            <div className="job-listing-footer">
                                                <ul>
                                                    <li><i className="icon-material-outline-business"></i> Coffee</li>
                                                    <li><i className="icon-material-outline-location-on"></i> San Francisco</li>
                                                    <li><i className="icon-material-outline-business-center"></i> Full Time</li>
                                                    <li><i className="icon-material-outline-access-time"></i> 2 days ago</li>
                                                </ul>
                                            </div>
                                        </div>

                                
                                        <span className="bookmark-icon"></span>
                                    </div>
                                </Link>
                                

                            
                                <Link to="/business/individual/listing" className="job-listing">

                                
                                    <div className="job-listing-details">

                                
                                        <div className="job-listing-company-logo">
                                            <img src="/images/company-logo-03.png" alt=""/>
                                        </div>

        
                                        <div className="job-listing-description">
                                            <h3 className="job-listing-title">Restaurant General Manager</h3>

                                            <div className="job-listing-footer">
                                                <ul>
                                                    <li><i className="icon-material-outline-business"></i> King <div className="verified-badge" title="Verified Employer" data-tippy-placement="top"></div></li>
                                                    <li><i className="icon-material-outline-location-on"></i> San Francisco</li>
                                                    <li><i className="icon-material-outline-business-center"></i> Full Time</li>
                                                    <li><i className="icon-material-outline-access-time"></i> 2 days ago</li>
                                                </ul>
                                            </div>
                                        </div>

                                    
                                        <span className="bookmark-icon"></span>
                                    </div>
                                </Link>

                                
                                <Link to="/business/individual/listing" className="job-listing">

                                
                                    <div className="job-listing-details">

                                        <div className="job-listing-company-logo">
                                            <img src="/images/company-logo-05.png" alt=""/>
                                        </div>

                                
                                        <div className="job-listing-description">
                                            <h3 className="job-listing-title">International Marketing Coordinator</h3>

                                    
                                            <div className="job-listing-footer">
                                                <ul>
                                                    <li><i className="icon-material-outline-business"></i> Skyist</li>
                                                    <li><i className="icon-material-outline-location-on"></i> San Francisco</li>
                                                    <li><i className="icon-material-outline-business-center"></i> Full Time</li>
                                                    <li><i className="icon-material-outline-access-time"></i> 2 days ago</li>
                                                </ul>
                                            </div>
                                        </div>

                            
                                        <span className="bookmark-icon"></span>
                                    </div>
                                </Link>

                                <Link to="/business/individual/listing" className="job-listing">

                                    <div className="job-listing-details">

                                        <div className="job-listing-company-logo">
                                            <img src="/images/company-logo-04.png" alt=""/>
                                        </div>

                                        <div className="job-listing-description">
                                            <h3 className="job-listing-title">Administrative Assistant</h3>

                                        
                                            <div className="job-listing-footer">
                                                <ul>
                                                    <li><i className="icon-material-outline-business"></i> Mates</li>
                                                    <li><i className="icon-material-outline-location-on"></i> San Francisco</li>
                                                    <li><i className="icon-material-outline-business-center"></i> Full Time</li>
                                                    <li><i className="icon-material-outline-access-time"></i> 2 days ago</li>
                                                </ul>
                                            </div>
                                        </div>

                                        
                                        <span className="bookmark-icon"></span>
                                    </div>
                                </Link>


                                <Link to="/business/individual/listing" className="job-listing">

                                    <div className="job-listing-details">

                                        <div className="job-listing-company-logo">
                                            <img src="/images/company-logo-05.png" alt=""/>
                                        </div>

                                        <div className="job-listing-description">
                                            <h3 className="job-listing-title">Construction Labourers</h3>

                                            <div className="job-listing-footer">
                                                <ul>
                                                    <li><i className="icon-material-outline-business"></i> Podous</li>
                                                    <li><i className="icon-material-outline-location-on"></i> San Francisco</li>
                                                    <li><i className="icon-material-outline-business-center"></i> Full Time</li>
                                                    <li><i className="icon-material-outline-access-time"></i> 2 days ago</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <span className="bookmark-icon"></span>
                                    </div>
                                </Link>

                                <Link to="/business/individual/listing" className="job-listing">

                                    <div className="job-listing-details">

                                    
                                        <div className="job-listing-company-logo">
                                            <img src="/images/company-logo-06.png" alt=""/>
                                        </div>

                            
                                        <div className="job-listing-description">
                                            <h3 className="job-listing-title">Human Resources Consultant</h3>

                                        
                                            <div className="job-listing-footer">
                                                <ul>
                                                    <li><i className="icon-material-outline-business"></i> Trideo</li>
                                                    <li><i className="icon-material-outline-location-on"></i> San Francisco</li>
                                                    <li><i className="icon-material-outline-business-center"></i> Full Time</li>
                                                    <li><i className="icon-material-outline-access-time"></i> 2 days ago</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <span className="bookmark-icon"></span>
                                    </div>
                                </Link> */}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
                    <Map
                        style="mapbox://styles/mapbox/streets-v9"
                        containerStyle={{
                            height: '100%',
                            width: '100%'
                        }}
                        >
                        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                            <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                        </Layer>
                    </Map>
                </div>
                </div>
            </div>
        )
    }
}
export default BusinessPostingsHomepage;
