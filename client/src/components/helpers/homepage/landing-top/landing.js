import React, { Component } from 'react';
import "./style.css";
import { withRouter } from "react-router-dom";
import importedVideo from "../../../../assets/videos/typing.mov";

class LandingTopHelper extends Component {
    render() {
        return (
            <div>
                {/* <div className="intro-banner" id="banner-one">
                <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
                    <source src={importedVideo} type="video/mp4" />
                </video>
                  
                        <div className="row">
                            <div className="col-md-12">
                                <div className="banner-headline">
                                    <h3>
                                        <strong className="text-white"><strong style={{ color: "blue" }}>Hire experts</strong> or be hired for <strong style={{ color: "blue" }}>any</strong> job, any time.</strong>
                                        <br/>
                                        <span className="text-white">Thousands of small businesses use <strong style={{ color: "blue" }}>Hireo</strong> to turn their ideas into reality.</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="intro-banner-search-form margin-top-95">
                                    <div className="intro-search-field with-autocomplete">
                                        <label for="autocomplete-input" className="field-title ripple-effect">Where?</label>
                                        <div className="input-with-icon">
                                            <input id="autocomplete-input" type="text" placeholder="Online Job"/>
                                            <i className="icon-material-outline-location-on"></i>
                                        </div>
                                    </div>
                                    <div className="intro-search-field">
                                        <label for ="intro-keywords" className="field-title ripple-effect">What job you want?</label>
                                        <input id="intro-keywords" type="text" placeholder="Job Title or Keywords"/>
                                    </div>
                                    <div className="intro-search-button">
                                        <button className="button ripple-effect" onClick={() => {
                                            this.props.history.push("/display/jobs/main");
                                        }}>Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="intro-stats margin-top-45 hide-under-992px">
                                    <li className="custom-list-item">
                                        <strong className="counter">1,586</strong>
                                        <span className="text-white">Jobs Posted</span>
                                    </li>
                                    <li className="custom-list-item">
                                        <strong className="counter">3,543</strong>
                                        <span className="text-white">Tasks Posted</span>
                                    </li>
                                    <li className="custom-list-item">
                                        <strong className="counter">1,232</strong>
                                        <span className="text-white">Freelancers</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                </div> */}
                <div class="jumbotron">
                    <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
                        <source src={importedVideo} type="video/mp4" />
                    </video>
                    <div class="container-custom">
                    <div className="row">
                                <div className="col-md-12">
                                    <div className="banner-headline">
                                        <h3>
                                            <strong className="text-white"><strong style={{ color: "blue" }}>Hire experts</strong> or be hired for <strong style={{ color: "blue" }}>any</strong> job, any time.</strong>
                                            <br/>
                                            <span className="text-white">Thousands of small businesses use <strong style={{ color: "blue" }}>Hireo</strong> to turn their ideas into reality.</span>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="intro-banner-search-form margin-top-95">
                                        <div className="intro-search-field with-autocomplete">
                                            <label for="autocomplete-input" className="field-title ripple-effect">Where?</label>
                                            <div className="input-with-icon">
                                                <input id="autocomplete-input" type="text" placeholder="Online Job"/>
                                                <i className="icon-material-outline-location-on"></i>
                                            </div>
                                        </div>
                                        <div className="intro-search-field">
                                            <label for ="intro-keywords" className="field-title ripple-effect">What job you want?</label>
                                            <input id="intro-keywords" type="text" placeholder="Job Title or Keywords"/>
                                        </div>
                                        <div className="intro-search-button">
                                            <button className="button ripple-effect" onClick={() => {
                                                this.props.history.push("/display/jobs/main");
                                            }}>Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <ul className="intro-stats margin-top-45 hide-under-992px">
                                        <li className="custom-list-item">
                                            <strong className="counter">1,586</strong>
                                            <span className="text-white">Jobs Posted</span>
                                        </li>
                                        <li className="custom-list-item">
                                            <strong className="counter">3,543</strong>
                                            <span className="text-white">Tasks Posted</span>
                                        </li>
                                        <li className="custom-list-item">
                                            <strong className="counter">1,232</strong>
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
export default withRouter(LandingTopHelper);