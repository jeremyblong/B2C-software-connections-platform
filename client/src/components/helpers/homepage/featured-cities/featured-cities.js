import React, { Component } from 'react';
import "./style.css";

class FeaturedCities extends Component {
    render() {
        return (
            <div>
                <div className="section margin-top-65 margin-bottom-65">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="section-headline centered margin-top-0 margin-bottom-45">
                                <h3>Featured Cities</h3>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <a href="/" id="san-fran" className="photo-box">
                                <div className="photo-box-content">
                                    <h3>San Francisco</h3>
                                    <span className="overlay-blue">376 Jobs</span>
                                </div>
                            </a>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <a href="/" id="NYC" className="photo-box">
                                <div className="photo-box-content">
                                    <h3>New York</h3>
                                    <span className="overlay-blue">645 Jobs</span>
                                </div>
                            </a>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <a href="/" id="LA" className="photo-box">
                                <div className="photo-box-content">
                                    <h3>Los Angeles</h3>
                                    <span className="overlay-blue">832 Jobs</span>
                                </div>
                            </a>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <a href="/" id="miami" className="photo-box">
                                <div className="photo-box-content">
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