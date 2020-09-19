import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import "./style.css";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { NotificationManager } from 'react-notifications';

class TypeOfProjectHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
       selection: "",
       count: 0,
       questions: false,
       isPaneOpen: false,
       selected: [{
           title: "Do you have any questions about the job description?",
           index: 0
       }, {
           title: "Do you have suggestions to make this project run successfully?",
           index: 1
       }, {
           title: "What challenging part of this job are you most experienced in?",
           index: 2
       }, {
            title: "What part of this project most appeals to you?",
            index: 3
        }, {
            title: "What past project or job have you had that is most like this one and why?",
            index: 4
        }, { 
            title: "What questions do you have about the project?",
            index: 5
        }, {
            title: "Which of the required job skills do you feel you are strongest at?",
            index: 6
        }, {
            title: "Which part of this project do you think will take the most time?",
            index: 7
        }, {
            title: "Why did you apply to this particular job?",
            index: 8
        }, {
            title: "Why do you think you are a good fit for this particular project?",
            index: 9
        }],
        addition: ""
    }
}
    handleSubmission = () => {
        console.log("handle submission...");

        const { selected, selection, questions } = this.state;

        if ((0 < selected.length <= 5) && selection.length > 0 && questions !== false) {
            console.log("BOTH selected and selection are included...")
            axios.post("/business/signup/questions/post", {
                selected,
                username: this.props.username,
                selection,
                id: this.props.unique_id
            }).then((res) => {
                if (res.data.message === "Updated information and user account is current!") {
                    console.log("YAY! :", res.data);
                    this.props.history.push("/signup/business/page/3")
                }
            }).catch((err) => {
                console.log(err);
            })
        } else if (this.state.selection.length > 0) {
            console.log("only selection is included...")
            axios.post("/business/signup/questions/post", {
                username: this.props.username,
                selection,
                id: this.props.unique_id
            }).then((res) => {
                if (res.data.message === "Updated information and user account is current!") {
                    console.log("YAY! :", res.data);

                    this.props.history.push("/signup/business/page/3")
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log("neither are included...");
            NotificationManager.error('You must select a "type of project" before proceeding', 'Select a "type of project" first!', 6000);
        }
    }
    renderConversions = () => {
        switch (this.state.selection) {
            case "one-time-project":
                return "One-Time Project"
                break;
            case "complex-project":
                return "Complex Project"
                break;
            case "on-going-project":
                return "On-Going - Lengthy Project"
                break;
            default:
                break;
        }
    }
    removeKeyword = (passed) => {
        console.log("remove.");

        const myItems = [...this.state.selected];

        const newArray = myItems.filter(item => item.index !== passed.index)
      
        this.setState({
          selected: newArray
        })
    }
    handleAddition = () => {
        if (this.state.addition.length !== 0) {
            this.setState({
                selected: [...this.state.selected, {
                    title: this.state.addition,
                    index: this.state.selected.length === 0 ? 0 : this.state.selected[this.state.selected.length - 1].index + 1
                }],
                addition: ""
            })
        } else {
            alert("Please enter a question before submitting...")
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
                                    <h3 className="text-left">Details - Type of project</h3>

                                    
                                    <nav id="breadcrumbs" class="dark">
                                        <ul>
                                            <li>Home</li>
                                            <li>Title</li>
                                            <li>Description</li>
                                            <li style={{ color: "red" }}>Details/Type</li>
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
                                        <div class="dashboard-box margin-top-0" style={{ height: "100%" }}>

                                        
                                        <div className="content with-padding padding-bottom-10">
                                            <div className="row">

                                                <div className="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
                                                    <div class="card" style={{ width: "100%" }}>
                                                        <div class="card-header">
                                                            One-Time Project
                                                        </div>
                                                        <div class="card-body">
                                                            <h5 class="card-title">Easy/Quick Jobs...</h5>
                                                            <p class="card-text">Find the right skills for a short-term job.</p>
                                                            <button onClick={() => {
                                                                this.setState({
                                                                    selection: "one-time-project"
                                                                })
                                                            }} href="#" class="btn blue-btn" style={{ color: "white" }}>Select Option</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
                                                <div class="frb-group">
                                                    <div class="card" style={{ width: "100%" }}>
                                                        <div class="card-header">
                                                            On-going Project
                                                        </div>
                                                        <div class="card-body">
                                                            <h5 class="card-title">Lengthy - Continuous Jobs...</h5>
                                                            <p class="card-text">Find a skilled resource for an extended engagement.</p>
                                                            <button onClick={() => {
                                                                this.setState({
                                                                    selection: "on-going-project"
                                                                })
                                                            }} href="#" class="btn blue-btn" style={{ color: "white" }}>Select Option</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
                                                <div class="frb-group">
                                                    <div class="card" style={{ width: "100%" }}>
                                                        <div class="card-header">
                                                            Complex Project
                                                        </div>
                                                        <div class="card-body">
                                                            <h5 class="card-title">Complex Software Solutions</h5>
                                                            <p class="card-text">Find specialized experts and agencies for large projects.</p>
                                                            <button onClick={() => {
                                                                this.setState({
                                                                    selection: "complex-project"
                                                                })
                                                            }} href="#" class="btn blue-btn" style={{ color: "white" }}>Select Option</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                              
                                            
                                            </div>
                                            {this.state.selection.length !== 0 ? <div className="row">
                                                <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12">
                                                    <h3 className="text-center heading-three">You have selected a <strong>{this.renderConversions()}</strong></h3>
                                                </div>
                                            </div> : null}
                                            {this.state.questions === false ? <Fragment><div className="row" style={{ marginTop: "50px" }}>
                                            <label style={{ paddingLeft: "15px", color: "#DD2D4A", fontWeight: "bold" }}>Screening Questions (Optional)</label>
                                                {/* content goes here ... */}
                                            </div>
                                            <div onClick={() => {
                                                this.setState({
                                                    isPaneOpen: true
                                                })
                                                console.log("clicked")
                                            }} id="bottom-right-align">
                                                <img src={require("../../../../../assets/icons/add.png")} style={{ width: "50px", height: "50px" }} />
                                            </div></Fragment> : <Fragment><div className="row" style={{ marginTop: "50px" }}><button onClick={() => {
                                                this.setState({
                                                    questions: false,
                                                    isPaneOpen: true
                                                })
                                            }} className="btn red-btn" style={{ width: "40%", color: "white", fontWeight: "bold" }}>Change/edit selected questions</button></div></Fragment>}
                                            {this.state.questions === true ? <Fragment><hr className="my-4" />
                                            <div class="keywords-list">
                                                {this.state.selected.length !== 0 && this.state.questions === true ? this.state.selected.map((item, index) => {
                                                    return (
                                                        <Fragment>
                                                            <span class="keyword" style={{ paddingLeft: "15px" }}><span class="keyword-text">{item.title}</span></span>
                                                            <br />
                                                        </Fragment>
                                                    );
                                                }) : null}


                                            </div></Fragment> : null}
                                            
                                        </div>
                                            
                                        </div>
                                        
                                    </div>

                                    <div class="col-xl-12">
                                        <button onClick={() => {
                                            console.log("clicked.")
                                            this.props.history.push("/signup/business/page/1");
                                        }} class="button custom-btn red-btn ripple-effect big margin-top-30">Back to previous page</button>
                                    </div>

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
                    
                        <SlidingPane
                            className="sliding-pane-class"
                            overlayClassName="overlay-class"
                            isOpen={this.state.isPaneOpen}
                            title="Add screening questions"
                            subtitle="Please select from the questions provided or enter your own!"
                            onRequestClose={() => {
                            // triggered on "<" on left top click or on outside click
                                this.setState({ isPaneOpen: false });
                            }}
                        >
                            <div>
                                    <div class="section-headline margin-top-25 margin-bottom-12">
                                        <h5>Select from our suggested questions:</h5>
                                    </div>

                                    <div class="keywords-container">
                                        <div class="keyword-input-container">
                                            <input onChange={(e) => {
                                                this.setState({
                                                    addition: e.target.value
                                                })
                                            }} value={this.state.addition} type="text" class="keyword-input with-border" placeholder="Add a questions here..."/>
                                            <button onClick={this.handleAddition} class="keyword-input-button ripple-effect"><i class="icon-material-outline-add"></i></button>
                                        </div>
                                        <label>Please remove any questions that you wouldn't like to use or are irrelevant for your project. Select a maximum of 5 questions or ADD YOUR OWN...</label>
                                        <div class="keywords-list">
                                            {this.state.selected.length !== 0 ? this.state.selected.map((item, index) => {
                                                return (
                                                    <Fragment>
                                                        <span class="keyword"><span onClick={() => {
                                                            this.removeKeyword(item)
                                                        }} class="keyword-remove"></span><span class="keyword-text">{item.title}</span></span>
                                                        <br />
                                                    </Fragment>
                                                );
                                            }) : null}
                                           
                                        </div>
                                        
                                        <div class="clearfix"></div>
                                        <hr className="my-4" />
                                           {this.state.selected.length > 5 ? <div><h3 style={{ color: "#880D1E", fontWeight: "bold" }} className="text-center">You need to de-select some items, too many questions are selected...</h3></div> : <div><button onClick={() => {
                                               this.setState({
                                                   questions: true,
                                                   isPaneOpen: false
                                               }, () => {
                                                    NotificationManager.success('You have added your questions successfully, please continue to the next page to save your changes', 'Successfully added questions!');
                                               })
                                           }} style={{ width: "100%", color: "white" }} className="btn blue-btn">Submit Questions</button></div>}
                                            
                                    </div>
                             
                            </div>
                           
                        </SlidingPane>                    
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
export default withRouter(connect(mapStateToProps, {  })(TypeOfProjectHelper));


// <div className="col-md-12 col-lg-12 col-sm-12">
//     <div class="section-headline margin-top-25 margin-bottom-12">
//         <h5>Question #1</h5>
//     </div>
//     <div class="input-with-icon-left no-border">
//         <i class="icon-material-outline-account-circle"></i>
//         <input onChange={(e) => {
//             this.setState({
//                 questionOne: e.target.value
//             })
//         }} value={this.state.questionOne} type="text" class="input-text" placeholder="How much android/iOS mobile experience do you have?"/>
//     </div>
// </div>