import React, { Component } from 'react';
import axios from "axios";
import "./style.css";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

class IndividualJobsHelperDetails extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        user: null,
        responses: [],
        ready: false,
        open: false,
        modalInfo: null
    }
}
    onOpenModal = () => {
        this.setState({ open: true });
    };
 
    onCloseModal = () => {
        this.setState({ open: false });
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
        console.log("send message...");

    }
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
                                                                        <button style={{ marginTop: "-23px" }}  onClick={this.sendMessage} class="blue-btn popup-with-zoom-anim button dark ripple-effect"><i class="icon-feather-mail"></i> Send Message</button>
                                                                        <a href="#" class="button gray ripple-effect ico" title="Remove Candidate" data-tippy-placement="top"><i class="icon-feather-trash-2"></i></a>
                                                                    </div>
                                                                    <div className="float-btn-right">
                                                                        <button className="btn red-btn" style={{ color: "white" }}>Remove/Delete Applicant</button>
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
export default IndividualJobsHelperDetails;


