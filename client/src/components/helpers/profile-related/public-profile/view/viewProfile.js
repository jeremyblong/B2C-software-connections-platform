import React, { Component, Fragment } from 'react';
import "./style.css";
import axios from "axios";
import { connect } from "react-redux";
import ReactLoading from 'react-loading';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Dropzone from 'react-dropzone'

class ViewProfileHelperPublic extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        user: null,
        open: false,
        isPaneOpen: false,
        uploadedFile: null,
        coverPhoto: null,
        result: null
    }
}
    onOpenModal = () => {
        this.setState({ open: true });
    };
 
    onCloseModal = () => {
        this.setState({ open: false });
    };
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
        console.log("user", user);
        if (user !== null) {
            return (
               <Fragment>
                    <div className="single-page-header freelancer-header" style={{  
                        backgroundImage: `url(https://s3.us-west-1.wasabisys.com/software-gateway-platform/${this.state.coverPhoto !== null ? this.state.coverPhoto : user.coverPhoto ? user.coverPhoto.picture : null})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        minHeight: "450px"
                    }}>
                    <div className="container give-background">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="single-page-header-inner">
                                    <div className="left-side">
                                        <div onClick={null} className="header-image freelancer-avatar"><img id="shift" src={this.state.user !== null ? `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${this.state.user.profilePics[this.state.user.profilePics.length - 1].picture}` : "/images/user-avatar-big-02.jpg"} alt="" /></div>
                                        <div className="header-details">
                                            <h3 className="text-white"><div className="tan">{user.username}</div> <span style={{ color: "white" }}> {`${user.experience} years of experience`}</span></h3>
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
                                    {this.state.user.freelancerData.employment_history.length !== 0 ? this.state.user.freelancerData.employment_history.map((data, index) => {
                                        console.log("data", data);
                                        return (
                                            <li>
                                                <div className="boxed-list-item">
                                                
                                                    <div className="item-image">
                                                        <img src="/images/browse-companies-03.png" alt=""/>
                                                    </div>
                                                    
                                                    
                                                    <div className="item-content">
                                                        <h4>{data.technical_title}</h4>
                                                        <div className="item-details margin-top-7">
                                                            <div className="detail-item"><a href="#"><i className="icon-material-outline-business"></i>{data.company_name}</a></div>
                                                            <div className="detail-item"><i className="icon-material-outline-date-range"></i> {data.employment_start_date} - {data.employment_end_date}</div>
                                                        </div>
                                                        <div className="item-description">
                                                            <p>{data.description}</p>
                                                        
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    }) : null}
                                    
                                    {/* <li>
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
                                    </li> */}
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

                                {user.freelancerData.skills ? <div className="sidebar-widget">
                                    <h3>Skills</h3>
                                    <div className="task-tags">
                                        {user.freelancerData.skills.map((skill, index) => {
                                            return (
                                                <span style={{ margin: "5px", backgroundColor: "blue", color: "white" }}>{skill.text}</span>
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
                                    <div className="top-left" onClick={() => {
                                        this.setState({
                                            isPaneOpen: !this.state.isPaneOpen
                                        })
                                    }}><label>Upload Background Photo</label><img src={require("../../../../../assets/icons/upload.png")} style={{ width: "50px", height: "50px" }} /> </div>
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
    handleCoverPhotoSubmission = () => {
        console.log("submitted.");

        axios.post("/upload/cover/photo", {
            username: this.props.username,
            picture: this.state.result
        }).then((res) => {
            if (res.data.message === "Successfully uploaded new photo!") {
                console.log("RES.DATA :", res.data);

                this.setState({
                    coverPhoto: res.data.image,
                    isPaneOpen: false
                }, () => {
                    alert("Successfully updated your cover photo!")
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    callback = (result) => {
        console.log("Callback RESULT... :", result);

        let trimmed;
        // prepare for axios upload - trim
        if (result.includes("data:image/jpeg;base64,")) {
            trimmed = result.split("data:image/jpeg;base64,")[1];
        } else if (result.includes("data:image/png;base64,")) {
            trimmed = result.split("data:image/png;base64,")[1];
        }
        // set state for axios call
        this.setState({
            callbackRan: true,
            result: trimmed
        });
    }
    render() {
        const { user, open } = this.state;
        console.log("ViewProfile state... :", this.state);
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                {this.renderContent()}
                <SlidingPane
                    className="panel-panel"
                    overlayClassName="panel-overlay-special"
                    isOpen={this.state.isPaneOpen}
                    title="Select your profile background photo..."
                    subtitle="Select a large photo that will be displayed behind your profile information"
                    onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                        this.setState({ isPaneOpen: false });
                    }}
                >
                <div className="content with-padding padding-bottom-10">
                <div class="container">
                    <div class="panel panel-default">
                        <div class="panel-heading"><strong>Upload Files</strong> <small> - Cover wall photo</small></div>
                        <div class="panel-body">

               
                        
                 
                        <h4>Or drag and drop files below</h4>
                        <Dropzone onDrop={acceptedFiles => {
                            console.log("acceptedFiles :", acceptedFiles);
                            
                            this.setState({
                                uploadedFile: acceptedFiles
                            }, () => {
                                this.getBase64(this.state.uploadedFile[0], this.callback);
                            })
                        }}>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <div class="upload-drop-zone" id="drop-zone">
                                            Just drag and drop files here
                                        </div>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                       
                        <div class="js-upload-finished">
                            <h3>Processed files</h3>
                                <div class="list-group">
                                   {this.state.uploadedFile !== null ?  <a class="list-group-item list-group-item-success"><span class="badge alert-success pull-right">Success</span>{this.state.uploadedFile[0].name}</a> : null}
                                   
                            </div>
                        </div>
                        <hr className="my-4" />
                        {this.state.uploadedFile !== null ? <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12">
                            <button style={{ width: "100%", color: "white" }} onClick={() => {
                                this.handleCoverPhotoSubmission();
                            }} className="btn blue-btn">Submit Cover Photo</button>
                        </div> : null}
                        </div>
                    </div>
                    </div>

                    
                   
                </div>
                </SlidingPane>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <div className="modal-body-container">
                    <div class="container bootstrap snippets bootdey">
                            <div class="panel panel-white post panel-shadow">
                                <div class="post-heading">
                                    
                                    <div class="pull-left meta">
                                        <div class="title h5">
                                            <a href="#"><b>{user !== null ? user.username : null} </b></a>
                                             - profile picture
                                        </div>
                                        <h6 class="text-muted time">{user !== null ? user.profilePics[user.profilePics.length - 1].date : null}</h6>
                                    </div>
                                </div> 
                                <div class="post-description"> 
                                    <img src={user !== null ? `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${user.profilePics[user.profilePics.length - 1].picture}` : null} className="cover-img" />
                                    <div class="stats">
                                        <a href="#" class="btn btn-default stat-item">
                                            <i class="fa fa-thumbs-up icon"></i>2
                                        </a>
                                        <a href="#" class="btn btn-default stat-item">
                                            <i class="fa fa-share icon"></i>12
                                        </a>
                                    </div>
                                </div>
                                <div class="post-footer">
                                    <div class="input-group"> 
                                        <input class="form-control" placeholder="Add a comment" type="text" />
                                        <span class="input-group-addon">
                                            <a href="#"><i class="fa fa-edit fa-3x"></i></a>  
                                        </span>
                                    </div>
                                    <ul class="comments-list">
                                        <li class="comment">
                                            <a class="pull-left" href="#">
                                                <img class="avatarrr" src="https://bootdey.com/img/Content/user_1.jpg" alt="avatar" />
                                            </a>
                                            <div class="comment-body">
                                                <div class="comment-heading">
                                                    <h4 class="user">Gavino Free</h4>
                                                    <h5 class="time">5 minutes ago</h5>
                                                </div>
                                                <p>Sure, oooooooooooooooohhhhhhhhhhhhhhhh</p>
                                            </div>
                                            <ul class="comments-list">
                                                <li class="comment">
                                                    <a class="pull-left" href="#">
                                                        <img class="avatarrr" src="https://bootdey.com/img/Content/user_3.jpg" alt="avatar"/>
                                                    </a>
                                                    <div class="comment-body">
                                                        <div class="comment-heading">
                                                            <h4 class="user">Ryan Haywood</h4>
                                                            <h5 class="time">3 minutes ago</h5>
                                                        </div>
                                                        <p>Relax my friend</p>
                                                    </div>
                                                </li> 
                                                <li class="comment">
                                                    <a class="pull-left" href="#">
                                                        <img class="avatarrr" src="https://bootdey.com/img/Content/user_2.jpg" alt="avatar"/>
                                                    </a>
                                                    <div class="comment-body">
                                                        <div class="comment-heading">
                                                            <h4 class="user">Gavino Free</h4>
                                                            <h5 class="time">3 minutes ago</h5>
                                                        </div>
                                                        <p>Ok, cool.</p>
                                                    </div>
                                                </li> 
                                                <li class="comment">
                                                    <a class="pull-left" href="#">
                                                        <img class="avatarrr" src="https://bootdey.com/img/Content/user_3.jpg" alt="avatar"/>
                                                    </a>
                                                    <div class="comment-body">
                                                        <div class="comment-heading">
                                                            <h4 class="user">Ryan Haywood</h4>
                                                            <h5 class="time">3 minutes ago</h5>
                                                        </div>
                                                        <p>Relax my friend</p>
                                                    </div>
                                                </li> 
                                                <li class="comment">
                                                    <a class="pull-left" href="#">
                                                        <img class="avatarrr" src="https://bootdey.com/img/Content/user_2.jpg" alt="avatar"/>
                                                    </a>
                                                    <div class="comment-body">
                                                        <div class="comment-heading">
                                                            <h4 class="user">Gavino Free</h4>
                                                            <h5 class="time">3 minutes ago</h5>
                                                        </div>
                                                        <p>Ok, cool.</p>
                                                    </div>
                                                </li> 
                                                <li class="comment">
                                                    <a class="pull-left" href="#">
                                                        <img class="avatarrr" src="https://bootdey.com/img/Content/user_3.jpg" alt="avatar"/>
                                                    </a>
                                                    <div class="comment-body">
                                                        <div class="comment-heading">
                                                            <h4 class="user">Ryan Haywood</h4>
                                                            <h5 class="time">3 minutes ago</h5>
                                                        </div>
                                                        <p>Relax my friend</p>
                                                    </div>
                                                </li> 
                                                <li class="comment">
                                                    <a class="pull-left" href="#">
                                                        <img class="avatarrr" src="https://bootdey.com/img/Content/user_2.jpg" alt="avatar"/>
                                                    </a>
                                                    <div class="comment-body">
                                                        <div class="comment-heading">
                                                            <h4 class="user">Gavino Free</h4>
                                                            <h5 class="time">3 minutes ago</h5>
                                                        </div>
                                                        <p>Ok, cool.</p>
                                                    </div>
                                                </li> 
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
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