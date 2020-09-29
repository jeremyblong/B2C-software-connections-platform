import React, { Component } from 'react';
import axios from "axios";
import "./style.css";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { NotificationManager} from 'react-notifications';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

class IndividualJobsHelperDetails extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        user: null,
        responses: [],
        ready: false,
        open: false,
        modalInfo: null,
        messageOpen: false,
        messageMessage: "",
        messageSubject: "",
        selectedUser: null,
        show_cover_letter: false,
        index: 0,
        response: ""
    }
}
    onOpenModal = () => {
        this.setState({ open: true });
    };
 
    onCloseModal = () => {
        this.setState({ open: false });
    };
    onCloseModalTwo = () => {
        this.setState({ messageOpen: false });
    };
    componentDidMount() {
        axios.post("/gather/posted/job/by/id/specific/job", {
            id: this.props.match ? this.props.match.params.id : this.props.props.match.params.id
        }).then((response) => {
            if (response.data.message === "Found Specific User!") {
                console.log("response data ---- :", response.data);
                for (let indexxxx = 0; indexxxx < response.data.job_data.responses.length; indexxxx++) {
                    const responseee = response.data.job_data.responses[indexxxx];
                        
                        axios.post("/get/user/profile/picture", {
                            username: responseee.sender
                        }).then((res) => {
                            if (res.data.message === "Found user image!") {
                                responseee.picture = `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${res.data.picture_id}`;
                                responseee.email = res.data.user.email;
                                responseee.phoneNumber = res.data.user.phoneNumber;
                                responseee.experience = `${res.data.user.experience} years of software dev experience`;
                                responseee.accountType = res.data.user.accountType;
                                responseee.username = res.data.user.username;

                                this.setState({
                                    responses: [...this.state.responses, responseee]
                                })
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                }
                this.setState({
                    ready: true,
                    user: response.data.job_data
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    sendMessage = () => {
        console.log("send message...", this.props.username);

        const { messageMessage, messageSubject, selectedUser } = this.state;

        axios.post("/create/messaging/channel", {
            username: this.props.username, 
            otherUser: selectedUser.sender, 
            message_subject: messageSubject, 
            message: messageMessage
        }).then((res) => {
            if (res.data.message === "Successfully generated channel!") {
                console.log(res.data);
                
                NotificationManager.success('Successfully generated channel and sent your message!', 'Action Was Successful!', 6000);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    unselectApplicant = (response) => {
        console.log("remove applicant...");

        const { id, title, sender, description } = response;

        const action_data = {
            title: this.state.user.title,
            desc: description,
            billing: {},
            listing_id: id
        }

        axios.put("/remove/applicant/job/posting/individual", {
            username_authenticated_user: this.props.username,
            username_application: sender,
            id_application: this.props.match.params.id,
            response_id: id,
            action_data
        }).then((res) => {
            if (res.data.message === "Found and removed selected response!") {
                console.log("success", res.data);

                this.setState({
                    responses: this.state.responses.filter((itemmm) => {
                        return itemmm.id !== response.id
                    })
                })
            } else {
                console.log("failure", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    acceptApplicantForJob = (response) => {
        console.log("accept applicant.", response);

        const { user } = this.state;

        const action_data = {
            title: user.title,
            billing: user.billing,
            listing_id: this.props.match ? this.props.match.params.id : this.props.props.match.params.id
        }

        axios.post("/accept/application/bids/start/project", {
            other_user: response.sender,
            current_user: this.props.username,
            response,
            action_data,
            related_job: this.props.match ? this.props.match.params.id : this.props.props.match.params.id,
            signed_in: this.props.username,
            application_id_linked: response.id
        }).then((res) => {
            if (res.data.message === "Successfully started project between BOTH users!") {
                console.log(res.data);

                const users_to_update = [];

                for (let xxxxxxx = 0; xxxxxxx < this.state.responses.length; xxxxxxx++) {
                    const responseeeeee = this.state.responses[xxxxxxx];
                    
                    console.log("RESPONSEEEEE..... :", responseeeeee);

                    if (responseeeeee.sender !== response.sender) {
                        users_to_update.push(responseeeeee.sender);
                    }
                }

                axios.post("/denied/change/condition/other/users", {
                    username: response.sender,
                    users_to_update,
                    response,
                    action_data,
                    related_job: this.props.match ? this.props.match.params.id : this.props.props.match.params.id,
                    signed_in: this.props.username,
                    application_id_linked: response.id
                }).then((responseeeee) => {
                    if (responseeeee.data.message === "Successfully updated users application status and made appropriate changes!") {
                        console.log(responseeeee.data);   
                    }
                }).catch((err) => {
                    console.log(err);
                })

                for (let indexxxxx = 0; indexxxxx < res.data.new_responses.length; indexxxxx++) {
                    const narrowed_response = res.data.new_responses[indexxxxx];
                    
                    console.log("narrowed_Response:", narrowed_response);

                    axios.post("/gather/specific/user/username", {
                        username: narrowed_response.sender
                    }).then((returned_res) => {
                        narrowed_response.picture = `https://s3.us-west-1.wasabisys.com/software-gateway-platform/${returned_res.data.user.profilePics[returned_res.data.user.profilePics.length - 1].picture}`;
                        narrowed_response.email = returned_res.data.user.email;
                        narrowed_response.phoneNumber = returned_res.data.user.phoneNumber;
                        narrowed_response.experience = `${returned_res.data.user.experience} years of software dev experience`;
                        narrowed_response.accountType = returned_res.data.user.accountType;

                        this.setState({
                            responses: [narrowed_response]
                        }, () => {
                            NotificationManager.success("You've successfully selected your candiate for this position! We will notify everyone else of the decided freelancer...", 'Action Was Successful!', 6000);
                        })
                    }).catch((error) => {
                        console.log(error);
                    })
                }
                
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    decisions = (response) => {
        confirmAlert({
          title: "Are you sure you'd like to remove this application?",
          message: "This action cannot be undone - please be sure about your decision...",
          buttons: [
            {
              label: 'Remove Applicant',
              onClick: () => {
                  console.log("remove applicant...")
                  this.unselectApplicant(response);
              }
            },
            {
              label: 'CANCEL',
              onClick: () => {
                console.log("do nothing - unselect.");

              }
            }
          ]
        });
      };
    render() {
        const { modalInfo } = this.state;

        console.log("individual-job-details state... :", this.state);
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                <div class="dashboard-container">
                    <div class="dashboard-sidebar">
                        <div class="dashboard-sidebar-inner" data-simplebar>
                            <div class="dashboard-nav-container">

                                <a href="#" class="dashboard-responsive-nav-trigger">
                                    <span class="hamburger hamburger--collapse" >
                                        <span class="hamburger-box">
                                            <span class="hamburger-inner"></span>
                                        </span>
                                    </span>
                                    <span class="trigger-title">Dashboard Navigation</span>
                                </a>
                                
                           
                                <div class="dashboard-nav">
                                    <div class="dashboard-nav-inner">

                                        <ul data-submenu-title="Start">
                                            <li><a href="dashboard.html"><i class="icon-material-outline-dashboard"></i> Dashboard</a></li>
                                            <li><a href="dashboard-messages.html"><i class="icon-material-outline-question-answer"></i> Messages <span class="nav-tag">2</span></a></li>
                                            <li><a href="dashboard-bookmarks.html"><i class="icon-material-outline-star-border"></i> Bookmarks</a></li>
                                            <li><a href="dashboard-reviews.html"><i class="icon-material-outline-rate-review"></i> Reviews</a></li>
                                        </ul>
                                        
                                        <ul data-submenu-title="Organize and Manage">
                                            <li class="active-submenu"><a href="#"><i class="icon-material-outline-business-center"></i> Jobs</a>
                                                <ul>
                                                    <li><a href="dashboard-manage-jobs.html">Manage Jobs <span class="nav-tag">3</span></a></li>
                                                    <li><a href="dashboard-manage-candidates.html">Manage Candidates</a></li>
                                                    <li><a href="dashboard-post-a-job.html">Post a Job</a></li>
                                                </ul>	
                                            </li>
                                            <li><a href="#"><i class="icon-material-outline-assignment"></i> Tasks</a>
                                                <ul>
                                                    <li><a href="dashboard-manage-tasks.html">Manage Tasks <span class="nav-tag">2</span></a></li>
                                                    <li><a href="dashboard-manage-bidders.html">Manage Bidders</a></li>
                                                    <li><a href="dashboard-my-active-bids.html">My Active Bids <span class="nav-tag">4</span></a></li>
                                                    <li><a href="dashboard-post-a-task.html">Post a Task</a></li>
                                                </ul>	
                                            </li>
                                        </ul>

                                        <ul data-submenu-title="Account">
                                            <li><a href="dashboard-settings.html"><i class="icon-material-outline-settings"></i> Settings</a></li>
                                            <li><a href="index-logged-out.html"><i class="icon-material-outline-power-settings-new"></i> Logout</a></li>
                                        </ul>
                                        
                                    </div>
                                </div>
                               

                            </div>
                        </div>
                    </div>
              


                    <div class="dashboard-content-container">
                        <div class="dashboard-content-inner" >
                            
                   
                            <div class="dashboard-headline">
                                <h3>Manage Candidates</h3>
                                <span class="margin-top-7 top-mobile">Job Applications for <a href="#" className="blue-text">{this.state.user !== null && (this.state.user.responses) ? this.state.user.title : "Could NOT load title..."}</a></span>

                                <nav style={{ marginTop: "-40px" }} id="breadcrumbs" class="dark">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">Dashboard</a></li>
                                        <li>Manage Candidates</li>
                                    </ul>
                                </nav>
                            </div>

                     
                            <div class="row">

                                
                                <div class="col-xl-12">
                                    <div class="dashboard-box margin-top-0">

                                      
                                        <div class="headline">
                                            <h3><i class="icon-material-outline-supervisor-account"></i> {this.state.user !== null && (this.state.user.responses) ? this.state.user.responses.length : "0"} Candidates</h3>
                                        </div>

                                        <div class="content">
                                            <ul class="dashboard-box-list">
                                            {this.state.ready === true ? this.state.responses.map((response, index) => {
                                                console.log("response", response);
                                                return (
                                                    <li>
                                                
                                                        <div class="freelancer-overview manage-candidates">
                                                            <div class="freelancer-overview-inner">

                                                    
                                                                <div onClick={() => {
                                                                    this.setState({
                                                                        modalInfo: response
                                                                    }, () => {
                                                                        this.onOpenModal();
                                                                    })
                                                                }} class="freelancer-avatar">
                                                                    <div class="verified-badge"></div>
                                                                    <a href="#"><img src={response.picture} alt={"profile-pictures"} /></a>
                                                                </div>

                                                            
                                                                <div class="freelancer-name">
                                                                    <div className="mr-auto float-right-btn">
                                                                        <button onClick={() => {
                                                                            this.setState({
                                                                                modalInfo: response
                                                                            }, () => {
                                                                                this.onOpenModal();
                                                                            })
                                                                        }} style={{ color: "white" }} className="btn blue-btn">View Interview Questions</button>
                                                                    </div>
                                                                    <h4><a href="#">{response.sender} <img class="flag" src="/images/flags/au.svg" alt="" title="Australia" data-tippy-placement="top"/></a></h4>
                                                                    <p>{response.title}</p>
                                                                    <br />
                                                                    
                                                                    <p>{response.cover_letter_message ? `${response.cover_letter_message.slice(0, 250)}${response.cover_letter_message.length >= 250 ? "..." : ""}` : null}<i onClick={() => {
                                                                        this.setState({
                                                                            show_cover_letter: !this.state.show_cover_letter,
                                                                            response: response.cover_letter_message
                                                                        })
                                                                    }} id={`Popover${index}`} class="fa fa-info-circle fa-2x"></i></p>
                                                                    
                                                                    <hr />
                                                                    <span class="freelancer-detail-item"><a href="#"><i class="icon-feather-mail"></i> {response.email}</a></span>
                                                                    <span class="freelancer-detail-item"><i class="icon-feather-phone"></i> {response.phoneNumber}</span>
                                                                    <br />
                                                                    <span class="freelancer-detail-item"><i class="icon-feather-time"></i> {response.experience}</span>
                                                                    <br />
                                                                    <span class="freelancer-detail-item"><i class="icon-feather-mail"></i> {response.accountType}</span>
                                                                    <p>{response.date}</p>
                                                                
                                                                    <div class="freelancer-rating">
                                                                        <div class="star-rating" data-rating="5.0"></div>
                                                                    </div>
                                                                
                                                                    <div class="buttons-to-right always-visible margin-top-25 margin-bottom-5">
                                                                        {typeof response.attachedFiles !== "undefined" && response.attachedFiles ? response.attachedFiles.map((file, index) => {
                                                                            return <a key={index} href={`https://s3.us-west-1.wasabisys.com/software-gateway-platform/${file.picture}`} class="button ripple-effect" download><i class="icon-feather-file-text"></i> Download {file.title}</a>;
                                                                        }) : null}
                                                                        <button onClick={() => {
                                                                            this.setState({
                                                                                messageOpen: !this.state.messageOpen,
                                                                                selectedUser: response
                                                                            })
                                                                        }} style={{ marginTop: "-23px" }} class="blue-btn popup-with-zoom-anim button dark ripple-effect"><i class="icon-feather-mail"></i> Send Message</button>
                                                                        <a href="#" class="button gray ripple-effect ico" title="Remove Candidate" data-tippy-placement="top"><i class="icon-feather-trash-2"></i></a>
                                                                    </div>
                                                                    <div id="up-on-desk" className="float-btn-right">
                                                                        <button onClick={() => {
                                                                            this.decisions(response);
                                                                        }} className="btn red-btn" style={{ color: "white" }}>Remove/Delete Applicant</button>
                                                                    </div>
                                                                    <hr className="my-4" />
                                                                    <div id="up-on-desk" className="float-btn-right">
                                                                        <button onClick={() => {
                                                                            this.acceptApplicantForJob(response);
                                                                        }} className="btn btn-success" style={{ color: "white" }}>Accept Applicant</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            }) : null}
                                            

                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {modalInfo !== null ? <Modal open={this.state.open} onClose={this.onCloseModal} center>
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                            <h4 class="modal-title" id="myModalLabel">More About: <strong style={{ color: "blue" }}>{modalInfo.username}</strong></h4>
                                            </div>
                                        <div class="modal-body">
                                            <center>
                                            <a><img src={modalInfo.picture} name="aboutme" width="140" height="140" border="0" class="img-circle"/></a>
                                            <h3 class="media-heading" style={{ marginTop: "20px" }}>{modalInfo.username} <small>USA</small></h3>
                                            {/* <span><strong>Skills: </strong></span>
                                                <span class="label label-warning">HTML5/CSS</span>
                                                <span class="label label-info">Adobe CS 5.5</span>
                                                <span class="label label-info">Microsoft Office</span>
                                                <span class="label label-success">Windows XP, Vista, 7</span> */}
                                            </center>
                                            <hr />
                                            <center>
                                            <p class="text-left"><strong>Interview Questions: </strong><br/></p>
                                            <div>
                                            <div class="numbered custom-numbered color">
                                                <ol>
                                                    {typeof modalInfo.firstQuestion !== "undefined" && modalInfo.firstQuestion ? <li>Question: {modalInfo.firstQuestion.question}</li> : null}
                                                    {typeof modalInfo.firstQuestion !== "undefined" && modalInfo.firstQuestion ? <label>Answer: {modalInfo.firstQuestion.answer}</label> : null}
                                                    {typeof modalInfo.secondQuestion !== "undefined" && modalInfo.secondQuestion ? <li>Question: {modalInfo.secondQuestion.question}</li> : null}
                                                    {typeof modalInfo.secondQuestion !== "undefined" && modalInfo.secondQuestion ? <label>Answer: {modalInfo.secondQuestion.answer}</label> : null}
                                                    {typeof modalInfo.thirdQuestion !== "undefined" && modalInfo.thirdQuestion ? <li>Question: {modalInfo.thirdQuestion.question}</li> : null}
                                                    {typeof modalInfo.thirdQuestion !== "undefined" && modalInfo.thirdQuestion ? <label>Answer: {modalInfo.thirdQuestion.answer}</label> : null}
                                                    {typeof modalInfo.fourthQuestion !== "undefined" && modalInfo.fourthQuestion ? <li>Question: {modalInfo.fourthQuestion.question}</li> : null}
                                                    {typeof modalInfo.fourthQuestion !== "undefined" && modalInfo.fourthQuestion ? <label>Answer: {modalInfo.fourthQuestion.answer}</label> : null}
                                                    {typeof modalInfo.fifthQuestion !== "undefined" && modalInfo.fifthQuestion ? <li>Question: {modalInfo.fifthQuestion.question}</li> : null}
                                                    {typeof modalInfo.fifthQuestion !== "undefined" && modalInfo.fifthQuestion ? <label>Answer: {modalInfo.fifthQuestion.answer}</label> : null}
                                                </ol>
                                            </div>
                                            </div>
                                            <br/>
                                            </center>
                                        </div>
                                        <div class="modal-footer">
                                            <center>
                                            <button onClick={this.onCloseModal} type="button" class="btn btn-default" data-dismiss="modal">I've heard enough about <strong style={{ color: "blue" }}>{modalInfo.username}</strong></button>
                                            </center>
                                        </div>
                                    </div>
                                </div>
                        </Modal>  : null}  

                        <Modal open={this.state.messageOpen} onClose={this.onCloseModalTwo} center>
                
                                <div class="loginmodal-container">
                                    <h1>Construct Your Private Message </h1><br />
                                    <form onSubmit={(e) => {
                                        e.preventDefault();

                                        this.setState({
                                            messageOpen: false
                                        }, () => {
                                            this.sendMessage();
                                        })
                                    }}>
                                        <input className="form-control my-input" onChange={(e) => {
                                            this.setState({
                                                messageSubject: e.target.value
                                            })
                                        }} type="text" placeholder="Enter your message subject..."/>
                                        <textarea onChange={(e) => {
                                            this.setState({
                                                messageMessage: e.target.value
                                            })
                                        }} rows={6} className="form-control my-input" type="text" placeholder="Enter your message here..."/>
                                        <input type="submit" name="send-message" class="login loginmodal-submit" value="Send Message"/>
                                    </form>
                                        
                                    {/* <div class="login-help">
                                        <a href="#">Register</a> - <a href="#">Forgot Password</a>
                                    </div> */}
                                </div>
                        
                    
                    </Modal>      
                    <Modal open={this.state.show_cover_letter} onClose={() => {
                        this.setState({
                            show_cover_letter: false
                        })
                    }} center>
                        <div class="loginmodal-container">
                            <p className="lead text-center">{this.state.response}</p>
                        </div>
                    </Modal>            
                            <div class="dashboard-footer-spacer"></div>
                            <div class="small-footer margin-top-15">
                                <div class="small-footer-copyrights">
                                    © 2019 <strong>Hireo</strong>. All Rights Reserved.
                                </div>
                                <ul class="footer-social-links">
                                    <li>
                                        <a href="#" title="Facebook" data-tippy-placement="top">
                                            <i class="icon-brand-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="Twitter" data-tippy-placement="top">
                                            <i class="icon-brand-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="Google Plus" data-tippy-placement="top">
                                            <i class="icon-brand-google-plus-g"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="LinkedIn" data-tippy-placement="top">
                                            <i class="icon-brand-linkedin-in"></i>
                                        </a>
                                    </li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>
                        

                        </div>
                    </div>
                                                
                    </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    for (const key in state.auth) {
        const obj = state.auth;
        if (obj.authenticated.hasOwnProperty("email")) {
            return {
                username: state.auth.authenticated.username,
                getStreamToken: state.getStreamInfo.getStreamToken
            }
        }
    }
}
export default withRouter(connect(mapStateToProps, {  })(IndividualJobsHelperDetails));


