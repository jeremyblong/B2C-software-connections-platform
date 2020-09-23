import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import "./style.css";
import Select from 'react-select';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { NotificationManager} from 'react-notifications';


const KeyCodes = {
    comma: 188,
    enter: 13,
  };
   
const delimiters = [KeyCodes.comma, KeyCodes.enter];


class InitialHelperLanding extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        serviceOffered: null,
        skill: "",
        tags: [],
        selected: [],
        subsets: [],
        err: ""
    }
}
    handleDelete = (i) => {
        const { tags } = this.state;
        this.setState({
        tags: tags.filter((tag, index) => index !== i),
        });
    }
    handleSubmission = () => {
        console.log("handle submission...");

        const { serviceOffered, subsets, tags } = this.state;

        if (serviceOffered !== null && subsets.length > 0 && tags.length > 0) {
            axios.post("/create/profile/update/page/one", {
                username: this.props.username,
                tags,
                subsets,
                serviceOffered
            }).then((res) => {
                if (res.data.message === "Successfully updated profile information!") {
                    console.log(res.data);
                    this.setState({
                        tags: [],
                        subsets: [],
                        serviceOffered: null
                    }, () => {
                        this.props.history.push(`/signup/freelancer/page/1`);
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            NotificationManager.error('Please complete each and every field, thank you.', 'An Error Occurred', 7000);
        }
    }
    handleAddition = (tag) => {
        if (this.state.tags.length <= 20) {
            this.setState(state => ({ tags: [...state.tags, tag] }));
        } else {
            alert("You've reached the limit of 20 tags!")
        }
    }

    handleDrag = (tag, currPos, newPos) => {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }
    render() {
        const { tags, suggestions } = this.state;

        const options = [
            { label: "Desktop Software Development", value: "desktop-software-development" },
            { label: "Game Development", value: "game-development" },
            { label: "Other - Software", value: "software-other" },
            { label: "Q&A + Testing", value: "QA-testing" },
            { label: "Web & Mobile Design", value: "web+mobile-design" },
            { label: "Ecommerce Development", value: "ecommerce" },
            { label: "Mobile Development", value: "mobile-development" },
            { label: "Product Management", value: "product-management" },
            { label: "Scripts & Utilities", value: "scripts+utilities" },
            { label: "Web Development", value: "web-development" }
        ];
        const colourStyles = {
            control: styles => ({ ...styles, backgroundColor: 'white' }),
            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
              return {
                ...styles,
                color: 'blue',
                padding: "10px",
                cursor: isDisabled ? 'not-allowed' : 'default',
              };
            },
        };
        console.log(this.state);
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                <div class="dashboard-container">

                    <div class="dashboard-content-container" data-simplebar>
                        <div class="dashboard-content-inner">
                            
                      
                            <div class="dashboard-headline">
                                <h3 className="text-left">Create Your Profile</h3>

                                
                                <nav id="breadcrumbs" class="dark">
                                    <ul>
                                        <li>Home</li>
                                        <li style={{ color: "red" }}>Expertise</li>
                                        <li>Level Of Expertise</li>
                                        <li>Education</li>
                                        <li>Employment</li>
                                        <li>Languages</li>
                                        <li>Hourly Rate</li>
                                        <li>Location</li>
                                       
                                    </ul>
                                </nav>
                            </div>

                       
                            <div class="row">

                                
                                <div class="col-xl-12">
                                    <div class="dashboard-box margin-top-0">

                                    
                                        <div class="headline">
                                            <h3><i class="icon-feather-folder-plus"></i>Complete Profile - Page One</h3>
                                        </div>

                                        <div class="content with-padding padding-bottom-10">
                                            <div class="row">

                                                <div style={{ marginTop: "30px" }} class="col-xl-6">
                                                    <div class="submit-field">
                                                        <h5>What is the main service you offer?</h5>
                                                        <select class="form-control" onChange={(e) => {
                                                            this.setState({
                                                                serviceOffered: e.target.value
                                                            })
                                                        }} data-size="7" title="Select Category">
                                                            <option value={"dev-ops"}>DevOps</option>
                                                            <option value={"mobile-app-development"}>Mobile-app Development</option>
                                                            <option value={"data-analytics"}>Data Analytics</option>
                                                            <option value={"design-creative"}>Design & Creative</option>
                                                            <option value={"back-end-development"}>Back-End Development</option>
                                                            <option value={"software-development"}>Software Developing</option>
                                                            <option value={"networking"}>IT & Networking</option>
                                                            <option value={"writing"}>Writing</option>
                                                            <option value={"translation"}>Translation</option>
                                                            <option value={"full-stack-development"}>Full-Stack Development</option>
                                                            <option value={"front-end-development"}>Front-End Development</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            

                                                <div class="col-xl-6 col-sm-12 col-xs-12">
                                                <h5 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "20px" }}>What skills do you offer clients? <i class="help-icon"></i></h5>
                                                        <ReactTags 
                                                            tags={tags} 
                                                            inputFieldPosition="bottom"
                                                            handleDelete={this.handleDelete}
                                                            handleAddition={this.handleAddition}
                                                            handleDrag={this.handleDrag}
                                                            delimiters={delimiters} 
                                                        />
                                                    
                                                </div>
                                            </div>
                                        
                                            <div className="row" style={{ marginTop: "30px", marginBottom: "200px" }}>
                                                <div class="col-xl-12">
                                                    <div>
                                                        <h5 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "20px" }}>What types of Web, Mobile & Software Dev do you do (select up to 4)?  <i class="help-icon"></i></h5>
                                                        <Select 
                                                            styles={colourStyles} 
                                                            value={this.state.subsets} 
                                                            onChange={(value) => {
                                                                if (this.state.subsets !== null) {
                                                                    if (this.state.subsets.length < 4) {
                                                                        this.setState({
                                                                            subsets: value
                                                                        })
                                                                    } else {
                                                                        this.setState({
                                                                            err: "You've reached the maximum amount of choices for this field..."
                                                                        })
                                                                    }
                                                                } 
                                                            }} isMulti options={options} />
                                                        {this.state.err.length !== 0 ? <h3 className="text-center" style={{ color: "red", marginTop: "10px", fontSize: "18px" }}>{this.state.err} <hr className="my-4"/><div onClick={() => {
                                                            console.log("clicked");
                                                            this.setState({
                                                                subsets: [],
                                                                err: ""
                                                            })
                                                        }}>Click here to clear selection</div></h3> : null}
                                                        <hr className="black-line" />
                                                        <div style={{ marginBottom: "30px" }} class="col-xl-12">
                                                            <button onClick={this.handleSubmission} class="button magic-btn change-index blue-btn ripple-effect big margin-top-30">Continue to next page </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                    
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
export default withRouter(connect(mapStateToProps, { })(InitialHelperLanding));