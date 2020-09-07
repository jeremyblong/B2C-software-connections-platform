import React, { Component } from 'react';
import "./style.css";

class FeaturedCities extends Component {
    render() {
        return (
            <div>
                <div class="section margin-top-65 margin-bottom-65">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="section-headline centered margin-top-0 margin-bottom-45">
                                <h3>Featured Cities</h3>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <a href="/" id="san-fran" class="photo-box">
                                <div class="photo-box-content">
                                    <h3>San Francisco</h3>
                                    <span className="overlay-blue">376 Jobs</span>
                                </div>
                            </a>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <a href="/" id="NYC" class="photo-box">
                                <div class="photo-box-content">
                                    <h3>New York</h3>
                                    <span className="overlay-blue">645 Jobs</span>
                                </div>
                            </a>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <a href="/" id="LA" class="photo-box">
                                <div class="photo-box-content">
                                    <h3>Los Angeles</h3>
                                    <span className="overlay-blue">832 Jobs</span>
                                </div>
                            </a>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <a href="/" id="miami" class="photo-box">
                                <div class="photo-box-content">
                                    <h3>Miami</h3>
                                    <span className="overlay-blue">513 Jobs</span>
                                </div>
                            </a>
                        </div>

                    </div>
                </div>
            </div>            
            </div>
        )
    }
}
export default FeaturedCities;