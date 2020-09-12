import React, { Component, Fragment } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import ReactLoading from 'react-loading';
import { Spinner } from "reactstrap";

class PostAJob extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        business: false,
        user: null,
        loaded: false
    }
}
    componentDidMount() {
        axios.post("/gather/specific/user/username", {
            username: this.props.username
        }).then((res) => {
            if (res.data.message === "Found Specific User!") {
                console.log(res.data);
                if (res.data.user.accountType === "business") {
                    this.setState({
                        user: res.data.user,
                        business: true,
                        loaded: true
                    })
                } else {
                    this.setState({
                        user: res.data.user,
                        loaded: true
                    })
                }
            }
        }).catch((err) => {
            console.log(err);
            this.setState({
                loaded: true
            })
        })
    }
    renderConditional = () => {
        if (this.state.business === true) {
            return (
                <div class="dashboard-content-container" data-simplebar>
		                <div class="dashboard-content-inner" >

                                <div class="dashboard-headline">
                                    <h3 className="text-left">Post a Job</h3>

                                    <nav id="breadcrumbs" class="dark">
                                        <ul>
                                            <li><Link to="/">Home</Link></li>
                                            <li><Link to="/dashboard">Dashboard</Link></li>
                                            <li>Post a Job</li>
                                        </ul>
                                    </nav>
                                </div>
                        

                        <div class="row">

                            
                            <div class="col-xl-12">
                                <div class="dashboard-box margin-top-0">

                                    
                                    <div class="headline">
                                        <h3><i class="icon-feather-folder-plus"></i> Job Submission Form</h3>
                                    </div>

                                    <div class="content with-padding padding-bottom-10">
                                        <div class="row">

                                            <div class="col-xl-4">
                                                <div class="submit-field">
                                                    <h5>Job Title</h5>
                                                    <input placeholder={"Front-End Developer"} type="text" class="with-border"/>
                                                </div>
                                            </div>

                                            <div class="col-xl-4">
                                                <div class="submit-field">
                                                    <h5>Job Type</h5>
                                                    <select class="form-control">
                                                        <option>Full Time</option>
                                                        <option>Freelance</option>
                                                        <option>Part Time</option>
                                                        <option>Internship</option>
                                                        <option>Temporary</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-xl-4">
                                                <div class="submit-field">
                                                    <h5>Job Category</h5>
                                                    <select class="form-control">
                                                        <option value="front-end-development">Front-End Development</option>
                                                        <option value="dev-ops">DevOps</option>
                                                        <option value="big-data">Big Data</option>
                                                        <option value="full-stack-development">Full-Stack Development</option>
                                                        <option value="back-end-development">Back-End Development</option>
                                                        <option value="ai/ml">AI/ML (artificial intelligence - machine learning)</option>
                                                        <option value="blockchain">Blockchain - Crypto</option>
                                                        <option value="scrapping/collecting-data">Web scrapping and/or data collection</option>
                                                        
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-xl-4">
                                                <div class="submit-field">
                                                    <h5>Location</h5>
                                                    <div class="input-with-icon">
                                                        <div id="autocomplete-container">
                                                            <input id="autocomplete-input" class="with-border" type="text" placeholder="Type Address" />
                                                        </div>
                                                        <i class="icon-material-outline-location-on"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xl-4">
                                                <div class="submit-field">
                                                    <h5>Salary</h5>
                                                    <div class="row">
                                                        <div class="col-xl-6">
                                                            <div class="input-with-icon">
                                                                <input class="with-border" type="text" placeholder="Min" />
                                                                <i class="currency">USD</i>
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-6">
                                                            <div class="input-with-icon">
                                                                <input class="with-border" type="text" placeholder="Max" />
                                                                <i class="currency">USD</i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xl-4">
                                                <div class="submit-field">
                                                    <h5>Tags <span>(optional)</span>  <i class="help-icon" data-tippy-placement="right" title="Maximum of 10 tags"></i></h5>
                                                    <div class="keywords-container">
                                                        <div class="keyword-input-container">
                                                            <input type="text" class="keyword-input with-border" placeholder="e.g. job title, responsibilites"/>
                                                            <button class="keyword-input-button ripple-effect"><i class="icon-material-outline-add"></i></button>
                                                        </div>
                                                        <div class="keywords-list">{/* keywords go here... */}</div>
                                                        <div class="clearfix"></div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="col-xl-12">
                                                <div class="submit-field">
                                                    <h5>Job Description</h5>
                                                    <textarea placeholder={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} cols="30" rows="5" class="with-border"></textarea>
                                                    <div class="uploadButton margin-top-30">
                                                        <input class="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload" multiple/>
                                                        <label class="uploadButton-button ripple-effect" for="upload">Upload Files</label>
                                                        <span class="uploadButton-file-name">Images or documents that might be helpful in describing your job</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: "100px" }} class="col-xl-12">
                                <a href="#" class="button ripple-effect big margin-top-30" style={{ width: "100%" }}><i class="icon-feather-plus"></i> Post a Job</a>
                            </div>

                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <Fragment>
                    <div id="titlebar" class="gradient">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">

                                    <h2>Unauthorized</h2>

                                
                                    <nav id="breadcrumbs" class="dark">
                                        <ul>
                                            <li><Link to="/">Home</Link></li>
                                            <li>Un-Authorized</li>
                                        </ul>
                                    </nav>

                                </div>
                            </div>
                        </div>
                    </div>

             
                    <div class="container">

                        <div class="row">
                            <div class="col-xl-12">

                                <section id="not-found" class="center margin-top-50 margin-bottom-25">
                                    <h2>Unauthorized <i class="icon-line-awesome-question-circle"></i></h2>
                                    <p>We're sorry but you're trying to access a page your account is not authorized to access... If you'd like access to this page, please switch your account to a business account type. </p>
                                </section>

                                <div class="row">
                                    <div class="col-xl-8 offset-xl-2">
                                            <div class="intro-banner-search-form not-found-search margin-bottom-50">
                                          
                                                <div class="intro-search-field ">
                                                    <input id="intro-keywords" type="text" placeholder="What Are You Looking For?" />
                                                </div>

                                          
                                                <div class="intro-search-button">
                                                    <button class="button ripple-effect">Search</button>
                                                </div>
                                            </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </Fragment>
            );
        }
    }
    renderLoading = () => {
        return (
           <div style={{ minHeight: "100vh" }}>
                <Spinner style={{ marginTop: "400px" }} size="lg" animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
           </div>
        );
    }
    render() {
        const { loaded } = this.state;

        console.log(this.state);
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                {loaded === true ? this.renderConditional() : this.renderLoading()}
            </div> 
          
        )
    }
}
const mapStateToProps = state => {
    for (const key in state.auth) {
        const obj = state.auth;
        if (obj.authenticated.hasOwnProperty("email")) {
            return {
                username: state.auth.authenticated.username
            }
        }
    }
}
export default withRouter(connect(mapStateToProps, { })(PostAJob));