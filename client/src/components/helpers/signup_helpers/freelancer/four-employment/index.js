import React, { Component } from 'react';
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
        specific: null
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
                                        <li>Contact Info</li>
                                    </ul>
                                </nav>
                            </div>

                            

                            <h1 className="text-center" style={{ marginBottom: "40px" }}>Employment</h1>
                                <div className="row">
                                    
                                <div className="col-xl-12">
                                        <div className="dashboard-box margin-top-0">

                                            <div className="headline">
                                                <h3><i className="icon-feather-folder-plus"></i>Education</h3>
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

                                                <div className="hover-text" onClick={() => {
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
                                    }} style={{ width: "50%" }} className="button btn-danger red-btn ripple-effect big margin-top-30">Back to previous page</button>
                                    <hr className="my-4" />
                                    <button onClick={() => {
                                        console.log("clicked.")
                                        this.props.history.push("/signup/freelancer/page/4");
                                    }} style={{ width: "80%" }} className="button blue-btn ripple-effect big margin-top-30">Continue to next page</button>
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

                        <div className="col-xl-4">
                            <div className="submit-field">
                                <h5>Company Name</h5>
                                <input onChange={(e) => {
                                    this.setState({
                                        company: e.target.value
                                    })
                                }} value={this.state.company} type="text" className="with-border" placeholder={"Company name..."} />
                            </div>
                        </div>

                        <div className="col-xl-4">
                            <div className="submit-field">
                                <h5>Location (City)</h5>
                                <input onChange={(e) => {
                                    this.setState({
                                        location: e.target.value
                                    })
                                }} value={this.state.areaOfStudy} type="text" className="with-border" placeholder={"Location..."} />
                            </div>
                        </div>

                        <div className="col-xl-4">
                            <div className="submit-field">
                                <h5>Country</h5>
                                <select onChange={(e) => {
                                    this.setState({
                                        country: e.target.value
                                    })
                                }} class="form-control">
                                    <option value="Afghanistan">Afghanistan</option>
                                    <option value="Åland Islands">Åland Islands</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="American Samoa">American Samoa</option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Anguilla">Anguilla</option>
                                    <option value="Antarctica">Antarctica</option>
                                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Aruba">Aruba</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan">Azerbaijan</option>
                                    <option value="Bahamas">Bahamas</option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Bangladesh">Bangladesh</option>
                                    <option value="Barbados">Barbados</option>
                                    <option value="Belarus">Belarus</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Belize">Belize</option>
                                    <option value="Benin">Benin</option>
                                    <option value="Bermuda">Bermuda</option>
                                    <option value="Bhutan">Bhutan</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                    <option value="Botswana">Botswana</option>
                                    <option value="Bouvet Island">Bouvet Island</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Burkina Faso">Burkina Faso</option>
                                    <option value="Burundi">Burundi</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="Cameroon">Cameroon</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Cape Verde">Cape Verde</option>
                                    <option value="Cayman Islands">Cayman Islands</option>
                                    <option value="Central African Republic">Central African Republic</option>
                                    <option value="Chad">Chad</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Christmas Island">Christmas Island</option>
                                    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Comoros">Comoros</option>
                                    <option value="Congo">Congo</option>
                                    <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                                    <option value="Cook Islands">Cook Islands</option>
                                    <option value="Costa Rica">Costa Rica</option>
                                    <option value="Cote D'ivoire">Cote D'ivoire</option>
                                    <option value="Croatia">Croatia</option>
                                    <option value="Cuba">Cuba</option>
                                    <option value="Cyprus">Cyprus</option>
                                    <option value="Czech Republic">Czech Republic</option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="Djibouti">Djibouti</option>
                                    <option value="Dominica">Dominica</option>
                                    <option value="Dominican Republic">Dominican Republic</option>
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="El Salvador">El Salvador</option>
                                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                                    <option value="Eritrea">Eritrea</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                    <option value="Faroe Islands">Faroe Islands</option>
                                    <option value="Fiji">Fiji</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="French Guiana">French Guiana</option>
                                    <option value="French Polynesia">French Polynesia</option>
                                    <option value="French Southern Territories">French Southern Territories</option>
                                    <option value="Gabon">Gabon</option>
                                    <option value="Gambia">Gambia</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Gibraltar">Gibraltar</option>
                                    <option value="Greece">Greece</option>
                                    <option value="Greenland">Greenland</option>
                                    <option value="Grenada">Grenada</option>
                                    <option value="Guadeloupe">Guadeloupe</option>
                                    <option value="Guam">Guam</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Guernsey">Guernsey</option>
                                    <option value="Guinea">Guinea</option>
                                    <option value="Guinea-bissau">Guinea-bissau</option>
                                    <option value="Guyana">Guyana</option>
                                    <option value="Haiti">Haiti</option>
                                    <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                                    <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hong Kong">Hong Kong</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="India">India</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                    <option value="Iraq">Iraq</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Isle of Man">Isle of Man</option>
                                    <option value="Israel">Israel</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Jersey">Jersey</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Kazakhstan">Kazakhstan</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Kiribati">Kiribati</option>
                                    <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                    <option value="Korea, Republic of">Korea, Republic of</option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                                    <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                    <option value="Latvia">Latvia</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Lesotho">Lesotho</option>
                                    <option value="Liberia">Liberia</option>
                                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                    <option value="Liechtenstein">Liechtenstein</option>
                                    <option value="Lithuania">Lithuania</option>
                                    <option value="Luxembourg">Luxembourg</option>
                                    <option value="Macao">Macao</option>
                                    <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                                    <option value="Madagascar">Madagascar</option>
                                    <option value="Malawi">Malawi</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Maldives">Maldives</option>
                                    <option value="Mali">Mali</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Marshall Islands">Marshall Islands</option>
                                    <option value="Martinique">Martinique</option>
                                    <option value="Mauritania">Mauritania</option>
                                    <option value="Mauritius">Mauritius</option>
                                    <option value="Mayotte">Mayotte</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                    <option value="Moldova, Republic of">Moldova, Republic of</option>
                                    <option value="Monaco">Monaco</option>
                                    <option value="Mongolia">Mongolia</option>
                                    <option value="Montenegro">Montenegro</option>
                                    <option value="Montserrat">Montserrat</option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Mozambique">Mozambique</option>
                                    <option value="Myanmar">Myanmar</option>
                                    <option value="Namibia">Namibia</option>
                                    <option value="Nauru">Nauru</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Netherlands">Netherlands</option>
                                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                                    <option value="New Caledonia">New Caledonia</option>
                                    <option value="New Zealand">New Zealand</option>
                                    <option value="Nicaragua">Nicaragua</option>
                                    <option value="Niger">Niger</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Niue">Niue</option>
                                    <option value="Norfolk Island">Norfolk Island</option>
                                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                    <option value="Norway">Norway</option>
                                    <option value="Oman">Oman</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Palau">Palau</option>
                                    <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                    <option value="Panama">Panama</option>
                                    <option value="Papua New Guinea">Papua New Guinea</option>
                                    <option value="Paraguay">Paraguay</option>
                                    <option value="Peru">Peru</option>
                                    <option value="Philippines">Philippines</option>
                                    <option value="Pitcairn">Pitcairn</option>
                                    <option value="Poland">Poland</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Puerto Rico">Puerto Rico</option>
                                    <option value="Qatar">Qatar</option>
                                    <option value="Reunion">Reunion</option>
                                    <option value="Romania">Romania</option>
                                    <option value="Russian Federation">Russian Federation</option>
                                    <option value="Rwanda">Rwanda</option>
                                    <option value="Saint Helena">Saint Helena</option>
                                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                    <option value="Saint Lucia">Saint Lucia</option>
                                    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                    <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                                    <option value="Samoa">Samoa</option>
                                    <option value="San Marino">San Marino</option>
                                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                    <option value="Senegal">Senegal</option>
                                    <option value="Serbia">Serbia</option>
                                    <option value="Seychelles">Seychelles</option>
                                    <option value="Sierra Leone">Sierra Leone</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Slovakia">Slovakia</option>
                                    <option value="Slovenia">Slovenia</option>
                                    <option value="Solomon Islands">Solomon Islands</option>
                                    <option value="Somalia">Somalia</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                                    <option value="Spain">Spain</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="Sudan">Sudan</option>
                                    <option value="Suriname">Suriname</option>
                                    <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                    <option value="Swaziland">Swaziland</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                    <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                                    <option value="Tajikistan">Tajikistan</option>
                                    <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                    <option value="Thailand">Thailand</option>
                                    <option value="Timor-leste">Timor-leste</option>
                                    <option value="Togo">Togo</option>
                                    <option value="Tokelau">Tokelau</option>
                                    <option value="Tonga">Tonga</option>
                                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                    <option value="Tunisia">Tunisia</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="Turkmenistan">Turkmenistan</option>
                                    <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                    <option value="Tuvalu">Tuvalu</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="United States">United States</option>
                                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                    <option value="Uruguay">Uruguay</option>
                                    <option value="Uzbekistan">Uzbekistan</option>
                                    <option value="Vanuatu">Vanuatu</option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="Viet Nam">Viet Nam</option>
                                    <option value="Virgin Islands, British">Virgin Islands, British</option>
                                    <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                                    <option value="Western Sahara">Western Sahara</option>
                                    <option value="Yemen">Yemen</option>
                                    <option value="Zambia">Zambia</option>
                                    <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                            </div>
                        </div>
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