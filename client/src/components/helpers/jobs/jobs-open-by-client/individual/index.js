import React, { Component, Fragment } from 'react';
import axios from "axios";
import "./style.css";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import uuid from 'react-uuid';
import { NotificationManager} from 'react-notifications';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';


class IndividualFreelancerProfileHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        user: null,
        isPaneOpen: false,
        selected_image_data: null,
        index: 0,
        contact_email: "", 
        public_name: "", 
        message: "",
        submissionErr: "",
        ready: false,
        location_index: null,
        anchorEl: null,
        openedPopoverId: null,
        popoverShow: null,
        reply_public_name: "",
        reply_contact_email: "",
        reply_message: "",
        learn_more: false,
        specific_selection: null
    }
}
    handleScroll = () => {
        console.log("scroll occurred...", window.scrollY);
        
        this.setState({
            openedPopoverId: null
        })
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    componentDidMount() {
        
        window.addEventListener('scroll', this.handleScroll, true);
        
        axios.post("/gather/user/by/id", {
            unique_id: this.props.user.unique_id || this.props.id
        }).then((res) => {
            if (res.data.message === "FOUND user!") {

                axios.post("/add/page/view", {
                    unique_id: this.props.user.unique_id || this.props.id
                }).then((responseee) => {
                    if (responseee.data.message === "Updated Page View Count!") {
                        console.log("Updated Page View Count!! :", responseee.data);
                        
                        this.setState({
                            user: responseee.data.user,
                            selected_image_data: responseee.data.user.profilePics[0]
                        }, () => {
                            if (this.state.selected_image_data.comments) {
                                let prom = new Promise((resolve, reject) => {
                                    console.log('synchronously executed');

                                    let count = 0;
                                    
                                    for (let indx = 0; indx < this.state.selected_image_data.comments.length; indx++) {
                                        const image_content = this.state.selected_image_data.comments[indx];
                                        console.log("image_content", image_content);
    
                                        axios.post("/gather/specific/user/username", {
                                            username: image_content.author
                                        }).then((resolution) => {
                                            if (resolution.data.message === "Found Specific User!") {
                                                console.log("resolution resolution: ", resolution.data);
                                                image_content.picture = `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${resolution.data.user.profilePics[resolution.data.user.profilePics.length - 1].picture}`;

                                                count++
                                            }
                                        }).catch((err) => {
                                            console.log(err);
                                        })
                                        
                                    }
                                    setTimeout(() => {
                                        resolve();
                                    }, 1000);
                                });

                                prom.then((val) => {
                                    console.log('asynchronously executed: ' + val);

                                    if (this.props.location.openPane === true) {
                                        if (this.props.location.index) {
                                            console.log("this.props.location.index :", this.props.location.index);
                                            // gather correct comments... logic below.
                                            this.setState({
                                                selected_image_data: this.state.user.profilePics[this.props.location.index],
                                                ready: false
                                            }, () => {
                                                if (this.state.selected_image_data.comments) {
                                                    for (let indx = 0; indx < this.state.selected_image_data.comments.length; indx++) {
                                                        const image_content = this.state.selected_image_data.comments[indx];
                                                        console.log("image_content", image_content);
                                    
                                                        axios.post("/gather/specific/user/username", {
                                                            username: image_content.author
                                                        }).then((resolution) => {
                                                            if (resolution.data.message === "Found Specific User!") {
                                                                console.log("resolution resolution: ", resolution.data);
                                                                image_content.picture = `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${resolution.data.user.profilePics[resolution.data.user.profilePics.length - 1].picture}`;
                                                            }
                                                        }).catch((err) => {
                                                            console.log(err);
                                                        })
                                                    }
                                                    setTimeout(() => {
                                                        this.setState({
                                                            ready: true,
                                                            isPaneOpen: true,
                                                            location_index: this.props.location.index
                                                        })
                                                    }, 1300);
                                                } else {
                                                    console.log("no comments exist...");
                                                }
                                                
                                            })
                                        } else {
                                            console.log("no this.props.location.index........");
                                            this.setState({
                                                ready: true,
                                                isPaneOpen: true
                                            })
                                        }
                                    } else {
                                        this.setState({
                                            ready: true
                                        })
                                    }
                                }).catch((err) => {
                                    console.log('asynchronously executed: ' + err);
                                }).finally(() => {
                                    console.log('promise done executing');
                                });
                            } else {
                                console.log("no comments exist...");
                            }
                            
                        })

                        
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    photoClicked = () => {
        console.log("photo clicked.");
        axios.post("/gather/user/by/id", {
            unique_id: this.props.user.unique_id || this.props.id
        }).then((responseeeeee) => {
            if (responseeeeee.data.message === "FOUND user!") {
                console.log("responseeeeee. responseeeeee . :", responseeeeee.data);

                this.setState({
                    selected_image_data: responseeeeee.data.user.profilePics[0],
                    index: 0,
                    ready: false
                }, () => {
                    if (this.state.selected_image_data.comments) {
                        for (let indx = 0; indx < this.state.selected_image_data.comments.length; indx++) {
                            const image_content = this.state.selected_image_data.comments[indx];
                            console.log("image_content", image_content);
        
                            axios.post("/gather/specific/user/username", {
                                username: image_content.author
                            }).then((resolution) => {
                                if (resolution.data.message === "Found Specific User!") {
                                    console.log("resolution resolution: ", resolution.data);
                                    image_content.picture = `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${resolution.data.user.profilePics[resolution.data.user.profilePics.length - 1].picture}`;
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
        
                            for (let xxxxxx = 0; xxxxxx < image_content.replies.length; xxxxxx++) {
        
                                const reply = image_content.replies[xxxxxx];
                                
                                axios.post("/gather/specific/user/username", {
                                    username: reply.author
                                }).then((resolution) => {
                                    if (resolution.data.message === "Found Specific User!") {
                                        console.log("resolution resolution: ", resolution.data);
                                        reply.picture = `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${resolution.data.user.profilePics[resolution.data.user.profilePics.length - 1].picture}`;
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            }
                        }
                        setTimeout(() => {
                            this.setState({
                                ready: true,
                                isPaneOpen: true
                            })
                        }, 1300);
                    } else {
                        console.log("no comments exist...");
                        
                        this.setState({
                            ready: true,
                            isPaneOpen: true
                        })
                    }
                    
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
                    <div style={{  
                        backgroundImage: user.coverPhoto ? `url(https://s3.us-west-1.wasabisys.com/software-gateway-platform/${user.coverPhoto.picture})` : null,
                        backgroundColor: user.coverPhoto ? "transparent" : "darkblue",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        minHeight: "450px",
                        borderTop: "3px solid lightgrey"
                    }} className="single-page-header freelancer-header">
                        <div className="container give-background">
                        
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="single-page-header-inner">
                                        <div className="left-side">
                                            <div onClick={() => {
                                                this.setState({
                                                    learn_more: !this.state.learn_more
                                                })
                                            }} className="learn-more-profile-pics" id="pop-100">
                                                <i class="fa fa-info-circle fa-2x"></i>
                                                <Popover popperClassName="popover-index-two" placement="left" trigger="focus" isOpen={this.state.learn_more} target="pop-100">
                                                <PopoverHeader>Click the profile picture</PopoverHeader>
                                                    <PopoverBody>
                                                        <p className="lead">Click the profile picture to view ALL of this user's pictures. You can leave comments and replies as well as scroll through the image gallery to learn more about this person!</p>
                                                    </PopoverBody>
                                                </Popover>
                                            </div>
                                            <div onClick={this.photoClicked} className="header-image freelancer-avatar"><img src={user.profilePics.length !== 0 ? `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${user.profilePics[user.profilePics.length - 1].picture}` : "/images/user-avatar-big-02.jpg"} alt=""/></div>
                                            <div className="header-details">
                                                <h3 style={{ color: "tan" }}>{user.username} <span style={{ color: "white" }}>{user.freelancerData.main_service_offered}</span></h3>
                                                <ul>
                                                    <li><div className="star-rating" data-rating="5.0"></div></li>
                                                    <li><img className="flag" src="images/flags/de.svg" alt=""/>{user.freelancerData.location.country}</li>
                                                    <li><div className="verified-badge-with-title">Verified</div></li>
                                                    <hr className="my-4" />
                                                    <li><strong style={{ color: "tan" }}>Estimated</strong> Skill Level (By User): <strong style={{ color: "tan" }}>{user.freelancerData.expertiseLevel}</strong></li>
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
                                    <p>{user.introduction ? user.introduction : "No introduction/bio provided..."}</p>
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
                                        <h3 style={{ color: "white" }}><i className="icon-material-outline-business"></i> Employment History</h3>
                                    </div>
                                    <ul className="boxed-list-ul">
                                        {typeof user.freelancerData.employment_history !== "undefined" && user.freelancerData.employment_history.length !== 0 ? user.freelancerData.employment_history.map((item, index) => {
                                            console.log("employment job.... :", item);
                                            return (
                                                <li key={index}>
                                                    <div className="boxed-list-item">
                                                    
                                                        <div className="item-image">
                                                            <img src="/images/browse-companies-03.png" alt=""/>
                                                        </div>
                                                        
                                                    
                                                        <div className="item-content">
                                                            <h4>{item.technical_title}</h4>
                                                            <div className="item-details margin-top-7">
                                                                <div className="detail-item"><a href="#"><i className="icon-material-outline-business"></i> {item.company_name}</a></div>
                                                                <div className="detail-item"><i className="icon-material-outline-date-range"></i> {item.employment_start_date} - {item.currently_employed === true ? "PRESENT" : item.employment_end_date}</div>
                                                            </div>
                                                            <div className="item-description">
                                                                <p>{item.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        }) : <Fragment><div><h3 style={{ marginTop: "25px", fontWeight: "bold" }} className="text-center">This user has not listed any previous employment yet, they need to update their profile. Consider finding someone with a more complete profile.</h3></div></Fragment>}
                                        {/* <li>
                                            <div className="boxed-list-item">
                                         
                                                <div className="item-image">
                                                    <img src="images/browse-companies-04.png" alt=""/>
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
                                        </li> */}
                                    </ul>
                                </div>
                               

                            </div>
                            

                      
                            <div className="col-xl-4 col-lg-4">
                                <div className="sidebar-container">
                                    
                                 
                                    <div className="profile-overview">
                                        <div className="overview-item"><strong>{user.hourlyRate} {user.hourlyCurrency}</strong><span>Hourly Rate</span></div>
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

                                   
                                    <div className="sidebar-widget">
                                        <h3>Skills</h3>
                                        <div className="task-tags">
                                            {user.freelancerData.skills.length !== 0 ? user.freelancerData.skills.map((skill, index) => {
                                                return <span key={index}>{skill.text}</span>
                                            }) : null}
                                        </div>
                                    </div>

                                   
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
                                            {user.page_views ? <div style={{ marginTop: "25px" }} className="row mx-auto">
                                                <h2 className="text-center">Page View Count: <strong style={{ color: "blue" }}>{user.page_views}</strong></h2>
                                            </div> : null}
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        
                    </div>


             
                    <div className="margin-top-15"></div>
                </Fragment>
            );
        } else {
            return null;
        }
    }
    transitionStart = (value) => {
        console.log("transition start...", value);

        const indexxx = value.nextIndex;
        axios.post("/gather/user/by/id", {
            unique_id: this.props.user.unique_id || this.props.id
        }).then((responseeeeee) => {
            if (responseeeeee.data.message === "FOUND user!") {
                this.setState({
                    selected_image_data: responseeeeee.data.user.profilePics[indexxx],
                    index: indexxx,
                    ready: false
                }, () => {
                    if (this.state.selected_image_data.comments) {
                        const commentArray = [];
        
                        for (let indx = 0; indx < this.state.selected_image_data.comments.length; indx++) {
                            const image_content = this.state.selected_image_data.comments[indx];
                            console.log("image_content", image_content);
        
                            axios.post("/gather/specific/user/username", {
                                username: image_content.author
                            }).then((resolution) => {
                                if (resolution.data.message === "Found Specific User!") {
                                    console.log("resolution resolution: ", resolution.data);
                                    image_content.picture = `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${resolution.data.user.profilePics[resolution.data.user.profilePics.length - 1].picture}`;
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
        
                            for (let xxxxxx = 0; xxxxxx < image_content.replies.length; xxxxxx++) {
        
                                const reply = image_content.replies[xxxxxx];
                                
                                axios.post("/gather/specific/user/username", {
                                    username: reply.author
                                }).then((resolution) => {
                                    if (resolution.data.message === "Found Specific User!") {
                                        console.log("resolution resolution: ", resolution.data);
                                        reply.picture = `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${resolution.data.user.profilePics[resolution.data.user.profilePics.length - 1].picture}`;
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            }
                            commentArray.push(image_content);
                        }
                        this.setState({
                            selected_image_data: {
                                ...this.state.selected_image_data,
                                comments: [...commentArray]
                            }
                        })
        
                        setTimeout(() => {
                            this.setState({
                                ready: true
                            })
                        }, 1300);
                    } else {
                        console.log("no comments exist...");
                    }
                    
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderSlider = () => {
        const { user, location_index} = this.state;

        if (user !== null) {
            return (
                <AwesomeSlider selected={location_index !== null ? location_index : 0} onTransitionStart={this.transitionStart}>
                    {user.profilePics.map((picture, index) => {
                        console.log("picture", picture);
                        return (
                            <div>
                                <img src={`https://s3.us-west-1.wasabisys.com/software-gateway-platform/${picture.picture}`} id="slider-photo" />
                            </div>
                        );
                    })}
                </AwesomeSlider>
            );
        }
    }
    addComment = (e) => {
        e.preventDefault();
        
        console.log("add comment");

        const { contact_email, public_name, message, selected_image_data, user } = this.state;

        if (contact_email.length > 0 && public_name.length > 0 && message.length > 0) {
            axios.post("/post/comment/profile/picture/intitial", {
                unique_id: this.props.user.unique_id || this.props.id,
                contact_email, 
                public_name, 
                message,
                selected_image_data,
                poster: this.props.username,
                other_user: user.username,
                indexxxxx: this.state.index
            }).then((res) => {
                if (res.data.message === "Updated database comments successfully!") {
                    console.log("updated database successfully!.... :", res.data);

                    axios.post("/gather/specific/user/username", {
                        username: this.props.username
                    }).then((responseeeeee) => {
                        if (responseeeeee.data.message === "Found Specific User!") {
                            console.log(responseeeeee.data);

                            const newly_constructed_comment = {
                                author: this.props.username,
                                contact: contact_email,
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                id: uuid(),
                                message,
                                picture: `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${responseeeeee.data.user.profilePics[responseeeeee.data.user.profilePics.length - 1].picture}`,
                                preferred_name: public_name,
                                related_picture_id: res.data.picture_identifier,
                                replies: []
                            };

                            const clone = {
                                ...selected_image_data
                            }

                            if (selected_image_data && selected_image_data.hasOwnProperty("comments")) {
                                clone.comments.push(newly_constructed_comment);
                            } else {
                                clone["comments"] = newly_constructed_comment;
                            }

                            this.setState({
                                selected_image_data: clone,
                                index: 0,
                                user: res.data.user,
                                contact_email: "", 
                                public_name: "", 
                                message: "",
                                ready: true,
                                isPaneOpen: false
                            }, () => {
                                NotificationManager.success("You've successfully posted a new comment to this persons profile picture feed...", 'Successfully posted a new comment!');
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            this.setState({
                submissionErr: 'Failed to post new comment, make sure you have all three fields completed before submitting your comment!'
            })
        }
    }
    deleteComment = (comment) => {
        console.log("delete comment...", comment);

        const { selected_image_data } = this.state;

        axios.put("/delete/comment/profile/picture", {
            comment_id: comment.id,
            visited_user_id: this.props.user.unique_id || this.props.id,
            picture_id: selected_image_data.id
        }).then((res) => {
            if (res.data.message === "Successfully removed selected comment!") {
                console.log(res.data);

                let prom = new Promise((resolve, reject) => {
                    console.log('synchronously executed');
                    
                    for (let indx = 0; indx < res.data.changes.comments.length; indx++) {
                        const image_content = res.data.changes.comments[indx];
                        console.log("image_content", image_content);

                        axios.post("/gather/specific/user/username", {
                            username: image_content.author
                        }).then((resolution) => {
                            if (resolution.data.message === "Found Specific User!") {
                                console.log("resolution resolution: ", resolution.data);
                                image_content.picture = `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${resolution.data.user.profilePics[resolution.data.user.profilePics.length - 1].picture}`;
                            }
                        }).catch((err) => {
                            console.log(err);
                        });

                        for (let xxxxxx = 0; xxxxxx < image_content.replies.length; xxxxxx++) {

                            const reply = image_content.replies[xxxxxx];
                            
                            axios.post("/gather/specific/user/username", {
                                username: reply.author
                            }).then((resolution) => {
                                if (resolution.data.message === "Found Specific User!") {
                                    console.log("resolution resolution: ", resolution.data);
                                    reply.picture = `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${resolution.data.user.profilePics[resolution.data.user.profilePics.length - 1].picture}`;
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                        
                    }
                    setTimeout(() => {
                        resolve(res.data.changes);
                    }, 1000);
                });

                prom.then((passed_values) => {
                    this.setState({
                        selected_image_data: passed_values
                    })
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    console.log("finally...");
                })
                
                
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    handlePopverEnterLogic = (event, popoverId) => {
        this.setState({
            openedPopoverId: popoverId,
            anchorEl: event.target,
        });
    }
    handlePopoverClose() {
        this.setState({
          openedPopoverId: null,
          anchorEl: null,
        });
    }
    replyOrOpen = (messageId, comment) => {
        this.setState({
            openedPopoverId: messageId,
            specific_selection: comment
        })
    }
    deleteCommentNested = (reply) => {
        console.log("nest reply - delete clicked.", reply);

        const { selected_image_data } = this.state;

        axios.put("/delete/comment/profile/picture/deeply/nested", {
            comment_id: reply.id,
            visited_user_id: this.props.user.unique_id || this.props.id,
            picture_id: selected_image_data.id
        }).then((res) => {
            if (res.data.message === "Successfully removed selected NESTED comment!") {
                console.log(res.data);

                let prom = new Promise((resolve, reject) => {
                    console.log('synchronously executed');
                    
                    for (let indx = 0; indx < res.data.changes.comments.length; indx++) {
                        // break down into easier usage
                        const image_content = res.data.changes.comments[indx];

                        axios.post("/gather/specific/user/username", {
                            username: image_content.author
                        }).then((resolution) => {
                            if (resolution.data.message === "Found Specific User!") {

                                console.log("resolution resolution: ", resolution.data);

                                image_content.picture = `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${resolution.data.user.profilePics[resolution.data.user.profilePics.length - 1].picture}`;

                            }
                        }).catch((err) => {
                            console.log(err);
                        });

                        for (let xxxxxx = 0; xxxxxx < image_content.replies.length; xxxxxx++) {

                            const reply = image_content.replies[xxxxxx];
                            
                            axios.post("/gather/specific/user/username", {
                                username: reply.author
                            }).then((resolution) => {
                                if (resolution.data.message === "Found Specific User!") {
                                    console.log("resolution resolution: ", resolution.data);
                                    reply.picture = `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${resolution.data.user.profilePics[resolution.data.user.profilePics.length - 1].picture}`;
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                        
                    }
                    
                    setTimeout(() => {
                        resolve(res.data.changes);
                    }, 1000);
                });

                prom.then((passed_values) => {
                    this.setState({
                        selected_image_data: passed_values
                    })
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    console.log("finally...");
                })
                
                
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderCommentsSocial = () => {
        const { submissionErr, user, selected_image_data, ready, reply_submissionErr } = this.state;

        console.log("specific user...", user, selected_image_data); 

        return (
            <Fragment>
            <div className="row">
                    <div className="col-xl-12">
                        
                        <h3 className="margin-top-35 margin-bottom-30">Add Comment</h3>

                        
                        <form onSubmit={this.addComment} id="add-comment">
                            {typeof submissionErr !== "undefined" && submissionErr.length > 0 ? <h3 style={{ marginBottom: "25px" }} className="text-center red-text">{submissionErr}</h3> : null}
                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="input-with-icon-left no-border">
                                        <i className="icon-material-outline-account-circle"></i>
                                        <input onChange={(e) => {
                                            this.setState({
                                                public_name: e.target.value,
                                                submissionErr: ""
                                            })
                                        }} type="text" className="input-text" name="commentname" id="namecomment" placeholder="Display/Public Name..." required/>
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="input-with-icon-left no-border">
                                        <i className="icon-material-baseline-mail-outline"></i>
                                        <input onChange={(e) => {
                                            this.setState({
                                                contact_email: e.target.value,
                                                submissionErr: ""
                                            })
                                        }} type="text" className="input-text" name="emailaddress" id="emailaddress" placeholder="Email/Contact Address..." required/>
                                    </div>
                                </div>
                            </div>

                            <textarea onChange={(e) => {
                                this.setState({
                                    message: e.target.value,
                                    submissionErr: ""
                                })
                            }} name="comment-content" cols="30" rows="5" placeholder="Comment"></textarea>
                        </form>
                        
                        
                        <button style={{ width: "100%" }} className="button blue-btn button-sliding-icon ripple-effect margin-bottom-40" type="submit" form="add-comment">Add Comment <i className="icon-material-outline-arrow-right-alt"></i></button>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <section className="comments">
                            <h3 className="margin-top-45 margin-bottom-0">Comments <span className="comments-amount">({selected_image_data && selected_image_data.hasOwnProperty("comments") ? selected_image_data.comments.length : 0})</span></h3>

                            <ul>
                                {ready === true && selected_image_data && selected_image_data.hasOwnProperty("comments") ? selected_image_data.comments.map((each, index) => {
                                    console.log("eachhhhhhhh ", each);
                                    return (
                                        <li key={this.state.index + index}>
                                            <div className="avatar"><img src={each.picture} alt="user-picture"/></div>
                                            <div className="comment-content"><div className="arrow-comment"></div>
                                                <div className="comment-by">Username: {each.author} <br /> Preferred Name: {each.preferred_name}<span className="date">{each.date}</span> <br />
                                                <span>Direct: {each.contact}</span>
                                                    {each.author === this.props.username ? <div onClick={() => {
                                                        this.deleteComment(each);
                                                    }} id="trash-trash">
                                                        <img src={require("../../../../../assets/icons/delete.png")} />
                                                    </div> : null}
                                                    <a onClick={() => {
                                                        this.replyOrOpen(each.id, each);
                                                    }} id={`Popover${each.id}`} style={{ color: "white" }} className="reply blue-btn mobile-hidden"><i className="fa fa-reply"></i> Reply</a>
                                                    <Popover popperClassName="popover-index" placement="left" isOpen={this.state.openedPopoverId === each.id} target={`Popover${each.id}`}>
                                                        <PopoverHeader>Enter Your Response</PopoverHeader>
                                                        <PopoverBody>
                                                        <div className="col-xl-12 stretch_me">
                                                            <h3 className="margin-top-35 margin-bottom-30">Add Comment</h3> 
                                                            <form onSubmit={this.addComment} id="add-comment add-comment-two">
                                                                {typeof reply_submissionErr !== "undefined" && reply_submissionErr.length > 0 ? <h3 style={{ marginBottom: "25px" }} className="text-center red-text">{submissionErr}</h3> : null}
                                                                <div className="row">
                                                                    <div className="col-xl-6">
                                                                        <div className="input-with-icon-left no-border">
                                                                            <i className="icon-material-outline-account-circle"></i>
                                                                            <input onChange={(e) => {
                                                                                this.setState({
                                                                                    reply_public_name: e.target.value,
                                                                                    reply_submissionErr: ""
                                                                                })
                                                                            }} value={this.state.reply_public_name} type="text" className="input-text" name="commentname" id="namecomment" placeholder="Display/Public Name..." required/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xl-6">
                                                                        <div className="input-with-icon-left no-border">
                                                                            <i className="icon-material-baseline-mail-outline"></i>
                                                                            <input onChange={(e) => {
                                                                                this.setState({
                                                                                    reply_contact_email: e.target.value,
                                                                                    reply_submissionErr: ""
                                                                                })
                                                                            }} value={this.state.reply_contact_email} type="text" className="input-text" name="emailaddress" id="emailaddress" placeholder="Email/Contact Address..." required/>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <textarea onChange={(e) => {
                                                                    this.setState({
                                                                        reply_message: e.target.value,
                                                                        reply_submissionErr: ""
                                                                    })
                                                                }} value={this.state.reply_message} name="comment-content" cols="30" rows="5" placeholder="Comment"></textarea>
                                                            </form>
                                                            
                                                            
                                                            <button onClick={this.handleSubReply} style={{ width: "100%" }} className="button blue-btn button-sliding-icon ripple-effect margin-bottom-40" type="submit" form="add-comment">Send Reply <i className="icon-material-outline-arrow-right-alt"></i></button>
                                                            
                                                        </div>
                                                        </PopoverBody>
                                                    </Popover>
                                                </div>
                                                <p className="dark-blue-text">{each.message}</p>
                                            </div>
                                            <ul>
                                                {typeof each.replies !== "undefined" && each.replies.length > 0 ? each.replies.map((reply, indexxxxx) => {
                                                    return (
                                                        <li key={indexxxxx}>
                                                            <div className="avatar"><img src={reply.picture} alt=""/></div>
                                                            <div className="comment-content"><div className="arrow-comment"></div>
                                                                <div className="comment-by">Username: {reply.author} <span className="date"> {reply.date}</span>
                                                                    <p>Direct: {reply.contact}</p>
                                                                    {reply.author === this.props.username ? <div onClick={() => {
                                                                        this.deleteCommentNested(reply);
                                                                    }} id="trash-trash">
                                                                        <img src={require("../../../../../assets/icons/delete.png")} />
                                                                    </div> : null}
                                                                </div>
                                                                <p className="dark-blue-text">{reply.message}</p>
                                                            </div>
                                                        </li>
                                                    );
                                                }) : null}
                                            </ul>
                                        </li>
                                    );
                                }) : null}

                                
                            </ul>

                        </section>
                    </div>
                </div>
                
                
            </Fragment>
        );
    }
    handleSubReply = () => {
        console.log("handleSubReply");

        const { specific_selection, reply_public_name, reply_contact_email, reply_message, index, user, selected_image_data } = this.state;

        axios.post("/reply/sub/comment/profile/pictures", {
            unique_id: this.props.user.unique_id || this.props.id,
            index,
            poster: this.props.username,
            other_user: user.username,
            comment_id: specific_selection.id, 
            public_name: reply_public_name, 
            contact_email: reply_contact_email, 
            message: reply_message,
            selected_image_data
        }).then((response) => {
            console.log(response.data);
            if (response.data.message === "Successfully updated comment thread and posted new sub reply!") {
                NotificationManager.success("You've successfully posted a new comment to this persons profile picture feed...", 'Successfully posted a new comment!');

                this.setState({
                    isPaneOpen: false,
                    reply_public_name: "",
                    reply_contact_email: "",
                    reply_message: ""
                })
            } else {
                NotificationManager.error('Something occurred while posting your comment, please refresh the page and try your action again...', 'ERROR!', 7000);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        console.log("state state state ----- :", this.state);

        const { user } = this.state;
        return (
            <div>
                {this.renderContent()}

                <SlidingPane
                    className="sliding-pane-class"
                    overlayClassName="overlay-class"
                    isOpen={this.state.isPaneOpen}
                    title="Slide through the slideshow to view this users profile pictures and social comments..."
                    onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                        this.setState({ isPaneOpen: false });
                    }}
                >
                    {this.renderSlider()}
                    {this.renderCommentsSocial()}
                </SlidingPane>
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
export default withRouter(connect(mapStateToProps, { })(IndividualFreelancerProfileHelper));
