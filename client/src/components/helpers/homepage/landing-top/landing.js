import React, { Component } from 'react';
import "./style.css";

class LandingTopHelper extends Component {
    render() {
        return (
            <div>
                <div class="intro-banner" id="banner-one">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="banner-headline">
                                    <h3>
                                        <strong className="text-white"><strong style={{ color: "blue" }}>Hire experts</strong> or be hired for <strong style={{ color: "blue" }}>any</strong> job, any time.</strong>
                                        <br/>
                                        <span className="text-white">Thousands of small businesses use <strong style={{ color: "blue" }}>Hireo</strong> to turn their ideas into reality.</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="intro-banner-search-form margin-top-95">
                                    <div class="intro-search-field with-autocomplete">
                                        <label for="autocomplete-input" class="field-title ripple-effect">Where?</label>
                                        <div class="input-with-icon">
                                            <input id="autocomplete-input" type="text" placeholder="Online Job"/>
                                            <i class="icon-material-outline-location-on"></i>
                                        </div>
                                    </div>
                                    <div class="intro-search-field">
                                        <label for ="intro-keywords" class="field-title ripple-effect">What job you want?</label>
                                        <input id="intro-keywords" type="text" placeholder="Job Title or Keywords"/>
                                    </div>
                                    <div class="intro-search-button">
                                        <button class="button ripple-effect" onclick="window.location.href='jobs-list-layout-full-page-map.html'">Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <ul class="intro-stats margin-top-45 hide-under-992px">
                                    <li className="custom-list-item">
                                        <strong class="counter">1,586</strong>
                                        <span className="text-white">Jobs Posted</span>
                                    </li>
                                    <li className="custom-list-item">
                                        <strong class="counter">3,543</strong>
                                        <span className="text-white">Tasks Posted</span>
                                    </li>
                                    <li className="custom-list-item">
                                        <strong class="counter">1,232</strong>
                                        <span className="text-white">Freelancers</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default LandingTopHelper;