import React, { Component } from 'react';
import "./style.css";
import MultiSelect from "react-multi-select-component";
import { withRouter } from "react-router-dom";
import Select from "react-dropdown-select";
import axios from "axios";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { connect } from "react-redux";
import { authentication } from "../../../../../actions/auth/auth.js";
import { NotificationManager} from 'react-notifications';


class ExpertiseHelper extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        deviceType: [],
        platform: [],
        programmingLanguages: [],
        databaseTypes: [],
        webserverTypes: [],
        businessSize: [],
        keyword: "",
        openPanel: false,
        expanded: false,
        withOrWithout: "",
        saved: [],
        experienceLevel: "",
        additionalSkillsOptions: [
            { value: "MySQL-Administration", index: 0 },
            { value: "API-Integrations", index: 1 },
            { value: "MongoDB", index: 2 },
            { value: "RESTful-API's", index: 3 },
            { value: "BootStrap", index: 4 },
            { value: "Ecommerce-Development", index: 5 },
            { value: "UI/UX", index: 6 },
            { value: "AJAX", index: 7 },
            { value: "AWS-Web-Services", index: 8 },
            { value: "JQuery", index: 9 },
            { value: "CRM", index: 10 },
            { value: "Custom-PHP", index: 11 },
            { value: "PostgreSQL-Administration", index: 12 }
        ],
        show: true
    }
}
    removeItem = (passed) => {
        console.log("remove", passed);

        const myItems = [...this.state.additionalSkillsOptions];

        const newArray = myItems.filter(item => item.index !== passed.index)

        this.setState({
            additionalSkillsOptions: newArray
        })
    }
    addKeyword = () => {
        console.log("Add keyword...");

        this.setState({
            additionalSkillsOptions: [...this.state.additionalSkillsOptions, {
                value: this.state.keyword,
                index: this.state.additionalSkillsOptions.length === 0 ? 0 : this.state.additionalSkillsOptions[this.state.additionalSkillsOptions.length - 1].index + 1
            }],
            keyword: ""
        })
    }

    handleFinalSubmission = () => {
        console.log("final submission....");

        const { deviceType, platform, programmingLanguages, databaseTypes, webserverTypes, businessSize, additionalSkillsOptions, additonalSelected, experienceLevel } = this.state;

        if (experienceLevel.length !== 0) {
            axios.post("/business/signup/account/details/technical", {
                username: this.props.username,
                type_of_development: deviceType.length > 0 ? deviceType : null,
                platform: platform.length > 0 ? platform : null,
                database_types: databaseTypes.length > 0 ? databaseTypes : null,
                web_server_types: webserverTypes.length > 0 ? webserverTypes : null,
                business_size: businessSize.length > 0 ? businessSize : null,
                additional_skills: this.state.saved,
                id: this.props.unique_id,
                experience_level: experienceLevel
            }).then((res) => {
                if (res.data.message === "Found and updated the desired user account!") {
                    
                    console.log(res.data);
    
                    this.props.authentication(res.data.user);
    
                    this.props.history.push("/signup/business/page/4");
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            NotificationManager.error('Please select a skill level before continuing', 'Skill level REQUIRED', 5000);
        }
    }
    onChangeRadio = (element) => {
        console.log(element);
        if (element === "without") {
            this.setState({
                withOrWithout: element,
                additionalSkillsOptions: []
            })
        } else {
            this.setState({
                withOrWithout: element,
                additionalSkillsOptions: [...this.state.saved]
            })
        }
    }
    render() {
        console.log(this.state);

        const programmingLanguages = [
            { label: "Java", value: "Java", index: 0 },
            { label: "Objective-C", value: "Objective-C", index: 1 },
            { label: "Swift", value: "Swift", index: 2 },
            { label: "Koltin", value: "Koltin", index: 3 },
            { label: "React-Native iOS/Android", value: "React-Native", index: 4 },
            { label: "JavaScript", value: "JavaScript", index: 5 },
            { label: "Scala", value: "Scala", index: 6 },
            { label: "PHP", value: "PHP", index: 7 },
            { label: "Ruby", value: "Ruby", index: 8 },
            { label: "TypeScript", value: "TypeScript", index: 9 },
            { label: "Python", value: "Python", index: 10 },
            { label: "C#", value: "C#", index: 11 },
            { label: "C++", value: "C++", index: 12 },
            { label: "CSS3", value: "CSS3", index: 13 },
            { label: "HTML5", value: "HTML5", index: 14 },
            { label: "C", value: "C", index: 16 },
            { label: "SQL", value: "SQL", index: 17 },
            { label: "MATLAB", value: "MATLAB", index: 18 },
            { label: "Groovy", value: "Groovy", index: 19 },
            { label: "Rust", value: "Rust", index: 20 },
            { label: "JavaScript Libraries (react, angular, vue)", value: "JavaScript-Libraries", index: 21 },
            { label: "Visual Basic", value: "Visual-Basic", index: 22 },
            { label: "SASS", value: "SASS", index: 23 },
            { label: "TypeScript", value: "TypeScript", index: 24 }
        ];
        const firstOptions = [
            { label: 'Desktop App Development', value: 'desktop-app-development', id: 1 },
            { label: 'Mobile App Development', value: 'mobile-app-development', id: 2 }, 
            { label: 'Web Development', value: "web-development", id: 3 }, 
            { label: 'Web Design', value: "web-design", id: 4 }, 
            { label: 'Video Game Development', value: "video-game-development", id: 5 },
            { label: 'Database-Design', value: "database-design", id: 6 },
            { label: 'AI/ML', value: "AI/ML", id: 7 },
            { label: 'General Software Development', value: "general-software-development", id: 8 }

        ];
        const platformOptions = [
            { label: "Hybrid", value: "hybrid", index: 0 },
            { label: "iOS", value: "iOS", index: 1 },
            { label: "Android", value: "android", index: 2 },
            { label: "Native", value: "native", index: 3 },
            { label: "React-Native iOS/Android", value: "react-native-iOS/Android", index: 4 },
            { label: "Windows", value: "windows", index: 5 },
            { label: "iPadOS", value: "iPadOS", index: 6 },
            { label: "tvOS", value: "tvOS", index: 7 },
            { label: "watchOS", value: "watchOS", index: 8 },
            { label: "Electron Desktop", value: "electron-desktop-dev", index: 9 }
        ];
        const databaseList = [
            { label: "Oracle", value: "Oracle", index: 0 },
            { label: "MySQL", value: "MySQL", index: 1 },
            { label: "Microsoft SQL Server", value: "Microsoft-SQL-Server", index: 2 },
            { label: "PostgreSQL", value: "PostgreSQL", index: 3 },
            { label: "MongoDB", value: "MongoDB", index: 4 },
            { label: "IMB Db2", value: "IMB-Db2", index: 5 },
            { label: "Elasticsearch", value: "Elasticsearch", index: 6 },
            { label: "Redis", value: "Redis", index: 7 }
        ];
        const webServerOptions = [
            { label: "Apache HTTP Server", value: "Apache-HTTP-Server", index: 0 },
            { label: "NGINX", value: "NGINX", index: 1 },
            { label: "Apache Tomcat", value: "Apache-Tomcat", index: 2 },
            { label: "Oracle WebLogic Server", value: "Oracle-WebLogic-Server", index: 3 },
            { label: "Apache Geronimo", value: "Apache-Geronimo", index: 4 },
            { label: "lighttpd", value: "lighttpd", index: 5 },
            { label: "Eclipse Jetty", value: "Eclipse-Jetty", index: 6 },
            { label: "IBM WebSphere", value: "IBM-WebSphere", index: 7 },
            { label: "Microsoft IIS", value: "Microsoft-IIS", index: 8 },
            { label: "Oracle GlassFish Server", value: "Oracle-GlassFish-Server", index: 9 },
            { label: "WildFly", value: "WildFly", index: 10 },
            { label: "LiteSpeed", value: "LiteSpeed", index: 11 },
            { label: "Node.JS", value: "Node.JS", index: 12 }
        ];
        const businessSizeOptions = [
            { label: "Very Small (1-9 Employees)", value: "very-small", index: 0 },
            { label: "Small (10-99 Employees)", value: "small", index: 1 },
            { label: "Mid (100-999 Employees)", value: "mid", index: 2 },
            { label: "Large (1000+ Employees)", value: "large", index: 3 },
            { label: "Start-Up", value: "start-up", index: 4 },
            { label: "Fortune 500", value: "fortune-500", index: 5 }
        ];
        return (
            <div id="margin">
                <div id={this.state.expanded === true ? "create-space" : "no-space"} style={{ borderTop: "3px solid lightgrey" }}>
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
                                            <li>Details/Type</li>
                                            <li style={{ color: "red" }}>Expertise</li>
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
                                        <h3 className="text-center">What skills and expertise are most important to you in the development process?</h3>
                                            <div className="row">

                                               <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                                    <div class="section-headline margin-top-25 margin-bottom-12">
                                                        <h5>Type of device development (optional)</h5>
                                                    </div>

                                                    <Select multi={true} options={firstOptions} onChange={(values) => {
                                                        this.setState({
                                                            deviceType: values
                                                        })
                                                    }} />
                                                    
                                                    
                                                 
                                               </div>
                                              
                                            
                                            

                                               <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                                    <div class="section-headline margin-top-25 margin-bottom-12">
                                                        <h5>Platforms (optional)</h5>
                                                    </div>

                                                    <Select multi={true} options={platformOptions} onChange={(values) => {
                                                        this.setState({
                                                            platform: values
                                                        })
                                                    }} />
                                                    
                                                   
                                               </div>
                                                    
                                            
                                            </div>
                                            <hr className="black-line" />
                                            <div className="row">

                                               <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                                    <div class="section-headline margin-top-25 margin-bottom-12">
                                                        <h5>Programming Languages (optional)</h5>
                                                    </div>

                                                    <Select multi={true} options={programmingLanguages} onChange={(values) => {
                                                        this.setState({
                                                            programmingLanguages: values
                                                        })
                                                    }} />
                                                    
                                                   
                                               </div>
                                              
                                            
                                         

                                               <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                                    <div class="section-headline margin-top-25 margin-bottom-12">
                                                        <h5>Database types (Optional)</h5>
                                                    </div>

                                                    <Select multi={true} options={databaseList} onChange={(values) => {
                                                        this.setState({
                                                            databaseTypes: values
                                                        })
                                                    }} />
                                                    
                                                   
                                               </div>
                                              
                                            
                                            </div>
                                            <hr className="black-line" />
                                            <div className="row">

                                               <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                                    <div class="section-headline margin-top-25 margin-bottom-12">
                                                        <h5>Web Server types (Optional)</h5>
                                                    </div>

                                                    <Select multi={true} options={webServerOptions} onChange={(values) => {
                                                        this.setState({
                                                            webserverTypes: values
                                                        })
                                                    }} />
                                                    
                                                   
                                               </div>
                                              
                                            
                                     

                                               <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                                    <div class="section-headline margin-top-25 margin-bottom-12">
                                                        <h5>Business Size Experience (optional)</h5>
                                                    </div>

                                                    <Select multi={true} options={businessSizeOptions} onChange={(values) => {
                                                        this.setState({
                                                            businessSize: values
                                                        })
                                                    }} />
                                                    
                                                   
                                               </div>
                                              
                                            
                                            </div>
                                            <div className="row" style={{ marginTop: "40px" }}>

                                                <div className="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
                                                    <div class={this.state.experienceLevel === "entry-level" ? "card selected-card" : "card"} style={{ width: "100%" }}>
                                                        <div class="card-header">
                                                            Entry-Level
                                                        </div>
                                                        <div class="card-body">
                                                            <h5 class="card-title">Complete project in timely/budget friendly manner</h5>
                                                            <p class="card-text">Looking for someone relatively new to this field</p>
                                                            <button onClick={() => {
                                                                this.setState({
                                                                    experienceLevel: "entry-level"
                                                                })
                                                            }} href="#" class="btn blue-btn" style={{ color: "white" }}>Select Option</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
                                                <div class="frb-group">
                                                    <div class={this.state.experienceLevel === "intermediate" ? "card selected-card" : "card"} style={{ width: "100%" }}>
                                                        <div class="card-header">
                                                            Intermediate
                                                        </div>
                                                        <div class="card-body">
                                                            <h5 class="card-title">Enough experience to complete the job quickly and properly</h5>
                                                            <p class="card-text">Looking for substantial experience in this field</p>
                                                            <button onClick={() => {
                                                                this.setState({
                                                                    experienceLevel: "intermediate"
                                                                })
                                                            }} href="#" class="btn blue-btn" style={{ color: "white" }}>Select Option</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
                                                <div class="frb-group">
                                                    <div class={this.state.experienceLevel === "expert-level" ? "card selected-card" : "card"} style={{ width: "100%" }}>
                                                        <div class="card-header">
                                                            Expert-Level
                                                        </div>
                                                        <div class="card-body">
                                                            <h5 class="card-title">Pro-level developers (only) completing project in an agile form</h5>
                                                            <p class="card-text">Looking for comprehensive and deep expertise in this field.</p>
                                                            <button onClick={() => {
                                                                this.setState({
                                                                    experienceLevel: "expert-level"
                                                                })
                                                            }} href="#" class="btn blue-btn" style={{ color: "white" }}>Select Option</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                              
                                            
                                            </div>
                                            <div className="row">
                                                <div style={{ margin: "40px 0px 20px 10px" }}>
                                                <label className="text-left">Add additional custom skills from a list or manually enter</label>
                                                <div class="keyword-input-container boxed">
                                                <button onClick={() => {
                                                    this.setState({
                                                        show: !this.state.show,
                                                        expanded: true,
                                                        saved: [...this.state.additionalSkillsOptions]
                                                    })
                                                }} class="keyword-input-button ripple-effect"><i class="icon-material-outline-add"></i></button>
                                               </div>
                                                </div>
                                            {this.state.show === true ? <div class="col-xl-12 col-md-12">
                                                <div class="section-headline margin-top-25 margin-bottom-12">
                                                    <h5>What additional skills and expertise are important to you?</h5>
                                                    {this.state.additionalSkillsOptions.length === 0 ? null : <label>De-select all tags that are NOT relevant to your listing, otherwise they will be included in your job posting... or <div style={{ color: "#DD2D4A", fontWeight: "bold" }} onClick={() => {
                                                        this.setState({
                                                            additionalSkillsOptions: []
                                                        })
                                                    }}>CLEAR ALL PRE-SELECTED ITEMS</div></label>}
                                                </div>

                                                <div class="keywords-container">
                                                    <div class="keyword-input-container">
                                                        <input onChange={(e) => {
                                                            this.setState({
                                                                keyword: e.target.value
                                                            })
                                                        }} type="text" class="keyword-input with-border" placeholder="Add Skills" value={this.state.keyword}/>
                                                        <button onClick={this.addKeyword} class="keyword-input-button ripple-effect"><i class="icon-material-outline-add"></i></button>
                                                    </div>
                                                    <div class="keywords-list">
                                                        {this.state.additionalSkillsOptions.map((each, index) => {
                                                            return (
                                                                <span class="keyword"><span onClick={() => {
                                                                    this.removeItem(each);
                                                                }} class="keyword-remove"></span><span class="keyword-text">{each.value}</span></span>
                                                            );
                                                        })}
                                                        
                                                    </div>
                                                    <div class="clearfix"></div>
                                                </div>
                                            </div> : null}
                                            </div>
                                        </div>
                                            
                                        </div>
                                        
                                    </div>

                                    <div class="col-xl-12">
                                        <button onClick={() => {
                                            console.log("clicked.")
                                            this.props.history.push("/signup/business/page/2");
                                        }} class="button custom-btn red-btn ripple-effect big margin-top-30">Back to previous page</button>
                                    </div>

                                    <div class="col-xl-12">
                                        <button style={{ width: "100%" }} onClick={() => {
                                            this.setState({
                                                openPanel: true,
                                                saved: [...this.state.additionalSkillsOptions]
                                            })
                                        }} class="button blue-btn ripple-effect big margin-top-30">Continue to next page </button>
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
                <SlidingPane
                    className="panel-panel"
                    overlayClassName="panel-overlay-special"
                    isOpen={this.state.openPanel}
                    title="Select whether or not you'd like to include the 'additional skills' section of this page..."
                    onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                        this.setState({ openPanel: false });
                    }}
                >
                    <div id="slide-up-bottom-overlay">
                        
                        <div className="container">
                            <div style={{ marginBottom: "30px", marginTop: "30px" }} className="row">
                                
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">    
                                    <RadioGroup onChange={ this.onChangeRadio } horizontal>
                                        <RadioButton pointColor={"blue"} rootColor={"black"} value="without">
                                            Proceed <strong style={{ color: "red" }}>WITHOUT</strong> adding any skills in the additional skills section...
                                        </RadioButton>
                                
                                        <RadioButton pointColor={"blue"} rootColor={"black"} value="with">
                                            Proceed & <strong style={{ color: "red" }}>INCLUDE</strong> the additional skills...!
                                        </RadioButton>
                                    </RadioGroup>

                                    {this.state.withOrWithout.length !== 0 ? <button onClick={() => {
                                        this.handleFinalSubmission(); 
                                    }} className="btn blue-btn" style={{ width: "100%", color: "white", marginTop: "30px", marginBottom: "30px" }}>Update account and proceed to next page...</button> : null}
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </SlidingPane>
                {/* <SlidingPanel 
                    backdropClicked={() => {
                        this.setState({
                            openPanel: false
                        })
                    }}
                    type={'bottom'}
                    isOpen={this.state.openPanel}
                    size={25} 
                    panelContainerClassName={"overlay-sliding-panel"}
                >
                    
                </SlidingPanel> */}
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
export default withRouter(connect(mapStateToProps, { authentication })(ExpertiseHelper));