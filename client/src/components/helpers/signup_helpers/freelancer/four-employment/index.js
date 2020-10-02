import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import "./style.css";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Datetime from "react-datetime";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Dropdown from 'react-dropdown';
import FooterFooter from "../../../universal/footer/footer.js";

class FourthSignupPageFreelancerHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        isPaneOpen: false,
        company: "",
        location: "",
        country: "",
        title: "",
        startDateWorkPeriod: null,
        endDateWorkPeriod: null,
        current: false,
        description: "",
        user: null,
        open: false,
        specific: null,
        options: []
    }
}
 
    onOpenModal = () => {
        this.setState({ open: true });
    };
 
    onCloseModal = () => {
        this.setState({ open: false });
    };
    skipStep = () => {
        console.log("clicked.");
        this.props.history.push("/signup/freelancer/page/4");
    }
    handleChange = date => {
        this.setState({
            startDateWorkPeriod: date._d
        });
    };
    handleChangeTwo = date => {
        this.setState({
            endDateWorkPeriod: date._d
        })
    }
    componentDidMount() {

        setTimeout(() => {
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
        }, 500);
    }
    handleEmploymentSubmission = () => {
        console.log("submitted");

        // should have 8 different fields...
        const { company, location, country, title, startDateWorkPeriod, endDateWorkPeriod, current, description } = this.state;

        if (company.length > 0 && location.length > 0 && title.length > 0) {
            axios.post("/update/profile/employment/professional/work/experience", {
                company_name: company, 
                location_city: location,
                country,
                technical_title: title, 
                employment_start_date: startDateWorkPeriod !== null ? startDateWorkPeriod : "Not-Provided", 
                employment_end_date: endDateWorkPeriod !== null ? endDateWorkPeriod : "Not-Provided", 
                currently_employed: current, 
                description: description.length > 0 ? description : "Not-Provided",
                username: this.props.username
            }).then((res) => {
                if (res.data.message === "Successfully updated account!") {
                    console.log("!!! worked !!!! ---- :", res.data);
                    this.setState({
                        user: res.data.user,
                        company: "",
                        location: "",
                        country: "",
                        title: "",
                        startDateWorkPeriod: null,
                        endDateWorkPeriod: null,
                        current: false,
                        description: "",
                        isPaneOpen: false
                    }, () => {

                    })
                    // this.props.history.push("/signup/freelancer/page/4");
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            alert("Please complete the following required fields... Company name, location(city), title and current status. Thanks!")
        }
    }
    delete = (job) => {
        console.log("delete... :", job);

        axios.put("/delete/employment/listing", {
            job,
            username: this.props.username
        }).then((res) => {
            if (res.data.message === "Successfully updated account!") {
                console.log(res.data);
                this.setState({
                    user: res.data.user
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderAddedHistory = () => {
        const { user } = this.state;

        if (user !== null) {
            return (
                <div className="container-fluid">
                    <div className="row">
                        {this.state.user.freelancerData.employment_history ? this.state.user.freelancerData.employment_history.map((job, index) => {
                            return (
                                <div className="col-md-4 col-lg-4 col-xl-4 col-xs-12 col-sm-12">
                                
                                    <div class="card cardy" style={{ width: "100%" }}>
                                    <div onClick={() => {
                                        this.delete(job);
                                    }} style={{ position: "absolute", left: 10, top: 10 }}><i class="fa fa-trash fa-2x"></i></div>
                                        <div class="card-body">
                                            <h5 class="card-title" style={{ color: "blue", fontSize: "20px", textDecoration: "underline" }}>{job.company_name}</h5>
                                            <p class="card-text">{job.description}</p>
                                            <button className="btn black-btn" style={{ width: "100%" }} onClick={() => {
                                                this.setState({
                                                    open: !this.state.open,
                                                    specific: job
                                                })
                                            }}>View Details</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : null}
                    </div>
                </div>
            );
        } 
    }
    handleBlur = (value) => {
        console.log("blur", value);

        axios.post("/location/gather", {
            location: this.state.location
        }).then((res) => {
            console.log(res.data);

            this.setState({
                options: res.data.hits
            })
        }).catch((err) => {
            console.log(err);
        })
    }
    renderConditionalInput = () => {
        if (this.state.options.length === 0) {
            return (
                <div className="col-xl-6">
                    <div className="submit-field">
                        <h5>Location (City)</h5>
                        <input onBlur={this.handleBlur} onChange={(e) => {
                            this.setState({
                                location: e.target.value
                            })
                        }} type="text" id="location-selectorrr" className="with-border" placeholder={"Location..."} />
                    </div>
                </div>
            );
        } else {
            const cityOptions = [];

            for (let indxxx = 0; indxxx < this.state.options.length; indxxx++) {
                const option = this.state.options[indxxx];
                
                console.log("option :", option);

                let city = option.locale_names.default[0];
                const administrative = option.administrative[0];
                const country = option.country.default;

                const finale = `${city}, ${administrative}, ${country}`;

                cityOptions.push({
                    value: option,
                    label: finale
                });
            }

            return (
                <div className="col-xl-6">
                    <div className="location-match">
                        <label>Select the appropriate location match...</label>
                    </div>
                    <Dropdown className={"custom-drop"} options={cityOptions} onChange={this._onSelect} placeholder="Select an option" />;
                </div>
            );
        }
    }
    _onSelect = (option) => {
        console.log(option);

        let city = option.value.locale_names.default[0];
        const administrative_state = option.value.administrative[0];
        const country = option.value.country.default;

        this.setState({
            country,
            location: city
        })
    }
    render() {
        const { open, specific } = this.state;
        console.log("this.state --- fourth-employment - index.JS... ", this.state);

        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                <div className="dashboard-container">

                    <div className="dashboard-content-container" data-simplebar>
                        <div className="dashboard-content-inner">
                            
                      
                            <div className="dashboard-headline">
                                <h3 className="text-left">Employment Details</h3>

                                {/* <div className="col-xl-12">
                                    <button onClick={this.handleSubmission} className="button blue-btn ripple-effect big margin-top-30">Continue to next page </button>
                                </div> */}
                                <nav id="breadcrumbs" className="dark">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li>Expertise</li>
                                        <li>Level Of Expertise</li>
                                        <li>Education</li>
                                        <li style={{ color: "red" }}>Employment</li>
                                        <li>Languages</li>
                                        <li>Hourly Rate</li>
                                        <li>Location</li>
                                       
                                    </ul>
                                </nav>
                            </div>

                            

                            <h1 className="text-center" style={{ marginBottom: "40px" }}>Employment</h1>
                                <div className="row">
                                    
                                <div className="col-xl-12">
                                        <div className="dashboard-box margin-top-0">

                                            <div className="headline">
                                                <h3><i className="icon-feather-folder-plus"></i>Employment</h3>
                                            </div>

                                            <div style={{ minHeight: "400px", padding: "40px" }} className="content">
                                                <h2 className="text-left">Add your professional work experience.</h2>

                                                {this.renderAddedHistory()}

                                                <hr className="my-4" />
                                                <div style={{ float: "left" }}>
                                                    <button onClick={() => {
                                                        this.setState({
                                                            isPaneOpen: !this.state.isPaneOpen
                                                        })
                                                    }} className="btn blue-btn" style={{ color: "white" }}><i class="fa fa-plus-circle"></i> Add Employment Information</button>
                                                </div>
                                                <br />
                                                <br />

                                                <div className="hover-text" style={{ maxWidth: "200px" }} onClick={() => {
                                                    this.skipStep()
                                                }}><h4 className="text-left skip" style={{ textDecoration: "underline" }}>Skip This Step...</h4></div>

                                            </div>
                                        </div>
                                    </div>
                                        
                                </div>

                                <div className="col-xl-12">
                                    <button onClick={() => {
                                        console.log("clicked.")
                                        this.props.history.push("/signup/freelancer/page/2");
                                    }} className="button btn-danger custom-width red-btn ripple-effect big margin-top-30">Back to previous page</button>
                                    <hr className="my-4" />
                                    <div style={{ marginTop: "150px" }}>
                                        <button onClick={() => {
                                            console.log("clicked.")
                                            this.props.history.push("/signup/freelancer/page/4");
                                        }} style={{ width: "80%" }} className="button blue-btn ripple-effect big margin-top-30">Continue to languages</button>
                                    </div>
                                </div>

                        
                                <div style={{ marginTop: "250px" }} className="dashboard-footer-spacer"></div>
                                <div className="small-footer margin-top-15">
                                    <div className="small-footer-copyrights">
                                        © 2019 <strong>[Company Name(s)]</strong>. All Rights Reserved.
                                    </div>
                                    <ul className="footer-social-links">
                                        <li>
                                            <a href="#" title="Facebook" data-tippy-placement="top">
                                                <i className="icon-brand-facebook-f"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="Twitter" data-tippy-placement="top">
                                                <i className="icon-brand-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="Google Plus" data-tippy-placement="top">
                                                <i className="icon-brand-google-plus-g"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="LinkedIn" data-tippy-placement="top">
                                                <i className="icon-brand-linkedin-in"></i>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="clearfix"></div>
                                </div>
                    

                            </div>
                    </div>
                                    

                </div>

                {this.state.user !== null && specific !== null ? <Modal open={open} onClose={this.onCloseModal} center>
                    <div style={{ minHeight: "100%", minWidth: "100%" }} className="container">
                    <Tabs>
                        <TabList>
                        <Tab>Company Details</Tab>
                        <Tab>Personal</Tab>
                        </TabList>
                    
                        <TabPanel>
                            <div style={{ maxWidth: "80vw" }}>
                                <label className="special-label">Company Name</label>
                                <p className="lead">{specific.company_name}</p>
                                <label className="special-label">Technical Title</label>
                                <p className="lead">{specific.technical_title}</p>
                                <label className="special-label">Description</label>
                                <p className="lead">{specific.description}</p>
                            </div>
                            
                        </TabPanel>
                        <TabPanel>
                            <div style={{ maxWidth: "80vw" }}>
                                <label className="special-label">Location (Country)</label>
                                <p className="lead">{specific.country}</p>
                                <label className="special-label">Location (City)</label>
                                <p className="lead">{specific.location_city}</p>
                                <label className="special-label">Start & End Date(s)</label>
                                <p className="lead">Start: {specific.employment_start_date ? specific.employment_start_date : "Not-applicable"} --- End: {specific.employment_end_date ? specific.employment_end_date : "Not-Applicable"}</p>
                                <label className="special-label">Employed Currently?</label>
                                <p className="lead">{specific.currently_employed === true ? "YES" : "NO"}</p>
                                
                            </div>
                        </TabPanel>
                    </Tabs>
                    </div>
                </Modal> : null}


                <SlidingPane
                    className="panel-panel"
                    overlayClassName="panel-overlay-special"
                    isOpen={this.state.isPaneOpen}
                    title="Please select your professional work experience information"
                    subtitle="Please provide the most up-to-date information regarding your professional work experience..."
                    onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                        this.setState({ isPaneOpen: false });
                    }}
                >
                <div className="content with-padding padding-bottom-10">
                    <div className="row">

                        <div className="col-xl-6">
                            <div className="submit-field">
                                <h5>Company Name</h5>
                                <input onChange={(e) => {
                                    this.setState({
                                        company: e.target.value
                                    })
                                }} value={this.state.company} type="text" className="with-border" placeholder={"Company name..."} />
                            </div>
                        </div>

                        {this.renderConditionalInput()}

                        
                        <div className="col-xl-12 col-lg-12 col-sm-12 col-xs-12">
                            <div className="submit-field">
                                <h5>Title (Technical Position Name)</h5>
                                <input onChange={(e) => {
                                    this.setState({
                                        title: e.target.value
                                    })
                                }} value={this.state.title} type="text" className="with-border" placeholder={"Software Engineer, Account Manager, CFO, etc..."} />
                            </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-sm-12 col-xs-12">
                            <label>Current employment status</label>
                            <select onChange={(e) => {
                                this.setState({
                                    current: JSON.parse(e.target.value)
                                })
                            }} className="form-control">
                                <option value={true}>I CURRENTLY work here</option>
                                <option value={false}>I do NOT currently work here</option>
                            </select>
                      
                        </div>
                        
                        <div className="col-xl-6 col-lg-6 col-sm-12 col-sx-12">
                            
                            <label>Employment - Start Date (From)</label>
                            <Datetime timeFormat={false} value={this.state.startDate} onChange={this.handleChange} />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-sm-12 col-sx-12">
                            
                            <label>Employment - End Date (To)</label>
                            <Datetime timeFormat={false} value={this.state.endDate} onChange={this.handleChangeTwo} />
                        </div>



                        <div className="col-xl-12">
                            <div className="submit-field">
                                <h5>Description (Optional)</h5>
                                <textarea placeholder={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id donec ultrices tincidunt arcu non sodales neque sodales ut. Rhoncus mattis rhoncus urna neque viverra justo. Vitae aliquet nec ullamcorper sit amet risus nullam eget felis. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Suspendisse faucibus interdum posuere lorem ipsum dolor. Eu facilisis sed odio morbi quis commodo."} onChange={(e) => {
                                    this.setState({
                                        description: e.target.value
                                    })
                                }} cols="30" rows="5" className="with-border"></textarea>
                                
                            </div>
                        </div>
                        <button onClick={() => {
                            console.log("clicked.")
                            this.handleEmploymentSubmission();
                        }} style={{ width: "100%" }} className="button blue-btn red-btn ripple-effect big margin-top-30">Submit Employment Data</button>
                    </div>
                </div>
                </SlidingPane>
                <FooterFooter />
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
export default withRouter(connect(mapStateToProps, { })(FourthSignupPageFreelancerHelper));