import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import "./style.css";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class SignupDescriptionHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        description: "",
        acceptedFile: null,
        files: [],
        normalFile: null,
        descErr: ""
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
    handleSubmission = () => {

        console.log("handle submission...");

        if (this.state.description.length >= 100) {
            if (this.state.files.length !== 0) {
                console.log("both are filled out appropriatly...", this.props.unique_id);

                axios.post("/business/signup/description/update", {
                    username: this.props.username,
                    files: this.state.files,
                    id: this.props.unique_id,
                    description: this.state.description
                }).then((res) => {
                    console.log(res.data);
                    if (res.data.message === "Successfully updated account!") {
                        this.props.history.push("/signup/business/page/2");
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        } else {
            this.setState({
                descErr: "You must enter at least 100 charectors in the description to continue..."
            })
        }
    }
    render() {
        console.log('this.state - description', this.state);
        return (
            <div id="margin">
                <div style={{ borderTop: "3px solid lightgrey" }}>
                    <div class="dashboard-container">

                        <div class="dashboard-content-container" data-simplebar>
                            <div class="dashboard-content-inner">
                                
                        
                                <div class="dashboard-headline">
                                    <h3 className="text-left">Title</h3>

                                    
                                    <nav id="breadcrumbs" class="dark">
                                        <ul>
                                            <li>Home</li>
                                            <li>Title</li>
                                            <li style={{ color: "red" }}>Description</li>
                                            <li>Details</li>
                                            <li>Expertise</li>
                                            <li>Location</li>
                                            <li>Visibility</li>
                                            <li>Budget</li>
                                            <li>Review</li>
                                            
                                        </ul>
                                    </nav>
                                </div>

                        
                                <div class="row">

                                    
                                    <div class="col-xl-12">
                                        <div class="dashboard-box margin-top-0">

                                        
                                        <div className="content with-padding padding-bottom-10">
                                            <div className="row">

                                                

                                                
                                                <div className="col-xl-12 col-lg-12 col-sm-12 col-xs-12">
                                                    <div className="submit-field">
                                                        <h5>Enter a detailed description of the reqirements and expectations of the job</h5>
                                                        <textarea onChange={(e) => {
                                                            this.setState({
                                                                description: e.target.value,
                                                                descErr: ""
                                                            })
                                                        }} class="form-control rounded-0" id="exampleFormControlTextarea1" rows="7" placeholder={"Enter your description here, you must enter AT LEAST 100 characters long or more..."}></textarea>
                                                        <label className="text-right">{this.state.description.length}/500</label>
                                                    </div>
                                                    {this.state.descErr.length !== 0 ? <h3 className="text-center red-text">{this.state.descErr}</h3> : null}
                                                    <label className="text-left" style={{ color: "blue" }}>A good description includes...</label>
                                                    <ul className="list">
                                                        <li>What the deliverable is</li>
                                                        <li>Type of freelancer or agency you're looking for</li>
                                                        <li>Anything unique about the project, team, or your company</li>
                                                    </ul>
                                                    <hr className="my-4" />
                                                </div>
                                                <div className="col-xl-12">
                                                    <label>Upload additional files/content to help freelancers gain a better understanding of your goals</label>
                                                        <Dropzone onDrop={acceptedFile => {
                                                            console.log(acceptedFile);

                                                            this.setState({
                                                                acceptedFile
                                                            }, () => {
                                                                this.getBase64(this.state.acceptedFile[0], this.callback);
                                                            })
                                                        }}>
                                                            {({getRootProps, getInputProps}) => (
                                                                <section>
                                                                    <div {...getRootProps()}>
                                                                        <input {...getInputProps()} />
                                                                        <div class="upload-drop-zone" id="drop-zone"> Or drag and drop files here </div>                                                            
                                                                    </div>
                                                                </section>
                                                            )}
                                                        </Dropzone>
                                                    {this.state.files.length !== 0 ? this.state.files.map((file, index) => {
                                                        return (
                                                            <div key={index} class="list-group"> <a href="#" class="list-group-item list-group-item-success"><span class="badge alert-success pull-right">{file.date}</span>{file.title}</a></div>
                                                        );
                                                    }) : null}
                                                </div>
                                              
                                            
                                            </div>
                                        </div>
                                            
                                        </div>
                                        
                                    </div>

                                    {/* <div class="col-xl-12">
                                        <button onClick={() => {
                                            console.log("clicked.")
                                            this.props.history.push("/signup/freelancer/page/4");
                                        }} style={{ width: "50%" }} class="button btn-danger red-btn ripple-effect big margin-top-30">Back to previous page</button>
                                    </div> */}

                                    <div class="col-xl-12">
                                        <button style={{ width: "100%" }} onClick={this.handleSubmission} class="button blue-btn ripple-effect big margin-top-30">Continue to next page </button>
                                    </div>


                                    
                                </div>
                        
                                <div class="dashboard-footer-spacer"></div>
                                <div class="small-footer margin-top-15">
                                    <div class="small-footer-copyrights">
                                        © 2019 <strong>[Company Name(s)]</strong>. All Rights Reserved.
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
            </div>
        )
    }
}
const mapStateToProps = state => {
    for (const key in state.auth) {
        const obj = state.auth;
        if (obj.authenticated.hasOwnProperty("email")) {
            return {
                unique_id: state.signup_completed.id,
                username: state.auth.authenticated.username
            }
        }
    }
}
export default withRouter(connect(mapStateToProps, {  })(SignupDescriptionHelper));