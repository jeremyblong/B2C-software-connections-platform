import React, { Component, Fragment } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import ReactLoading from 'react-loading';
import { Spinner } from "reactstrap";
import places from "places.js";
import "./style.css";
import MultiSelect from "react-multi-select-component";
import Select from "react-dropdown-select";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Slider from 'react-rangeslider';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { NotificationManager } from 'react-notifications';
import Dropzone from 'react-dropzone';
import moment from "moment";

class PostAJob extends Component {
constructor(props) {
    super(props)
    
    this.state = {
        business: false,
        user: null,
        normalFile: null,
        loaded: false,
        job_title: "",
        category: "",
        job_description: "",
        length_of_project: "",
        placesInstance: null,
        selected_location: null,
        experienceLevel: null,
        businessSize: null,
        databaseTypes: null,
        webserverTypes: null,
        deviceType: null,
        platform: null,
        questionError: "",
        programmingLanguages: null,
        talentType: "",
        number_of_freelancers: null,
        pay_rate_amount_hourly: 0,
        pay_rate_amount_fixed: 0,
        additonal_skill: null,
        additionalSkillsOptions: [],
        amountEarned: null,
        successScore: null,
        amountEarned: null,
        country: "",
        state: "",
        companyOrNo: "",
        isPaneOpen: false,
        files: [],
        acceptedFile: null,
        location: null,
        pay_type: "",
        addition: "",
        minimum_earnings: "",
        questions: false,
        preselected: [{
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
        }]
    }
}
    handleFinalSubmission = () => {
        console.log("clicked submission...");

        const { job_title, length_of_project, category, location, experienceLevel, deviceType, platform, webserverTypes, databaseTypes, programmingLanguages, talentType, businessSize, successScore, amountEarned, number_of_freelancers, pay_rate_amount_fixed, pay_rate_amount_hourly, pay_type, country, companyOrNo, state, job_description, preselected, additionalSkillsOptions, questions, files } = this.state;

        // optional = additionalSkillsOptions, country, 
        
        if (job_title.length > 0 && length_of_project.length > 0 && category.length > 0 && location !== null && experienceLevel !== null && talentType.length > 0 && successScore !== null && amountEarned !== null && number_of_freelancers !== null && (pay_rate_amount_fixed !== 0 || pay_rate_amount_hourly !== 0) && pay_type.length > 0 && companyOrNo.length > 0 && job_description.length > 0) {
            console.log("all checked and ready to go...!!!");

            axios.post("/list/secondary/job", {
                username: this.props.username,
                title: job_title,
                length_of_project, 
                type_of_dev: category,
                poster_location: location,
                experience_level: experienceLevel,
                who_can_see: talentType,
                applicant_success_score: successScore, 
                applicant_amount_earned: amountEarned, 
                number_of_freelancers,
                pay_rate: pay_rate_amount_fixed !== 0 ? pay_rate_amount_fixed : pay_rate_amount_hourly,
                pay_type,
                talent_type: companyOrNo,
                description: job_description,
                deviceType: deviceType !== null ? deviceType : null,
                platform: platform !== null ? platform : null,
                web_server_types: webserverTypes !== null ? webserverTypes : null,
                database_types: databaseTypes !== null ? databaseTypes : null,
                programming_languages: programmingLanguages !== null ? programmingLanguages : null,
                business_size: businessSize !== null ? businessSize :  null,
                country: country.length > 0 ? country : null,
                timezone_or_state: state.length > 0 ? state : null,
                preselected: questions === true ? preselected : null,
                additional_skills: additionalSkillsOptions.length > 0 ? additionalSkillsOptions : [],
                files: files.length > 0 ? files : null
            }).then((res) => {
                if (res.data.message === "ALL logic was executed successfully!") {
                    console.log("ALL logic was executed successfully!", res.data);

                    setTimeout(() => {
                        this.props.history.push("/dashboard");
                    }, 1500);
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            NotificationManager.error('You are missing some required fields...Complete every required field before proceeding', 'Double check which fields are required and complete them', 7000);
        }
    }
    componentDidMount() {

        axios.post("/gather/specific/user/username", {
            username: this.props.username
        }).then((res) => {
            if (res.data.message === "Found Specific User!") {
                console.log(res.data);
                if (res.data.user.accountType === "business") {
                    this.setState({
                        user: res.data.user,
                        business: true,
                        loaded: true
                    });

                    setTimeout(() => {
                        const fixedOptions = {
                            appId: 'plQYSC0SKL1W',
                            apiKey: '25eed220e2ba5812b5496ddc2340c555',
                            container: document.querySelector('#addressinputtt'),
                          };
                          
                          const reconfigurableOptions = {
                            language: 'en', 
                            countries: ['us', "en"],
                            types: "city"
                          };
                          const placesInstance = places(fixedOptions).configure(reconfigurableOptions);

                          this.setState({
                              placesInstance
                          })
                    }, 2000);
                } else {
                    this.setState({
                        user: res.data.user,
                        loaded: true
                    }, () => {
                        setTimeout(() => {
                            const fixedOptions = {
                                appId: 'plQYSC0SKL1W',
                                apiKey: '25eed220e2ba5812b5496ddc2340c555',
                                container: document.querySelector('#addressinputtt'),
                            };
                              
                                const reconfigurableOptions = {
                                    language: 'en', 
                                    countries: ['us'], // Search in the United States of America and in the Russian Federation
                                    type: 'address', // Search only for cities names
                                };
                                const placesInstance = places(fixedOptions).configure(reconfigurableOptions);

                                this.setState({
                                    placesInstance
                                })
                        }, 2000);
                    })
                }
            }
        }).catch((err) => {
            console.log(err);
            this.setState({
                loaded: true
            })
        })
    }
    convert = (data) => {
        console.log("Data", data);
        return `$${data} HOURLY USD`;
    }
    convertFixed = (data) => {
        return `$${data} FIXED-PRICE USD`;
    }
    handleOnChangeHourly = (value) => {
        this.setState({
            pay_rate_amount_hourly: value,
            pay_rate_amount_fixed: 0,
            pay_type: "HOURLY"
        })
    }
    handleOnChangeFixed = (value) => {
        this.setState({
            pay_rate_amount_fixed: value,
            pay_rate_amount_hourly: 0,
            pay_type: "FIXED-PRICE"
        })
    }
    renderConditional = () => {
        if (this.state.placesInstance !== null) {
            this.state.placesInstance.on('change', e => {
                this.setState({
                    selected_location: e.suggestion
                })
                console.log("e.suggestion", e.suggestion)
            });
        }

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

        const { additionalSkillsOptions, preselected, questions } = this.state;

        if (this.state.business === true) {
            return (
                <div class="dashboard-content-container" data-simplebar>
		                <div class="dashboard-content-inner">

                                <div class="dashboard-headline">
                                    <h3 className="text-left">Post a Job</h3>

                                    <nav id="breadcrumbs" class="dark">
                                        <ul>
                                            <li><Link to="/">Home</Link></li>
                                            <li><Link to="/dashboard">Dashboard</Link></li>
                                            <li>Post a Job</li>
                                        </ul>
                                    </nav>
                                </div>
                        

                            <div class="row">

                            
                            <div class="col-xl-12">
                                <div class="dashboard-box margin-top-0">

                                    
                                    <div class="headline">
                                        <h3><i class="icon-feather-folder-plus"></i> Job Submission Form</h3>
                                    </div>

                                    <div class="content with-padding padding-bottom-10">
                                        <div className="mx-auto" style={{ marginTop: "40px", marginBottom: "30px" }}>
                                            <h2 style={{ color: "blue", textDecoration: "underline" }} className="text-center">Enter your basic job information below - pay attention to the blue text for guidence</h2>
                                        </div>
                                        <div class="row">

                                            <div class="col-xl-4">
                                                <div class="submit-field">
                                                    <h5>Job Title</h5>
                                                    <label>Enter a captivating & accurate title to draw attention from potential freelancers + agencies</label>
                                                    <input onChange={(e) => {
                                                        this.setState({
                                                            job_title: e.target.value
                                                        })
                                                    }} value={this.state.job_title} placeholder={"Front-End Developer need ASAP - high pay - lengthy project..."} type="text" class="with-border"/>
                                                </div>
                                            </div>

                                            <div class="col-xl-4">
                                                <div class="submit-field">
                                                    <h5>Length/type Of Project</h5>
                                                    <label>Select your job type</label>
                                                    <select onChange={(e) => {
                                                        this.setState({
                                                            length_of_project: e.target.value
                                                        })
                                                    }} value={this.state.length_of_project} class="form-control" required>
                                                        <option value={"----select a value----"}>--- pick an option ---</option>
                                                        <option value={"complex-project"}>Complex/Lengthy Project (Long term project)</option>
                                                        <option value={"on-going-project"}>On-Going Project (Mix between a short-term and long-term project)</option>
                                                        <option value={"temporary-short-term-project"}>Short Term Project (4 weeks or less)</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-xl-4">
                                            <div className="submit-field">
                                                        <h5>Category</h5>
                                                        <label>Let's categorize your job, which helps us personalize your job details and match your job to relevant freelancers and agencies.</label>
                                                        <select value={this.state.category} onChange={(e) => {
                                                            this.setState({
                                                                category: e.target.value
                                                            })
                                                        }} className="form-control" >
                                                            <option value="-----">---- pick an option ----</option>
                                                            <option value="full-stack-software-project">Full-Stack Development</option>
                                                            <option value="front-end-development-only">Front-End Development (only)</option>
                                                            <option value="back-end-development-only">Back-End Development (only)</option>
                                                            <option value="ML/AI">Machine learning - Artificial intelligence</option>
                                                            <option value="big-data">Big Data</option>
                                                            <option value="web-development">Web Development</option>
                                                            <option value="mobile-app-development">Mobile App Development</option>
                                                            <option value="database-design">Database Design</option>
                                                            <option value="hacking-networking">Hacking - Networking</option>
                                                            <option value="project-management">Project Management</option>
                                                            <option value="Q-A">Quality Assurance (QA)</option>
                                                            <option value="test-driven-development">Test Driven Development</option>
                                                            <option value="AR/VR-Development">AR/VR Development</option>
                                                            <option value="desktop-app-development">Desktop App Development</option>
                                                            <option value="mobile-design">Mobile Design</option>
                                                            <option value="AR/VR-Development">Mobile Game Development</option>
                                                            <option value="UX/UI-design">UI/UX Design</option>
                                                            <option value="prototyping">Prototyping</option>
                                                            <option value="product-management">Project Management</option>
                                                            <option value="agile-scrum-guidence">Agile/Scrum Guidence</option>
                                                            <option value="general-game-development">General Game Development</option>
                                                        </select>	
                                                    </div>
                                            </div>

                                            <div class="col-xl-4">
                                                <div class="submit-field">
                                                    <h5>City/Location</h5>
                                                    <label style={{ color: "blue" }}>Complete this "City" field before any other location fields to automatically fill them in</label>
                                                    <div class="input-with-icon">
                                                        <div id="autocomplete-container">
                                                            <input onChange={(e) => {
                                                                this.setState({
                                                                    location: e.target.value
                                                                })
                                                            }} id="addressinputtt" class="with-border" type="search" placeholder="Enter A City..." />
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xl-4">
                                                <div class="submit-field">
                                                    <h5>Country/Location</h5>
                                                    <label>This will be automatically filled in upon completing "Street-Address/Location"</label>
                                                    <input value={this.state.selected_location ? this.state.selected_location.country : null} type="text" class="keyword-input with-border" placeholder="This will be automatically filled in upon address completion"/>
                                                </div>
                                            </div>

                                            <div class="col-xl-4">
                                                <div class="submit-field">
                                                    <h5>Postal-Code/Location</h5>
                                                    <label>This will be automatically filled in upon completing "Street-Address/Location"</label>
                                                    <input value={this.state.selected_location ? this.state.selected_location.postcode.slice(0, 5) : null} type="text" class="keyword-input with-border" placeholder="This will be automatically filled in upon address completion"/>

                                                </div>
                                            </div>
                                            <div className="mx-auto">
                                                <h2 style={{ color: "blue", textDecoration: "underline" }} className="text-center">Please select the experience level you desire of the developers applying for this position</h2>
                                            </div>
                                            <div className="row" style={{ marginTop: "40px", marginBottom: "40px" }}>
                                                            
                                                <div className="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
                                                    <div class={this.state.experienceLevel === "entry-level" ? "card selected-card one-third" : "card one-third"}>
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
                                                    <div class={this.state.experienceLevel === "intermediate" ? "card selected-card one-third" : "card one-third"}>
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
                                                    <div class={this.state.experienceLevel === "expert-level" ? "card selected-card one-third" : "card one-third"}>
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
                                                <div className="mx-auto" style={{ marginTop: "40px" }}>
                                                    <h2 style={{ color: "blue", textDecoration: "underline" }} className="text-center">Technical Skills & Languages desired from freelancer/agency for this "specific" project</h2>
                                                </div>
                                            
                                            </div>

                                            

                                            <div class="col-xl-6">
                                                <div class="submit-field">
                                                    <div class="section-headline margin-top-25 margin-bottom-12">
                                                        <h5>Type of device development (optional)</h5>
                                                    </div>

                                                    <Select multi={true} options={firstOptions} onChange={(values) => {
                                                        this.setState({
                                                            deviceType: values
                                                        })
                                                    }} />
                                                </div>
                                            </div>
                                            <div class="col-xl-6">
                                                <div class="submit-field">
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
                                            <div class="col-xl-6">
                                                <div class="submit-field">
                                                    <div class="section-headline margin-top-25 margin-bottom-12">
                                                        <h5>Programming Languages (optional)</h5>
                                                    </div>

                                                    <Select multi={true} options={programmingLanguages} onChange={(values) => {
                                                        this.setState({
                                                            programmingLanguages: values
                                                        })
                                                    }} />
                                                </div>
                                            </div>
                                            <div class="col-xl-6">
                                                <div class="submit-field">
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
                                            <div class="col-xl-6">
                                                <div class="submit-field">
                                                    <div class="section-headline margin-top-25 margin-bottom-12">
                                                        <h5>Web Server types (Optional)</h5>
                                                    </div>

                                                    <Select multi={true} options={webServerOptions} onChange={(values) => {
                                                        this.setState({
                                                            webserverTypes: values
                                                        })
                                                    }} />
                                                </div>
                                            </div>
                                            <div class="col-xl-6">
                                                <div class="submit-field">
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
                                                    
                                        </div>
                                        <div className="mx-auto">
                                            <h2 style={{ color: "blue", textDecoration: "underline" }} className="text-center">Job Posting <strong style={{ color: "darkblue", textDecoration: "underline" }}>Visibility</strong></h2>
                                        </div>
                                        <div style={{ margin: "40px 0px" }} class="row">

                                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-xl-4">
                                                        <div className={this.state.talentType === "ANYONE" ? "card selected-card one-third" : "card one-third"} style={{ width: "100%" }}>
                                                            <div className="card-header">
                                                                Anyone (ANY Freelancers)
                                                            </div>
                                                            <div className="card-body">
                                                                
                                                                <p className="card-text">Freelancers and agencies using [Company Name(s)] and public search engines can find this job.</p>
                                                                <button onClick={() => {
                                                                    this.setState({
                                                                        talentType: "ANYONE"
                                                                    })
                                                                }} className={this.state.talentType === "ANYONE" ? "btn btn-dark" : "btn blue-btn"} style={{ color: "white" }}>Select Option</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-xl-4">
                                                    <div className="frb-group">
                                                        <div className={this.state.talentType === "PLATFORM-SPECIFIC" ? "card selected-card one-third" : "card one-third"} style={{ width: "100%" }}>
                                                            <div className="card-header">
                                                                Only [Company Name(s)] talent
                                                            </div>
                                                            <div className="card-body">
                                                               
                                                                <p className="card-text">Only [Company Name(s)] users can find this job.</p>
                                                                <button onClick={() => {
                                                                    this.setState({
                                                                        talentType: "PLATFORM-SPECIFIC"
                                                                    })
                                                                }} className={this.state.talentType === "PLATFORM-SPECIFIC" ? "btn btn-dark" : "btn blue-btn"} style={{ color: "white" }}>Select Option</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-xl-4">
                                                    <div className="frb-group">
                                                        <div className={this.state.talentType === "INVITE-ONLY" ? "card selected-card one-third" : "card one-third"} style={{ width: "100%" }}>
                                                            <div className="card-header">
                                                                Invitation-ONLY
                                                            </div>
                                                            <div className="card-body">
                                                            
                                                                <p className="card-text">Only freelancers and agencies you have invited can find this job.</p>
                                                                <button onClick={() => {
                                                                    this.setState({
                                                                        talentType: "INVITE-ONLY"
                                                                    })
                                                                }} className={this.state.talentType === "INVITE-ONLY" ? "btn btn-dark" : "btn blue-btn"} style={{ color: "white" }}>Select Option</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12" style={{ marginTop: "30px" }}>
                                                    <div class="submit-field">
                                                        <h5>Minimum Amount Earned Previously</h5>
                                                        <label>Minimum amount earned required from freelancer applicant's</label>
                                                        <select className="form-control" onChange={(e) => {
                                                            this.setState({
                                                                amountEarned: e.target.value
                                                            })
                                                        }}>
                                                            <option value="---select a value---">---select a value---</option>
                                                            <option value="doesnt-matter">Doesn't Matter</option>
                                                            <option value="$100+">$100+</option>
                                                            <option value="$1,000+">$1,000+</option>
                                                            <option value="$5,000+">$5,000+</option>
                                                            <option value="$10,000+">$10,000+</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12" style={{ marginTop: "30px" }}>
                                                    <div class="submit-field">
                                                        <h5>Minimum Success Score</h5>
                                                        <label>Minimum success score required to apply for position... (success score are previously completed jobs by the freelancers)</label>
                                                        <select className="form-control" onChange={(e) => {
                                                            this.setState({
                                                                successScore: e.target.value
                                                            })
                                                        }}>
                                                            <option value="---select a value---">---select a value---</option>
                                                            <option value="doesnt-matter">Doesn't Matter</option>
                                                            <option value="80%+">80%+</option>
                                                            <option value="90%+">90%+</option>
                                                            <option value="Any-job-success">ANY Job Success</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                

                                            <div style={{ marginTop: "30px" }} class="col-xl-4">
                                            <label> Select how many freelancers you need...</label>
                                                <div class="submit-field">
                                                    <InputGroup>
                                                        <InputGroupAddon addonType="prepend"># Of Freelancers</InputGroupAddon>
                                                        <Input value={this.state.number_of_freelancers} onChange={(e) => {
                                                            this.setState({
                                                                number_of_freelancers: Number(e.target.value)
                                                            })
                                                        }} placeholder="#" min={0} max={10} type="number" step="1" />
                                                        <InputGroupAddon addonType="append">Coders</InputGroupAddon>
                                                    </InputGroup>
                                                </div>
                                            </div>

                                            {this.state.pay_type === "FIXED-PRICE" ? <div style={{ marginTop: "30px" }} class="col-xl-4">
                                                <label onClick={() => {
                                                    console.log("clicked");
                                                    this.setState({
                                                        pay_type: "HOURLY"
                                                    })
                                                }} style={{ color: "blue" }}>Select your <strong style={{ color: "darkblue" }}>FIXED-PRICE</strong> rate (Click to change to HOURLY pay...)</label>
                                                
                                                <Slider
                                                    value={this.state.pay_rate_amount_fixed}
                                                    orientation="horizontal"
                                                    onChange={this.handleOnChangeFixed} 
                                                    min={500}
                                                    max={10000} 
                                                    step={100}
                                                    format={this.convertFixed}
                                                /><div className="mx-auto"><p className="lead">{`$${this.state.pay_rate_amount_fixed}`}</p></div></div> : <div style={{ marginTop: "30px" }} class="col-xl-4">
                                                <label onClick={() => {
                                                    console.log("clicked");
                                                    this.setState({
                                                        pay_type: "FIXED-PRICE"
                                                    })
                                                }} style={{ color: "blue" }}>Select your <strong style={{ color: "darkblue" }}>HOURLY</strong> rate (Click to change to FIXED-RATE pay...)</label>
                                                
                                                <Slider
                                                    value={this.state.pay_rate_amount_hourly}
                                                    orientation="horizontal"
                                                    onChange={this.handleOnChangeHourly} 
                                                    min={25}
                                                    max={125} 
                                                    format={this.convert}
                                                /><div className="mx-auto"><p className="lead">{`$${this.state.pay_rate_amount_hourly}`}</p></div></div>}
                                            <div style={{ marginTop: "30px" }} class="col-xl-4">
                                                <div class="submit-field">
                                                    <h5>Additional Skills <span>(optional)</span>  <i class="help-icon" data-tippy-placement="right" title="Maximum of 10 tags"></i></h5>
                                                    <div class="keywords-container">
                                                        <div class="keyword-input-container">
                                                            <input onChange={(e) => {
                                                                this.setState({
                                                                    additonal_skill: e.target.value
                                                                })
                                                            }} value={this.state.additonal_skill} type="text" class="keyword-input with-border" placeholder={"Enter languages and/or technologies..."}/>
                                                            <button onClick={this.handleSubmissionSkillAdd} class="keyword-input-button ripple-effect"><i class="icon-material-outline-add"></i></button>
                                                        </div>
                                                        <div class="keywords-list">{additionalSkillsOptions ? additionalSkillsOptions.map((skill, index) => {
                                                            return (
                                                                <span class="keyword"><span onClick={() => {
                                                                    this.removeItem(skill);
                                                                }} class="keyword-remove"></span><span class="keyword-text">{skill.value}</span></span>
                                                            );
                                                        }) : null}</div>
                                                        <div class="clearfix"></div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                                <div class="submit-field">
                                                <label style={{ fontWeight: "bold", margin: "20px 0px" }}>Select a preferred country (Optional)</label>
                                                <select onChange={(e) => {
                                                    this.setState({
                                                        country: e.target.value
                                                    })
                                                }} className="form-control" id="country">
                                                    <option value="----select an option----">----select an option----</option>
                                                    <option value="Afganistan">Afghanistan</option>
                                                    <option value="Albania">Albania</option>
                                                    <option value="Algeria">Algeria</option>
                                                    <option value="American Samoa">American Samoa</option>
                                                    <option value="Andorra">Andorra</option>
                                                    <option value="Angola">Angola</option>
                                                    <option value="Anguilla">Anguilla</option>
                                                    <option value="Antigua & Barbuda">Antigua & Barbuda</option>
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
                                                    <option value="Bonaire">Bonaire</option>
                                                    <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                                                    <option value="Botswana">Botswana</option>
                                                    <option value="Brazil">Brazil</option>
                                                    <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                                                    <option value="Brunei">Brunei</option>
                                                    <option value="Bulgaria">Bulgaria</option>
                                                    <option value="Burkina Faso">Burkina Faso</option>
                                                    <option value="Burundi">Burundi</option>
                                                    <option value="Cambodia">Cambodia</option>
                                                    <option value="Cameroon">Cameroon</option>
                                                    <option value="Canada">Canada</option>
                                                    <option value="Canary Islands">Canary Islands</option>
                                                    <option value="Cape Verde">Cape Verde</option>
                                                    <option value="Cayman Islands">Cayman Islands</option>
                                                    <option value="Central African Republic">Central African Republic</option>
                                                    <option value="Chad">Chad</option>
                                                    <option value="Channel Islands">Channel Islands</option>
                                                    <option value="Chile">Chile</option>
                                                    <option value="China">China</option>
                                                    <option value="Christmas Island">Christmas Island</option>
                                                    <option value="Cocos Island">Cocos Island</option>
                                                    <option value="Colombia">Colombia</option>
                                                    <option value="Comoros">Comoros</option>
                                                    <option value="Congo">Congo</option>
                                                    <option value="Cook Islands">Cook Islands</option>
                                                    <option value="Costa Rica">Costa Rica</option>
                                                    <option value="Cote DIvoire">Cote DIvoire</option>
                                                    <option value="Croatia">Croatia</option>
                                                    <option value="Cuba">Cuba</option>
                                                    <option value="Curaco">Curacao</option>
                                                    <option value="Cyprus">Cyprus</option>
                                                    <option value="Czech Republic">Czech Republic</option>
                                                    <option value="Denmark">Denmark</option>
                                                    <option value="Djibouti">Djibouti</option>
                                                    <option value="Dominica">Dominica</option>
                                                    <option value="Dominican Republic">Dominican Republic</option>
                                                    <option value="East Timor">East Timor</option>
                                                    <option value="Ecuador">Ecuador</option>
                                                    <option value="Egypt">Egypt</option>
                                                    <option value="El Salvador">El Salvador</option>
                                                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                                                    <option value="Eritrea">Eritrea</option>
                                                    <option value="Estonia">Estonia</option>
                                                    <option value="Ethiopia">Ethiopia</option>
                                                    <option value="Falkland Islands">Falkland Islands</option>
                                                    <option value="Faroe Islands">Faroe Islands</option>
                                                    <option value="Fiji">Fiji</option>
                                                    <option value="Finland">Finland</option>
                                                    <option value="France">France</option>
                                                    <option value="French Guiana">French Guiana</option>
                                                    <option value="French Polynesia">French Polynesia</option>
                                                    <option value="French Southern Ter">French Southern Ter</option>
                                                    <option value="Gabon">Gabon</option>
                                                    <option value="Gambia">Gambia</option>
                                                    <option value="Georgia">Georgia</option>
                                                    <option value="Germany">Germany</option>
                                                    <option value="Ghana">Ghana</option>
                                                    <option value="Gibraltar">Gibraltar</option>
                                                    <option value="Great Britain">Great Britain</option>
                                                    <option value="Greece">Greece</option>
                                                    <option value="Greenland">Greenland</option>
                                                    <option value="Grenada">Grenada</option>
                                                    <option value="Guadeloupe">Guadeloupe</option>
                                                    <option value="Guam">Guam</option>
                                                    <option value="Guatemala">Guatemala</option>
                                                    <option value="Guinea">Guinea</option>
                                                    <option value="Guyana">Guyana</option>
                                                    <option value="Haiti">Haiti</option>
                                                    <option value="Hawaii">Hawaii</option>
                                                    <option value="Honduras">Honduras</option>
                                                    <option value="Hong Kong">Hong Kong</option>
                                                    <option value="Hungary">Hungary</option>
                                                    <option value="Iceland">Iceland</option>
                                                    <option value="Indonesia">Indonesia</option>
                                                    <option value="India">India</option>
                                                    <option value="Iran">Iran</option>
                                                    <option value="Iraq">Iraq</option>
                                                    <option value="Ireland">Ireland</option>
                                                    <option value="Isle of Man">Isle of Man</option>
                                                    <option value="Israel">Israel</option>
                                                    <option value="Italy">Italy</option>
                                                    <option value="Jamaica">Jamaica</option>
                                                    <option value="Japan">Japan</option>
                                                    <option value="Jordan">Jordan</option>
                                                    <option value="Kazakhstan">Kazakhstan</option>
                                                    <option value="Kenya">Kenya</option>
                                                    <option value="Kiribati">Kiribati</option>
                                                    <option value="Korea North">Korea North</option>
                                                    <option value="Korea Sout">Korea South</option>
                                                    <option value="Kuwait">Kuwait</option>
                                                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                                                    <option value="Laos">Laos</option>
                                                    <option value="Latvia">Latvia</option>
                                                    <option value="Lebanon">Lebanon</option>
                                                    <option value="Lesotho">Lesotho</option>
                                                    <option value="Liberia">Liberia</option>
                                                    <option value="Libya">Libya</option>
                                                    <option value="Liechtenstein">Liechtenstein</option>
                                                    <option value="Lithuania">Lithuania</option>
                                                    <option value="Luxembourg">Luxembourg</option>
                                                    <option value="Macau">Macau</option>
                                                    <option value="Macedonia">Macedonia</option>
                                                    <option value="Madagascar">Madagascar</option>
                                                    <option value="Malaysia">Malaysia</option>
                                                    <option value="Malawi">Malawi</option>
                                                    <option value="Maldives">Maldives</option>
                                                    <option value="Mali">Mali</option>
                                                    <option value="Malta">Malta</option>
                                                    <option value="Marshall Islands">Marshall Islands</option>
                                                    <option value="Martinique">Martinique</option>
                                                    <option value="Mauritania">Mauritania</option>
                                                    <option value="Mauritius">Mauritius</option>
                                                    <option value="Mayotte">Mayotte</option>
                                                    <option value="Mexico">Mexico</option>
                                                    <option value="Midway Islands">Midway Islands</option>
                                                    <option value="Moldova">Moldova</option>
                                                    <option value="Monaco">Monaco</option>
                                                    <option value="Mongolia">Mongolia</option>
                                                    <option value="Montserrat">Montserrat</option>
                                                    <option value="Morocco">Morocco</option>
                                                    <option value="Mozambique">Mozambique</option>
                                                    <option value="Myanmar">Myanmar</option>
                                                    <option value="Nambia">Nambia</option>
                                                    <option value="Nauru">Nauru</option>
                                                    <option value="Nepal">Nepal</option>
                                                    <option value="Netherland Antilles">Netherland Antilles</option>
                                                    <option value="Netherlands">Netherlands (Holland, Europe)</option>
                                                    <option value="Nevis">Nevis</option>
                                                    <option value="New Caledonia">New Caledonia</option>
                                                    <option value="New Zealand">New Zealand</option>
                                                    <option value="Nicaragua">Nicaragua</option>
                                                    <option value="Niger">Niger</option>
                                                    <option value="Nigeria">Nigeria</option>
                                                    <option value="Niue">Niue</option>
                                                    <option value="Norfolk Island">Norfolk Island</option>
                                                    <option value="Norway">Norway</option>
                                                    <option value="Oman">Oman</option>
                                                    <option value="Pakistan">Pakistan</option>
                                                    <option value="Palau Island">Palau Island</option>
                                                    <option value="Palestine">Palestine</option>
                                                    <option value="Panama">Panama</option>
                                                    <option value="Papua New Guinea">Papua New Guinea</option>
                                                    <option value="Paraguay">Paraguay</option>
                                                    <option value="Peru">Peru</option>
                                                    <option value="Phillipines">Philippines</option>
                                                    <option value="Pitcairn Island">Pitcairn Island</option>
                                                    <option value="Poland">Poland</option>
                                                    <option value="Portugal">Portugal</option>
                                                    <option value="Puerto Rico">Puerto Rico</option>
                                                    <option value="Qatar">Qatar</option>
                                                    <option value="Republic of Montenegro">Republic of Montenegro</option>
                                                    <option value="Republic of Serbia">Republic of Serbia</option>
                                                    <option value="Reunion">Reunion</option>
                                                    <option value="Romania">Romania</option>
                                                    <option value="Russia">Russia</option>
                                                    <option value="Rwanda">Rwanda</option>
                                                    <option value="St Barthelemy">St Barthelemy</option>
                                                    <option value="St Eustatius">St Eustatius</option>
                                                    <option value="St Helena">St Helena</option>
                                                    <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                                                    <option value="St Lucia">St Lucia</option>
                                                    <option value="St Maarten">St Maarten</option>
                                                    <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                                                    <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                                                    <option value="Saipan">Saipan</option>
                                                    <option value="Samoa">Samoa</option>
                                                    <option value="Samoa American">Samoa American</option>
                                                    <option value="San Marino">San Marino</option>
                                                    <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                                    <option value="Senegal">Senegal</option>
                                                    <option value="Seychelles">Seychelles</option>
                                                    <option value="Sierra Leone">Sierra Leone</option>
                                                    <option value="Singapore">Singapore</option>
                                                    <option value="Slovakia">Slovakia</option>
                                                    <option value="Slovenia">Slovenia</option>
                                                    <option value="Solomon Islands">Solomon Islands</option>
                                                    <option value="Somalia">Somalia</option>
                                                    <option value="South Africa">South Africa</option>
                                                    <option value="Spain">Spain</option>
                                                    <option value="Sri Lanka">Sri Lanka</option>
                                                    <option value="Sudan">Sudan</option>
                                                    <option value="Suriname">Suriname</option>
                                                    <option value="Swaziland">Swaziland</option>
                                                    <option value="Sweden">Sweden</option>
                                                    <option value="Switzerland">Switzerland</option>
                                                    <option value="Syria">Syria</option>
                                                    <option value="Tahiti">Tahiti</option>
                                                    <option value="Taiwan">Taiwan</option>
                                                    <option value="Tajikistan">Tajikistan</option>
                                                    <option value="Tanzania">Tanzania</option>
                                                    <option value="Thailand">Thailand</option>
                                                    <option value="Togo">Togo</option>
                                                    <option value="Tokelau">Tokelau</option>
                                                    <option value="Tonga">Tonga</option>
                                                    <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                                                    <option value="Tunisia">Tunisia</option>
                                                    <option value="Turkey">Turkey</option>
                                                    <option value="Turkmenistan">Turkmenistan</option>
                                                    <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                                                    <option value="Tuvalu">Tuvalu</option>
                                                    <option value="Uganda">Uganda</option>
                                                    <option value="United Kingdom">United Kingdom</option>
                                                    <option value="Ukraine">Ukraine</option>
                                                    <option value="United Arab Erimates">United Arab Emirates</option>
                                                    <option value="United States of America">United States of America</option>
                                                    <option value="Uraguay">Uruguay</option>
                                                    <option value="Uzbekistan">Uzbekistan</option>
                                                    <option value="Vanuatu">Vanuatu</option>
                                                    <option value="Vatican City State">Vatican City State</option>
                                                    <option value="Venezuela">Venezuela</option>
                                                    <option value="Vietnam">Vietnam</option>
                                                    <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                                                    <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                                                    <option value="Wake Island">Wake Island</option>
                                                    <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                                                    <option value="Yemen">Yemen</option>
                                                    <option value="Zaire">Zaire</option>
                                                    <option value="Zambia">Zambia</option>
                                                    <option value="Zimbabwe">Zimbabwe</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                                <label style={{ fontWeight: "bold", margin: "20px 0px" }}>Talent Type</label>
                                                <select className="form-control" onChange={(e) => {
                                                    this.setState({
                                                        companyOrNo: e.target.value
                                                    })
                                                }}>
                                                    <option value="---select a value---">---select a value---</option>
                                                    <option value="doesnt-matter">Doesn't Matter</option>
                                                    <option value="individual">Individual</option>
                                                    <option value="agency">Agency</option>
                                                </select>
                                            </div>
                                           

                                            {this.state.country === "United States of America" ? <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12"><label style={{ margin: "20px 0px", fontWeight: "bold" }}>Select a "preferred" time-zone or state (Optional)</label><select className="form-control" onChange={(e) => {
                                                this.setState({
                                                    state: e.target.value
                                                })
                                            }}>
                                                    <option value="----select an option----">----select an option----</option>
                                                    <option value="(GMT-10:00)-Hawaii-Time-Zone">(GMT-10:00) Hawaii Time Zone</option>
                                                    <option value="(GMT-5:00)-Eastern-Time-Zone">(GMT-5:00) Eastern Time Zone</option>
                                                    <option value="(GMT-6:00)-Central-Time-Zone">(GMT-6:00) Central Time Zone</option>
                                                    <option value="(GMT-7:00)-Mountain-Time-Zone">(GMT-7:00) Mountain Time Zone</option>
                                                    <option value="(GMT-8:00)-Pacific-Time-Zone">(GMT-8:00) Pacific Time Zone</option>
                                                    <option value="(GMT-9:00)-Alaska-Time-Zone">(GMT-9:00) Alaska Time Zone</option>
                                                    <option value="AL">Alabama</option>
                                                    <option value="AK">Alaska</option>
                                                    <option value="AZ">Arizona</option>
                                                    <option value="AR">Arkansas</option>
                                                    <option value="CA">California</option>
                                                    <option value="CO">Colorado</option>
                                                    <option value="CT">Connecticut</option>
                                                    <option value="DE">Delaware</option>
                                                    <option value="DC">District Of Columbia</option>
                                                    <option value="FL">Florida</option>
                                                    <option value="GA">Georgia</option>
                                                    <option value="HI">Hawaii</option>
                                                    <option value="ID">Idaho</option>
                                                    <option value="IL">Illinois</option>
                                                    <option value="IN">Indiana</option>
                                                    <option value="IA">Iowa</option>
                                                    <option value="KS">Kansas</option>
                                                    <option value="KY">Kentucky</option>
                                                    <option value="LA">Louisiana</option>
                                                    <option value="ME">Maine</option>
                                                    <option value="MD">Maryland</option>
                                                    <option value="MA">Massachusetts</option>
                                                    <option value="MI">Michigan</option>
                                                    <option value="MN">Minnesota</option>
                                                    <option value="MS">Mississippi</option>
                                                    <option value="MO">Missouri</option>
                                                    <option value="MT">Montana</option>
                                                    <option value="NE">Nebraska</option>
                                                    <option value="NV">Nevada</option>
                                                    <option value="NH">New Hampshire</option>
                                                    <option value="NJ">New Jersey</option>
                                                    <option value="NM">New Mexico</option>
                                                    <option value="NY">New York</option>
                                                    <option value="NC">North Carolina</option>
                                                    <option value="ND">North Dakota</option>
                                                    <option value="OH">Ohio</option>
                                                    <option value="OK">Oklahoma</option>
                                                    <option value="OR">Oregon</option>
                                                    <option value="PA">Pennsylvania</option>
                                                    <option value="RI">Rhode Island</option>
                                                    <option value="SC">South Carolina</option>
                                                    <option value="SD">South Dakota</option>
                                                    <option value="TN">Tennessee</option>
                                                    <option value="TX">Texas</option>
                                                    <option value="UT">Utah</option>
                                                    <option value="VT">Vermont</option>
                                                    <option value="VA">Virginia</option>
                                                    <option value="WA">Washington</option>
                                                    <option value="WV">West Virginia</option>
                                                    <option value="WI">Wisconsin</option>
                                                    <option value="WY">Wyoming</option>
                                                </select><hr className="my-4" /><button onClick={this.handleSubmission} className="btn blue-btn" style={{ width: "100%", color: "white", marginTop: "20px" }}>Save changes and proceed</button></div> : null}

                                            <div style={{ marginTop: "30px" }} class="col-xl-12">
                                                <div class="submit-field">
                                                    <h5>Job Description</h5>
                                                    <textarea onChange={(e) => {
                                                        this.setState({
                                                            job_description: e.target.value
                                                        })
                                                    }} value={this.state.job_description} placeholder={"Enter your detailed job description here..."} cols="30" rows="5" class="with-border"></textarea>
                                                   
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
                                                            <div style={{ marginTop: "30px" }} key={index} class="list-group"> <a href="#" class="list-group-item list-group-item-success"><span class="badge alert-success pull-right">{file.date}</span>{file.title}</a></div>
                                                        );
                                                    }) : null}
                                                
