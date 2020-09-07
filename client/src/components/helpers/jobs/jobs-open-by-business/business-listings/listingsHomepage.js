import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import "./style.css";

class BusinessPostingsHomepage extends Component {
    render() {
        const Map = ReactMapboxGl({
            accessToken:
              'pk.eyJ1IjoiamVyZW15YWJsb25nIiwiYSI6ImNrNzIzemZ6cDA3Mm8zbWxncW5pZDkzeDkifQ.jeLgR1gLLJsaeyfjBUqrdw'
        });
        return (
            <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
                    <div class="full-page-content-container" data-simplebar>
                        <div class="full-page-content-inner">

                            <h3 class="page-title">Search Results</h3>

                            <div class="notify-box margin-top-15">
                                <div class="switch-container">
                                    <label class="switch"><input type="checkbox"/><span class="switch-button"></span><span class="switch-text">Turn on email alerts for this search</span></label>
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

                            <div class="listings-container compact-list-layout margin-top-35 margin-bottom-25">
                                
                        
                                <a href="/" class="job-listing">

                                
                                    <div class="job-listing-details">

                                
                                        <div class="job-listing-company-logo">
                                            <img src="/images/company-logo-01.png" alt=""/>
                                        </div>

                            
                                        <div class="job-listing-description">
                                            <h3 class="job-listing-title">Bilingual Event Support Specialist</h3>

                                    
                                            <div class="job-listing-footer">
                                                <ul>
                                                    <li><i class="icon-material-outline-business"></i> Hexagon <div class="verified-badge" title="Verified Employer" data-tippy-placement="top"></div></li>
                                                    <li><i class="icon-material-outline-location-on"></i> San Francisco</li>
                                                    <li><i class="icon-material-outline-business-center"></i> Full Time</li>
                                                    <li><i class="icon-material-outline-access-time"></i> 2 days ago</li>
                                                </ul>
                                            </div>
                                        </div>

                                    
                                        <span class="bookmark-icon"></span>
                                    </div>
                                </a>	


                                
                                <a href="/" class="job-listing">

                                
                                    <div class="job-listing-details">

                                
                                        <div class="job-listing-company-logo">
                                            <img src="/images/company-logo-05.png" alt=""/>
                                        </div>

                                    
                                        <div class="job-listing-description">
                                            <h3 class="job-listing-title">Competition Law Officer</h3>

                                            
                                            <div class="job-listing-footer">
                                                <ul>
                                                    <li><i class="icon-material-outline-business"></i> Laxo</li>
                                                    <li><i class="icon-material-outline-location-on"></i> San Francisco</li>
                                                    <li><i class="icon-material-outline-business-center"></i> Full Time</li>
                                                    <li><i class="icon-material-outline-access-time"></i> 2 days ago</li>
                                                </ul>
                                            </div>
                                        </div>

                                    
                                        <span class="bookmark-icon"></span>
                                    </div>
                                </a>
                            
                                <a href="/" class="job-listing">

                            
                                    <div class="job-listing-details">

                                        
                                        <div class="job-listing-company-logo">
                                            <img src="/images/company-logo-02.png" alt=""/>
                                        </div>

                                    
                                        <div class="job-listing-description">
                                            <h3 class="job-listing-title">Barista and Cashier</h3>

                                        
                                            <div class="job-listing-footer">
                                                <ul>
                                                    <li><i class="icon-material-outline-business"></i> Coffee</li>
                                                    <li><i class="icon-material-outline-location-on"></i> San Francisco</li>
                                                    <li><i class="icon-material-outline-business-center"></i> Full Time</li>
                                                    <li><i class="icon-material-outline-access-time"></i> 2 days ago</li>
                                                </ul>
                                            </div>
                                        </div>

                                
                                        <span class="bookmark-icon"></span>
                                    </div>
                                </a>
                                

                            
                                <a href="/" class="job-listing">

                                
                                    <div class="job-listing-details">

                                
                                        <div class="job-listing-company-logo">
                                            <img src="/images/company-logo-03.png" alt=""/>
                                        </div>

        
                                        <div class="job-listing-description">
                                            <h3 class="job-listing-title">Restaurant General Manager</h3>

                                            <div class="job-listing-footer">
                                                <ul>
                                                    <li><i class="icon-material-outline-business"></i> King <div class="verified-badge" title="Verified Employer" data-tippy-placement="top"></div></li>
                                                    <li><i class="icon-material-outline-location-on"></i> San Francisco</li>
                                                    <li><i class="icon-material-outline-business-center"></i> Full Time</li>
                                                    <li><i class="icon-material-outline-access-time"></i> 2 days ago</li>
                                                </ul>
                                            </div>
                                        </div>

                                    
                                        <span class="bookmark-icon"></span>
                                    </div>
                                </a>

                                
                                <a href="/" class="job-listing">

                                
                                    <div class="job-listing-details">

                                        <div class="job-listing-company-logo">
                                            <img src="/images/company-logo-05.png" alt=""/>
                                        </div>

                                
                                        <div class="job-listing-description">
                                            <h3 class="job-listing-title">International Marketing Coordinator</h3>

                                    
                                            <div class="job-listing-footer">
                                                <ul>
                                                    <li><i class="icon-material-outline-business"></i> Skyist</li>
                                                    <li><i class="icon-material-outline-location-on"></i> San Francisco</li>
                                                    <li><i class="icon-material-outline-business-center"></i> Full Time</li>
                                                    <li><i class="icon-material-outline-access-time"></i> 2 days ago</li>
                                                </ul>
                                            </div>
                                        </div>

                            
                                        <span class="bookmark-icon"></span>
                                    </div>
                                </a>

                                <a href="/" class="job-listing">

                                    <div class="job-listing-details">

                                        <div class="job-listing-company-logo">
                                            <img src="/images/company-logo-04.png" alt=""/>
                                        </div>

                                        <div class="job-listing-description">
                                            <h3 class="job-listing-title">Administrative Assistant</h3>

                                        
                                            <div class="job-listing-footer">
                                                <ul>
                                                    <li><i class="icon-material-outline-business"></i> Mates</li>
                                                    <li><i class="icon-material-outline-location-on"></i> San Francisco</li>
                                                    <li><i class="icon-material-outline-business-center"></i> Full Time</li>
                                                    <li><i class="icon-material-outline-access-time"></i> 2 days ago</li>
                                                </ul>
                                            </div>
                                        </div>

                                        
                                        <span class="bookmark-icon"></span>
                                    </div>
                                </a>


                                <a href="/" class="job-listing">

                                    <div class="job-listing-details">

                                        <div class="job-listing-company-logo">
                                            <img src="/images/company-logo-05.png" alt=""/>
                                        </div>

                                        <div class="job-listing-description">
                                            <h3 class="job-listing-title">Construction Labourers</h3>

                                            <div class="job-listing-footer">
                                                <ul>
                                                    <li><i class="icon-material-outline-business"></i> Podous</li>
                                                    <li><i class="icon-material-outline-location-on"></i> San Francisco</li>
                                                    <li><i class="icon-material-outline-business-center"></i> Full Time</li>
                                                    <li><i class="icon-material-outline-access-time"></i> 2 days ago</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <span class="bookmark-icon"></span>
                                    </div>
                                </a>

                                <a href="/" class="job-listing">

                                    <div class="job-listing-details">

                                    
                                        <div class="job-listing-company-logo">
                                            <img src="/images/company-logo-06.png" alt=""/>
                                        </div>

                            
                                        <div class="job-listing-description">
                                            <h3 class="job-listing-title">Human Resources Consultant</h3>

                                        
                                            <div class="job-listing-footer">
                                                <ul>
                                                    <li><i class="icon-material-outline-business"></i> Trideo</li>
                                                    <li><i class="icon-material-outline-location-on"></i> San Francisco</li>
                                                    <li><i class="icon-material-outline-business-center"></i> Full Time</li>
                                                    <li><i class="icon-material-outline-access-time"></i> 2 days ago</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <span class="bookmark-icon"></span>
                                    </div>
                                </a>

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
