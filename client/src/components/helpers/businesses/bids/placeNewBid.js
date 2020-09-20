import React, { Component, Fragment } from 'react';
import "./style.css";
import uuid from 'react-uuid';
import moment from "moment";
import { connect } from "react-redux";
import axios from "axios";
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Link, withRouter } from "react-router-dom";
import Dropzone from 'react-dropzone'
import { NotificationManager} from 'react-notifications';


class PlaceNewBidHelper extends Component {
constructor(props) {
    super(props)
 
    this.state = {
        passed: null,
        loaded: false,
        orderNumber: uuid(),
        user: null,
        popoverOpen: false,
        receipient: null,
        intro: "",
        note: "",
        files: [],
        acceptedFile: null,
        normalFile: null,
        question0: null,
        question1: null,
        question2: null,
        question3: null,
        question4: null
    }
}
    componentDidMount() {
        this.setState({
            passed: this.props.data,
            loaded: true
        });
        
        axios.post("/gather/specific/user/username", {
            username: this.props.username
        }).then((res) => {
            if (res.data.message === "Found Specific User!") {
                console.log(res.data);
                
                this.setState({
                    user: res.data.user
                })
            }
        }).catch((err) => {
            console.log(err);
        })

        axios.post("/gather/posted/job/by/id", {
            id: this.props.data ? this.props.data.id : null
        }).then((res) => {
            if (res.data.message === "Found Specific User!") {
                console.log(res.data);
                
                this.setState({
                    receipient: res.data.user
                })
            } else {
                console.log(res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    toggle = () => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        })
    }
    handleSubmissionFinal = () => {
        console.log("clicked - submission.", this.state);

        const { intro, note, files, receipient, question0, question1, question2, question3, question4, passed } = this.state;

        switch (passed.questions_for_applicant.length) {
            case 1:
                if (intro.length > 0 && note.length > 0 && question0 !== null) {
                    axios.post("/submit/proposal/freelancer", {
                        intro,
                        cover_letter_note: note,
                        files: files.length > 0 ? files : null,
                        username: this.props.username,
                        otherUser: receipient.username,
                        passed_id: this.props.data.id,
                        firstQuestion: question0,
                        action_data: {
                            title: passed.title,
                            desc: passed.description,
                            billing: passed.billing,
                            listing_id: passed.id
                        }
                    }).then((res) => {
                        if (res.data.message === "Found and updated appropriate users!") {
                            console.log(res.data);
        
                            NotificationManager.success(`You've successfully applied for this position! We hope you get the gig!`, 'Successfully applied for position!');
        
                            setTimeout(() => {
                                this.props.history.push("/display/jobs/main");
                            }, 3000);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    NotificationManager.error('Make sure you complete each and every required field...', 'ERROR', 7000);
                }               
                break;
            case 2: 
                if (intro.length > 0 && note.length > 0 && question0 !== null && question1 !== null) {
                    axios.post("/submit/proposal/freelancer", {
                        intro,
                        cover_letter_note: note,
                        files: files.length > 0 ? files : null,
                        username: this.props.username,
                        otherUser: receipient.username,
                        passed_id: this.props.data.id,
                        firstQuestion: question0,
                        secondQuestion: question1,
                        action_data: {
                            title: passed.title,
                            desc: passed.description,
                            billing: passed.billing,
                            listing_id: passed.id
                        }
                    }).then((res) => {
                        if (res.data.message === "Found and updated appropriate users!") {
                            console.log(res.data);
        
                            NotificationManager.success(`You've successfully applied for this position! We hope you get the gig!`, 'Successfully applied for position!');
        
                            setTimeout(() => {
                                this.props.history.push("/display/jobs/main");
                            }, 3000);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    NotificationManager.error('Make sure you complete each and every required field...', 'ERROR', 7000);
                }
                break;
            case 3:
                if (intro.length > 0 && note.length > 0 && question0 !== null && question1 !== null && question2 !== null) {
                    axios.post("/submit/proposal/freelancer", {
                        intro,
                        cover_letter_note: note,
                        files: files.length > 0 ? files : null,
                        username: this.props.username,
                        otherUser: receipient.username,
                        passed_id: this.props.data.id,
                        firstQuestion: question0,
                        secondQuestion: question1,
                        thirdQuestion: question2,
                        action_data: {
                            title: passed.title,
                            desc: passed.description,
                            billing: passed.billing,
                            listing_id: passed.id
                        }
                    }).then((res) => {
                        if (res.data.message === "Found and updated appropriate users!") {
                            console.log(res.data);
        
                            NotificationManager.success(`You've successfully applied for this position! We hope you get the gig!`, 'Successfully applied for position!');
        
                            setTimeout(() => {
                                this.props.history.push("/display/jobs/main");
                            }, 3000);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    NotificationManager.error('Make sure you complete each and every required field...', 'ERROR', 7000);
                }                
                break;
            case 4: 
                if (intro.length > 0 && note.length > 0 && question0 !== null && question1 !== null && question2 !== null && question3 !== null) {
                    axios.post("/submit/proposal/freelancer", {
                        intro,
                        cover_letter_note: note,
                        files: files.length > 0 ? files : null,
                        username: this.props.username,
                        otherUser: receipient.username,
                        passed_id: this.props.data.id,
                        firstQuestion: question0, 
                        secondQuestion: question1, 
                        thirdQuestion: question2, 
                        fourthQuestion: question3,
                        action_data: {
                            title: passed.title,
                            desc: passed.description,
                            billing: passed.billing,
                            listing_id: passed.id
                        }
                    }).then((res) => {
                        if (res.data.message === "Found and updated appropriate users!") {
                            console.log(res.data);
        
                            NotificationManager.success(`You've successfully applied for this position! We hope you get the gig!`, 'Successfully applied for position!');
        
                            setTimeout(() => {
                                this.props.history.push("/display/jobs/main");
                            }, 3000);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    NotificationManager.error('Make sure you complete each and every required field...', 'ERROR', 7000);
                }
                break;
            case 5:
                if (intro.length > 0 && note.length > 0 && question0 !== null && question1 !== null && question2 !== null && question3 !== null && question4 !== null) {
                    axios.post("/submit/proposal/freelancer", {
                        intro,
                        cover_letter_note: note,
                        files: files.length > 0 ? files : null,
                        username: this.props.username,
                        otherUser: receipient.username,
                        passed_id: this.props.data.id,
                        firstQuestion: question0, 
                        secondQuestion: question1, 
                        thirdQuestion: question2, 
                        fourthQuestion: question3, 
                        fifthQuestion: question4,
                        action_data: {
                            title: passed.title,
                            desc: passed.description,
                            billing: passed.billing,
                            listing_id: passed.id
                        }
                    }).then((res) => {
                        if (res.data.message === "Found and updated appropriate users!") {
                            console.log(res.data);
        
                            NotificationManager.success(`You've successfully applied for this position! We hope you get the gig!`, 'Successfully applied for position!');
        
                            setTimeout(() => {
                                this.props.history.push("/display/jobs/main");
                            }, 3000);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    NotificationManager.error('Make sure you complete each and every required field...', 'ERROR', 7000);
                }           
                break;
            default:
                break;
        }
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

        if (result.includes("data:image/png;base64,")) {
            this.setState({
                files: [...this.state.files, {
                    title: this.state.acceptedFile[0].name,
                    picture64: result.split("data:image/png;base64,")[1],
                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a")
                }],
                normalFile: result
            })
        } else if (result.includes("data:image/jpeg;base64,")) {
            this.setState({
                files: [...this.state.files, {
                    title: this.state.acceptedFile[0].name,
                    picture64: result.split("data:image/jpeg;base64,")[1],
                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a")
                }],
                normalFile: result
            })
        } else if (result.includes("data:image/jpg;base64,")) {
            this.setState({
                files: [...this.state.files, {
                    title: this.state.acceptedFile[0].name,
                    picture64: result.split("data:image/jpg;base64,")[1],
                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a")
                }],
                normalFile: result
            })
        } else if (result.includes("data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,")) {
            this.setState({
                files: [...this.state.files, {
                    title: this.state.acceptedFile[0].name,
                    picture64: result.split("data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,")[1],
                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a")
                }],
                normalFile: result
            })
        }
    }
    renderConditional = () => {
        const { loaded, user, passed, receipient } = this.state;

        if (loaded === true && user !== null && passed !== null && receipient !== null) {

            console.log(this.state);

            return (
               <Fragment>
                    <div className="container">
                    <div class="row">
                        <Link to="/display/jobs/main" className="btn blue-btn" style={{ marginTop: "25px", color: "white", width: "100%" }}>Go Back To Main Job Page</Link>
                      
                        <div class="col-xl-12">
                            <div class="dashboard-box margin-top-0">

                              
                                <div class="headline">
                                    <h3><i class="icon-feather-folder-plus"></i> Job Submission Form</h3>
                                </div>

                                <div class="content with-padding padding-bottom-10">
                                    <div class="row">

                                        <div class="col-xl-12">
                                            <div class="submit-field">
                                                <h5>Intro Message / Introduction header (Required)</h5>
                                                <input className="form-control" onChange={(e) => {
                                                    this.setState({
                                                        intro: e.target.value
                                                    })
                                                }} type="text" placeholder={"Hope this message finds you well, I am interested in being your developer as my experience matches closely to the desired skills..."}/>
                                            </div>
                                        </div>

                                        

                                        <div class="col-xl-12">
                                            <div class="submit-field">
                                                <h5>Cover Letter / Personal Note / Reason To Hire (Required)</h5>
                                                
                                                <div class="margin-top-30">
                                                    <textarea multiline rows={"10"} placeholder={"Please enter your cover letter or a brief intro about yourself..."} onChange={(e) => {
                                                        this.setState({
                                                            note: e.target.value
                                                        })
                                                    }} class="form-control" />

                                                    <hr className="my-4" />
                                                    {passed.questions_for_applicant ? passed.questions_for_applicant.map((question, index) => {
                                                        return (
                                                            <Fragment>
                                                                <div className="col-md-12 col-lg-12 col-sm-12">
                                                                    <label>{question}</label>
                                                                    <input className="form-control" placeholder={question} onChange={(e) => {
                                                                        this.setState({
                                                                            [`question${index}`]: {
                                                                                question,
                                                                                answer: e.target.value
                                                                            }
                                                                        })
                                                                    }} style={{ width: "100%" }} />
                                                                </div>
                                                            </Fragment>
                                                        );
                                                    }) : null}
                                                        <Dropzone onDrop={acceptedFile => {

                                                            console.log(acceptedFile);

                                                            this.setState({
                                                                acceptedFile
                                                            }, () => {
                                                                this.getBase64(this.state.acceptedFile[0], this.callback)
                                                            })
                                                        }}>
                                                            {({getRootProps, getInputProps}) => (
                                                                <section>
                                                                <div {...getRootProps()}>
                                                                    <input {...getInputProps()} />
                                                                    <div className="dotted-box">
                                                                        <label style={{ marginTop: "40px" }}>Drag n' Drop your files here...</label>
                                                                    </div>
                                                                </div>
                                                                </section>
                                                            )}
                                                        </Dropzone>
                                                        {this.state.files ? this.state.files.map((file, index) => {
                                                            return (
                                                                <div class="alert alert-primary" style={{ width: "100%" }} role="alert">
                                                                    {file.title}
                                                                </div>
                                                            );
                                                        }) : null}
                                                    {/* <span class="uploadButton-file-name">Images or documents that might be helpful in describing your job</span> */}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>


                        </div>
                </div>
                    <hr className="my-4" />

                                                       
         
                    <div id="invoice">
                        <div>
                            <button onClick={this.handleSubmissionFinal} className="btn red-btn" style={{ margin: "30px 0px", width: "100%", color: "white" }}>Submit Proposal</button>
                        </div>                                 
                        <div class="row">
                            <div class="col-xl-6">
                                <div id="logo"><img src="/images/logo.png" alt=""/></div>
                            </div>

                            <div class="col-xl-6">	

                                <p id="details">
                                    <strong>Order:</strong> {this.state.orderNumber} <br/>
                                    <strong>Issued:</strong> {moment(new Date()).format("dddd, MMMM Do YYYY, h:mm a")} <br/>
                                    Due 7 days from date of issue
                                </p>
                            </div>
                        </div>


                     
                        <div class="row">
                            <div class="col-xl-12">
                                <h2>Invoice</h2>
                            </div>

                            <div class="col-xl-6">	
                                <strong class="margin-bottom-5">Applicant</strong>
                                <p>
                                <strong style={{ color: "blue" }}>Username:</strong>  {user.username}<br />
                                <strong style={{ color: "blue" }}>Account Type:</strong>  {user.accountType}<br />
                                <strong style={{ color: "blue" }}>Nationality / Location:</strong>  {user.nationality}<br />
                                <img src={`https://s3.us-west-1.wasabisys.com/software-gateway-platform/${user.profilePics[user.profilePics.length -1].picture}`} style={{ width: "70px", height: "70px", marginTop: "20px" }} />
                                </p>
                            </div>

                            <div class="col-xl-6">	
                                <strong class="margin-bottom-5">Customer</strong>
                                <p>
                                    <strong style={{ color: "blue" }}>Username:</strong>  {receipient.username}<br />
                                    <strong style={{ color: "blue" }}>Account Type:</strong>  {receipient.accountType}<br />
                                    <img src={`https://s3.us-west-1.wasabisys.com/software-gateway-platform/${receipient.profilePics[receipient.profilePics.length -1].picture}`} style={{ width: "70px", height: "70px", marginTop: "20px" }} />
                                </p>
                            </div>
                        </div>


                        
                        <div class="row">
                            <div class="col-xl-12">
                                <table class="margin-top-20">
                                    <tr>
                                        <th>Job Desc.</th>
                                        <th>Price</th>
                                        <th>Currency</th>
                                        <th>Rate</th>
                                        <th>Total</th>
                                    </tr>

                                    <tr>
                                        <td>{passed.title.slice(0, 40)}{passed.title.length >= 40 ? "..." : ""} <i type="button" class="fa fa-info-circle" id="Popover1"></i><Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                                            <PopoverHeader>Title</PopoverHeader>
                                            <PopoverBody id="white-back">{passed.title}</PopoverBody>
                                        </Popover></td> 
                                        <td>{`${passed.billing.pay}.00`}</td>
                                        <td>{passed.billing.currency}</td>
                                        <td>{passed.billing.rate}</td>
                                        <td>{`${passed.billing.pay}.00 ${passed.billing.currency} Per ${passed.billing.rate === "FIXED" ? "Project" : "Hour"}`}</td>
                                    </tr>
                                </table>
                            </div>
                            
                            <div class="col-xl-4 col-xl-offset-8">	
                                <table id="totals">
                                    <tr>
                                        <th>Total Due</th> 
                                        <th><span>{passed.billing.rate === "FIXED" ? `$${passed.billing.pay} Per Project` : "Varies - Hourly"}</span></th>
                                    </tr>
                                </table>
                            </div>
                        </div>


              
                        <div class="row">
                            <div class="col-xl-12">
                                <ul id="footerrr">
                                    <li><span>www.therealcoders.com</span></li>
                                    <li>jeremyablong@icloud.com</li>
                                    <li>(213)-248-8623</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <button onClick={this.handleSubmissionFinal} className="btn red-btn" style={{ margin: "30px 0px", width: "100%", color: "white" }}>Submit Proposal</button>
                        </div>       
                    </div>
               </Fragment>
            );
        } else {
            return (
                <div>
                   <div id="titlebar" class="gradient">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">

                                    <h2>Oops, Page Didn't Load</h2>

                                    <nav id="breadcrumbs" class="dark">
                                        <ul>
                                            <li><a href="#">Home</a></li>
                                            <li>404 Not Found</li>
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
                                    <h2>404 <i class="icon-line-awesome-question-circle"></i></h2>
                                    <p>We're sorry but we are experiencing and error... Please navigate from the homepage back to this page to render the correct results (error free)</p>
                                </section>

                                <div class="row">
                                    <div class="col-xl-8 offset-xl-2">
                                            <div class="intro-banner-search-form not-found-search margin-bottom-50">
                                              
                                                <div class="intro-search-field ">
                                                    <input id="intro-keywords" type="text" placeholder="What Are You Looking For?"/>
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
                </div>
            );
        }
    }
    render() {
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                {this.renderConditional()}
            </div>
        )
    }
}
const mapStateToProps = state => {
    for (const key in state.auth) {
      const obj = state.auth;
      if (obj.authenticated && (obj.authenticated.hasOwnProperty("email"))) {
        return {
          username: state.auth.authenticated.username
        }
      } 
    }
  }
export default withRouter(connect(mapStateToProps, { })(PlaceNewBidHelper));