                                                    <div onClick={() => {
                                                        this.setState({
                                                            isPaneOpen: true,
                                                            questions: false
                                                        })
                                                        console.log("clicked")
                                                    }} id="bottom-right-align tick-tick">
                                                        <label style={{ textAlign: "left", fontWeight: "bold", color: "blue" }}>ADD custom questions to your job listing to get a better read on your canidates and to learn more about their skills and capablities...</label>
                                                        
                                                        <div id="float-me-left">
                                                            <img src={require("../../../../assets/icons/add.png")} style={{ width: "50px", height: "50px" }} />
                                                        </div>
                                                        <div class="keywords-list">
                                                            {typeof preselected !== "undefined" && preselected.length > 0 && questions === true ? preselected.map((question, index) => {
                                                                return (
                                                                    <span class="keyword" style={{ padding: "0px 10px" }}>
                                                                        {question.title}
                                                                    </span>
                                                                );
                                                            }) : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: "100px" }} class="col-xl-12">
                                <button onClick={this.handleFinalSubmission} class="button ripple-effect big margin-top-30" style={{ width: "100%" }}><i class="icon-feather-plus"></i> Post Job</button>
                            </div>

                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <Fragment>
                    <div id="titlebar" class="gradient">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">

                                    <h2>Unauthorized</h2>

                                
                                    <nav id="breadcrumbs" class="dark">
                                        <ul>
                                            <li><Link to="/">Home</Link></li>
                                            <li>Un-Authorized</li>
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
                                    <h2>Unauthorized <i class="icon-line-awesome-question-circle"></i></h2>
                                    <p>We're sorry but you're trying to access a page your account is not authorized to access... If you'd like access to this page, please switch your account to a business account type. </p>
                                </section>

                                <div class="row">
                                    <div class="col-xl-8 offset-xl-2">
                                            <div class="intro-banner-search-form not-found-search margin-bottom-50">
                                          
                                                <div class="intro-search-field ">
                                                    <input id="intro-keywords" type="text" placeholder="What Are You Looking For?" />
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
                </Fragment>
            );
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
    removeItem = (value) => {
        console.log("remove item... :", value);

        const myItems = [...this.state.additionalSkillsOptions];

        const newArray = myItems.filter(item => item.index !== value.index)

        this.setState({
            additionalSkillsOptions: newArray
        })
    }
    handleSubmissionSkillAdd = () => {
        const { additonal_skill, additionalSkillsOptions } = this.state;

        console.log("clicked handleSubmissionSkillAdd", additonal_skill);

        this.setState({
            additionalSkillsOptions: [...additionalSkillsOptions, {
                value: additonal_skill,
                index: additionalSkillsOptions.length === 0 ? 0 : additionalSkillsOptions[additionalSkillsOptions.length - 1].index + 1
            }],
            additonal_skill: ""
        })
    }
    renderLoading = () => {
        return (
           <div style={{ minHeight: "100vh" }}>
                <Spinner style={{ marginTop: "400px" }} size="lg" animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
           </div>
        );
    }
    handleAddition = () => {
        console.log("handle addition...");

        const { preselected, addition } = this.state;

        if (this.state.addition.length !== 0) {
            console.log("successfully ran.")
            this.setState({
                preselected: [...preselected, {
                    title: addition,
                    index: preselected.length === 0 ? 0 : preselected[preselected.length - 1].index + 1
                }],
                addition: ""
            })
        } else {
            console.log("didnt successfully run...")
            this.setState({
                questionError: "You need to enter a value before adding a new question to the list..."
            })
        }
    }
    removeQuestion = (value) => {
        console.log("remove question...");

        const myItems = [...this.state.preselected];

        const newArray = myItems.filter(item => item.index !== value.index)
      
        this.setState({
          preselected: newArray
        })
    }
    render() {
        const { loaded, addition, preselected, isPaneOpen, questionError } = this.state;

        console.log(this.state);
        return (
            <div style={{ borderTop: "3px solid lightgrey" }}>
                {loaded === true ? this.renderConditional() : this.renderLoading()}

                        <SlidingPane
                            className="sliding-pane-class"
                            overlayClassName="overlay-class"
                            isOpen={isPaneOpen}
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
                                            addition: e.target.value,
                                            questionError: ""
                                        })
                                    }} value={addition} type="text" class="keyword-input with-border" placeholder="Add a questions here..."/>
                                    <button onClick={this.handleAddition} class="keyword-input-button ripple-effect"><i class="icon-material-outline-add"></i></button>
                                </div>
                                {typeof questionError !== "undefined" && questionError.length > 0 ? <p className="lead red-text">{questionError}</p> : null}
                                <label>Please remove any questions that you wouldn't like to use or are irrelevant for your project. Select a maximum of 5 questions or ADD YOUR OWN...</label>
                                <div class="keywords-list">
                                    {preselected.length !== 0 ? preselected.map((item, index) => {
                                        return (
                                            <Fragment>
                                                <span class="keyword"><span onClick={() => {
                                                    this.removeQuestion(item)
                                                }} class="keyword-remove"></span><span class="keyword-text">{item.title}</span></span>
                                                <br />
                                            </Fragment>
                                        );
                                    }) : null}
                                    
                                </div>
                                
                                <div class="clearfix"></div>
                                <hr className="my-4" />
                                    {preselected.length > 5 ? <div><h3 style={{ color: "#880D1E", fontWeight: "bold" }} className="text-center">You need to de-select some items, too many questions are selected...</h3></div> : <div><button onClick={() => {
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
export default withRouter(connect(mapStateToProps, { })(PostAJob));


// attachedFiles