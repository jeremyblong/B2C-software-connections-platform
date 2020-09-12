import React, { Component, Fragment } from 'react';
import "./style.css";
import axios from "axios";
import { connect } from "react-redux";
import ReactLoading from 'react-loading';

class ViewProfileHelperPublic extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        user: null
    }
}

    componentDidMount() {
        setTimeout(() => {
            console.log(this.props.username);
            axios.post("/gather/specific/user/username", {
                username: this.props.username
            }).then((res) => {
                if (res.data.message === "Found Specific User!") {
                    console.log("Found user... :", res.data);
                    this.setState({
                        user: res.data.user
                    })
                } else if (res.data.message === "Could NOT find any user by that username") {
                    console.log("Did NOT find user... :", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        }, 500);
    }
    refreshPage = () => {
        axios.post("/gather/specific/user/username", {
            username: this.props.username
        }).then((res) => {
            if (res.data.message === "Found Specific User!") {
                console.log("Found user... :", res.data);
                this.setState({
                    user: res.data.user
                })
            } else if (res.data.message === "Could NOT find any user by that username") {
                console.log("Did NOT find user... :", res.data);
                this.setState({
                    user: "Could NOT locate user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderContent = () => {
        const { user } = this.state;

        if (user !== null) {
            return (
               <Fragment>
                    <div className="single-page-header freelancer-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="single-page-header-inner">
                                    <div className="left-side">
                                        <div className="header-image freelancer-avatar"><img src="/images/user-avatar-big-02.jpg" alt="" /></div>
                                        <div className="header-details">
                                            <h3>{user.username} <span> {`${user.experience} years of experience`}</span></h3>
                                            <ul>
                                                <li><div className="star-rating" data-rating="5.0"></div></li>
                                                {user.nationality ? <li><i class="fa fa-globe"></i> {user.nationality}</li> : <li>No Nationality Specified...</li>}
                                                <li><div className="verified-badge-with-title">Verified</div></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 content-right-offset">
                            <div className="single-page-section">
                                <h3 className="margin-bottom-25">About Me</h3>
                                {this.state.user.introduction ? <p>{this.state.user.introduction}</p> : <p>This user has not completed their profile "about-me" section yet...</p>}
                            </div>
                            <div className="boxed-list margin-bottom-60">
                                <div className="boxed-list-headline">
                                    <h3 className="text-white"><i className="icon-material-outline-thumb-up"></i> Work History and Feedback</h3>
                                </div>
                                <ul className="boxed-list-ul">
                                    <li>
                                        <div className="boxed-list-item">
                                            <div className="item-content">
                                                <h4>Web, Database and API Developer <span>Rated as Freelancer</span></h4>
                                                <div className="item-details margin-top-10">
                                                    <div className="star-rating" data-rating="5.0"></div>
                                                    <div className="detail-item"><i className="icon-material-outline-date-range"></i> August 2019</div>
                                                </div>
                                                <div className="item-description">
                                                    <p>Excellent programmer - fully carried out my project in a very professional manner. </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="boxed-list-item">
                                            <div className="item-content">
                                                <h4>WordPress Theme Installation <span>Rated as Freelancer</span></h4>
                                                <div className="item-details margin-top-10">
                                                    <div className="star-rating" data-rating="5.0"></div>
                                                    <div className="detail-item"><i className="icon-material-outline-date-range"></i> June 2019</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="boxed-list-item">
                                            <div className="item-content">
                                                <h4>Fix Python Selenium Code <span>Rated as Employer</span></h4>
                                                <div className="item-details margin-top-10">
                                                    <div className="star-rating" data-rating="5.0"></div>
                                                    <div className="detail-item"><i className="icon-material-outline-date-range"></i> May 2019</div>
                                                </div>
                                                <div className="item-description">
                                                    <p>I was extremely impressed with the quality of work AND how quickly he got it done. He then offered to help with another side part of the project that we didn't even think about originally.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="boxed-list-item">
                                            <div className="item-content">
                                                <h4>PHP Core Website Fixes <span>Rated as Freelancer</span></h4>
                                                <div className="item-details margin-top-10">
                                                    <div className="star-rating" data-rating="5.0"></div>
                                                    <div className="detail-item"><i className="icon-material-outline-date-range"></i> May 2019</div>
                                                </div>
                                                <div className="item-description">
                                                    <p>Awesome work, definitely will rehire. Poject was completed not only with the requirements, but on time, within our small budget.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div className="clearfix"></div>
                                <div className="pagination-container margin-top-40 margin-bottom-10">
                                    <nav className="pagination">
                                        <ul>
                                            <li><a href="#" className="ripple-effect current-page">1</a></li>
                                            <li><a href="#" className="ripple-effect">2</a></li>
                                            <li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-right"></i></a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="clearfix"></div>
                              

                            </div>

                            <div className="boxed-list margin-bottom-60">
                                <div className="boxed-list-headline">
                                    <h3 className="text-white"><i className="icon-material-outline-business"></i> Employment History</h3>
                                </div>
                                <ul className="boxed-list-ul">
                                    <li>
                                        <div className="boxed-list-item">
                                          
                                            <div className="item-image">
                                                <img src="/images/browse-companies-03.png" alt=""/>
                                            </div>
                                            
                                            
                                            <div className="item-content">
                                                <h4>Development Team Leader</h4>
                                                <div className="item-details margin-top-7">
                                                    <div className="detail-item"><a href="#"><i className="icon-material-outline-business"></i> Acodia</a></div>
                                                    <div className="detail-item"><i className="icon-material-outline-date-range"></i> May 2019 - Present</div>
                                                </div>
                                                <div className="item-description">
                                                    <p>Focus the team on the tasks at hand or the internal and external customer requirements.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="boxed-list-item">
                                            
                                            <div className="item-image">
                                                <img src="/images/browse-companies-04.png" alt=""/>
                                            </div>
                                            
                                            <div className="item-content">
                                                <h4><a href="#">Lead UX/UI Designer</a></h4>
                                                <div className="item-details margin-top-7">
                                                    <div className="detail-item"><a href="#"><i className="icon-material-outline-business"></i> Acorta</a></div>
                                                    <div className="detail-item"><i className="icon-material-outline-date-range"></i> April 2014 - May 2019</div>
                                                </div>
                                                <div className="item-description">
                                                    <p>I designed and implemented 10+ custom web-based CRMs, workflow systems, payment solutions and mobile apps.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        

                        </div>
      
                        <div className="col-xl-4 col-lg-4">
                            <div className="sidebar-container">
                                
              
                                <div className="profile-overview">
                                    {user.hourlyRate ? <div className="overview-item"><strong>${user.hourlyRate}</strong><span>Hourly Rate</span></div> : <div className="overview-item"><strong>Incomplete profile</strong> - no hourly rate posted...</div>}
                                    <div className="overview-item"><strong>53</strong><span>Jobs Done</span></div>
                                    <div className="overview-item"><strong>22</strong><span>Rehired</span></div>
                                </div>

                     
                                <a href="#small-dialog" className="apply-now-button popup-with-zoom-anim margin-bottom-50">Make an Offer <i className="icon-material-outline-arrow-right-alt"></i></a>

                                <div className="sidebar-widget">
                                    <div className="freelancer-indicators">

                             
                                        <div className="indicator">
                                            <strong>88%</strong>
                                            <div className="indicator-bar" data-indicator-percentage="88"><span></span></div>
                                            <span>Job Success</span>
                                        </div>
                                        <div className="indicator">
                                            <strong>100%</strong>
                                            <div className="indicator-bar" data-indicator-percentage="100"><span></span></div>
                                            <span>Recommendation</span>
                                        </div>
                                    
                                        <div className="indicator">
                                            <strong>90%</strong>
                                            <div className="indicator-bar" data-indicator-percentage="90"><span></span></div>
                                            <span>On Time</span>
                                        </div>	
                                                        
                                        <div className="indicator">
                                            <strong>80%</strong>
                                            <div className="indicator-bar" data-indicator-percentage="80"><span></span></div>
                                            <span>On Budget</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidebar-widget">
                                    <h3>Social Profiles</h3>
                                    <div className="freelancer-socials margin-top-25">
                                        <ul>
                                            <li><a href="#" title="Dribbble" data-tippy-placement="top"><i className="icon-brand-dribbble"></i></a></li>
                                            <li><a href="#" title="Twitter" data-tippy-placement="top"><i className="icon-brand-twitter"></i></a></li>
                                            <li><a href="#" title="Behance" data-tippy-placement="top"><i className="icon-brand-behance"></i></a></li>
                                            <li><a href="#" title="GitHub" data-tippy-placement="top"><i className="icon-brand-github"></i></a></li>
                                        
                                        </ul>
                                    </div>
                                </div>

                                {user.skills ? <div className="sidebar-widget">
                                    <h3>Skills</h3>
                                    <div className="task-tags">
                                        {user.skills.map((skill, index) => {
                                            return (
                                                <span style={{ margin: "5px", backgroundColor: "blue", color: "white" }}>{skill}</span>
                                            );
                                        })}
                                    </div>
                                </div> : <div className="sidebar-widget">
                                    <h3>Skills</h3>
                                    <div className="task-tags">
                                        <h3 className="text-dark"><strong>Profile Incomplete</strong> - No skills posted...</h3>
                                    </div>
                                </div>}
                                

                                
                                <div className="sidebar-widget">
                                    <h3>Attachments</h3>
                                    <div className="attachments-container">
                                        <a href="#" className="attachment-box ripple-effect"><span>Cover Letter</span><i>PDF</i></a>
                                        <a href="#" className="attachment-box ripple-effect"><span>Contract</span><i>DOCX</i></a>
                                    </div>
                                </div>

                                <div className="sidebar-widget">
                                    <h3>Bookmark or Share</h3>

                                
                                    <button className="bookmark-button margin-bottom-25">
                                        <span className="bookmark-icon"></span>
                                        <span className="bookmark-text">Bookmark</span>
                                        <span className="bookmarked-text">Bookmarked</span>
                                    </button>

                                 
                                    <div className="copy-url">
                                        <input id="copy-url" type="text" value="" className="with-border"/>
                                        <button className="copy-url-button ripple-effect" data-clipboard-target="#copy-url" title="Copy to Clipboard" data-tippy-placement="top"><i className="icon-material-outline-file-copy"></i></button>
                                    </div>

                          
                                    <div className="share-buttons margin-top-25">
                                        <div className="share-buttons-trigger"><i className="icon-feather-share-2"></i></div>
                                        <div className="share-buttons-content">
                                            <span>Interesting? <strong>Share It!</strong></span>
                                            <ul className="share-buttons-icons">
                                                <li><a href="#" data-button-color="#3b5998" title="Share on Facebook" data-tippy-placement="top"><i className="icon-brand-facebook-f"></i></a></li>
                                                <li><a href="#" data-button-color="#1da1f2" title="Share on Twitter" data-tippy-placement="top"><i className="icon-brand-twitter"></i></a></li>
                                                <li><a href="#" data-button-color="#dd4b39" title="Share on Google Plus" data-tippy-placement="top"><i className="icon-brand-google-plus-g"></i></a></li>
                                                <li><a href="#" data-button-color="#0077b5" title="Share on LinkedIn" data-tippy-placement="top"><i className="icon-brand-linkedin-in"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="margin-top-15"></div>
               </Fragment>
            );
        } else if (this.state.user !== null && this.state.user === "Could NOT locate user...") {
            return (  
                <div style={{ minHeight: "100vh" }}>
                        <div id="titlebar" className="gradient">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">

                                        <h2>Error - Could Not Load</h2>

                                        <nav id="breadcrumbs" className="dark">
                                            <ul>
                                                <li><a href="#">Home</a></li>
                                                <li>Error - Could Not Load</li>
                                            </ul>
                                        </nav>

                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="container">

                            <div className="row">
                                <div className="col-xl-12">

                                    <section id="not-found" className="center margin-top-50 margin-bottom-25">
                                        <h2>Error <i className="icon-line-awesome-question-circle"></i></h2>
                                        <p>We're sorry, but the page you were looking for did not load. Please click the button below to refresh the page...</p>
                                    </section>

                                    <div className="row">
                                        <div className="col-xl-8 offset-xl-2">
                                                <div className="intro-banner-search-form not-found-search margin-bottom-50">
                                                    
                                                    {/* <div className="intro-search-field ">
                                                        <input id="intro-keywords" type="text" placeholder="What Are You Looking For?"/>
                                                    </div> */}

                                                
                                                    <div style={{ width: "100%" }} className="intro-search-button">
                                                        <button onClick={this.refreshPage} style={{ width: "100%" }} className="button blue-btn ripple-effect">Refresh - Load Page</button>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="margin-top-70"></div>
                </div>
            );
        } else {
            return (
                <div style={{ minHeight: "100vh" }}>
                    <h1 style={{ marginTop: "300px" }} className="text-center text-dark">Loading...</h1>
                </div>
            );
        }
    }
    render() {
        const { user } = this.state;
        console.log("ViewProfile state... :", this.state);
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                {this.renderContent()}
            </div>
        )
    }
}
const mapStateToProps = state => {
    for (const key in state.auth) {
        const obj = state.auth;

        if (obj.authenticated.hasOwnProperty("email")) {
          console.log("has email...");
            return {
                email: state.auth.authenticated.email,
                auth: true,
                username: state.auth.authenticated.username
            }
        }
    }
}
export default connect(mapStateToProps, {  })(ViewProfileHelperPublic);